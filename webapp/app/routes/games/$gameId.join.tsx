import { LoaderFunction, useLoaderData } from "remix";
import { AuthenticationService } from "~/services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { PlayerJoined } from "game-events";
import { UserInfo } from "~/services/UserInfo";
import { IGameEvents } from "game-events";

export const loader: LoaderFunction = async ({ params }) => {
    return params.gameId;
};

const authService = new AuthenticationService();
const JoinGamePage = () => {
    const gameId = useLoaderData();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInfo | undefined>(undefined);
    const [participants, setParticipants] = useState<string[]>([]);

    const startGame = useCallback(() => {
        navigate(`/games/${gameId}/inprogress`);
    }, [gameId, navigate]);

    const handlePlayerJoined = useCallback((playerJoined: PlayerJoined) => {
        setParticipants((oldParticipants) => {
            const newParticipants = [...oldParticipants];
            newParticipants.push(playerJoined.playerName);
            return newParticipants;
        });
    }, []);

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            navigate(`/games/${gameId}/pickaname`);
            return;
        }
        const userInfo = authService.getUserInfo();
        if (!userInfo) {
            return;
        }
        setUser(userInfo);
        const token = authService.getToken();
        const socket: Socket<IGameEvents, IGameEvents> = io(
            `${(window as any).ENV.API_URL!}/games/${gameId}`,
            {
                auth: {
                    token: token
                }
            }
        );
        socket.on("connection", (socket: any) => {
            console.log("Connected!");
        });
        socket.on("connect_error", (err) => {
            console.log(err.message);
        });
        socket.emit(
            "playerJoined",
            new PlayerJoined(userInfo?.userId, userInfo.username)
        );
        socket.on("playerJoined", handlePlayerJoined);
        return () => {
            socket.disconnect();
        };
    }, [gameId, navigate, handlePlayerJoined]);

    useEffect(() => {
        if (!user) {
            return;
        }
        setParticipants((oldParticipants) => {
            const newParticipants = [...oldParticipants];
            newParticipants.push(user.username);
            return newParticipants;
        });
    }, [user]);

    return (
        <div className="flex-1 lg:mx-80">
            <h1 className="text-white text-4xl mb-2">
                Waiting room (max. 4 players)
            </h1>
            {participants.map((p) => {
                return <p key={p}>{p}</p>;
            })}
            <button className="btn mt-5" onClick={startGame}>
                Start
            </button>
            <h2 className="mt-16">Share to let your friends join:</h2>
            <input
                className="w-full"
                value={`https://playromme.com/games/${gameId}/join`}
                readOnly={true}
                type="text"
            />
        </div>
    );
};

export default JoinGamePage;
