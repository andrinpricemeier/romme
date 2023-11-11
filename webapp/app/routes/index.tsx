import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GameService } from "~/services/GameService";

const IndexPage = () => {
    const navigate = useNavigate();

    const startGame = useCallback(() => {
        async function startGame() {
            const gameService = new GameService();
            const gameId = await gameService.createGame();
            navigate(`/games/${gameId}/join`);
        }
        startGame();
    }, [navigate]);

    return (
        <main className="flex-1 flex flex-col place-content-center">
            <h1 className="mx-auto font-bold text-5xl">
                Play Rommé in your Browser for free!
            </h1>
            <button onClick={startGame} className="btn mt-10 max-w-md mx-auto">
                Start game
            </button>
            <div className="mx-auto mt-14 text-2xl">
                <h2>First time playing?&nbsp;</h2>
                <a
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                    href="https://docs.playromme.com/main/stable/how_to_play.html"
                >
                    Learn how to play
                </a>
            </div>
        </main>
    );
};

export default IndexPage;
