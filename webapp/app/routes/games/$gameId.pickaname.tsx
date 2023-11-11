import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderFunction, useLoaderData } from "remix";
import { AuthenticationService } from "~/services/AuthenticationService";

export const loader: LoaderFunction = async ({ params }) => {
    return params.gameId;
};

const authService = new AuthenticationService();
const PickAName = () => {
    const gameId = useLoaderData();
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const onUsernameChange = useCallback((e: any) => {
        setUsername(e.target.value);
    }, []);

    const join = useCallback(() => {
        async function register() {
            await authService.authenticate(username);
            navigate(`/games/${gameId}/join`);
        }
        register();
    }, [username, navigate, gameId]);

    return (
        <div className="flex-1 flex flex-col place-content-center">
            <div className="mx-auto">
                <label
                    className="mx-auto block text-white text-3xl font-bold mb-2"
                    htmlFor="username"
                >
                    Pick a name
                </label>
                <input
                    className=""
                    onChange={onUsernameChange}
                    id="username"
                    value={username}
                    type="text"
                    placeholder="Username"
                />
                <button className="btn ml-2 max-w-md" onClick={join}>
                    Join
                </button>
            </div>
        </div>
    );
};

export default PickAName;
