import { useEffect, useRef } from "react";
import { Game, ImageLoader, TextureMap } from "game-webgl";

let game: Game;
const GameScorePage = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        async function startGame() {
            if (!canvasRef.current) {
                return;
            }
            const canvas = canvasRef.current as HTMLCanvasElement;
            const context = canvas.getContext("webgl2");
            const imageLoader = new ImageLoader();
            const cardHeartTwo = await imageLoader.load(
                "/textures/card_heart_2.png"
            );
            const table = await imageLoader.load("/textures/table.png");
            const floor = await imageLoader.load("/textures/floor.png");
            const wall = await imageLoader.load("/textures/wall.png");
            const textureMap = new TextureMap();
            textureMap.CARD_HEART_TWO = cardHeartTwo;
            textureMap.FLOOR = floor;
            textureMap.TABLE = table;
            textureMap.WALL = wall;
            game = new Game(context, canvas, textureMap);
            game.start();
        }
        startGame();
        return () => {
            if (game) {
                game.stop();
            }
        };
    }, [canvasRef]);

    return <canvas ref={canvasRef} id="romme-canvas" className="w-3/4" />;
};

export default GameScorePage;
