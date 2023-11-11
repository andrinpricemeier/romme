import { FPSRecorder } from "./FPSRecorder";
import { GameLoop } from "./GameLoop";
import { Scene } from "./Scene";
import { loadAndCompileShaders } from "./ShaderUtils";
import { RommeGame } from "./RommeGame";
import { TextureMap } from "./TextureMap";

export class Game {
    private onScoreChanged: (newScore: number) => void;
    private onGameDone: (finalScore: number) => void;
    private loop: GameLoop;
    private shaderProgram: WebGLProgram;
    private rommeGame: RommeGame;
    private fpsRecorder: FPSRecorder;

    constructor(
        private readonly context: WebGL2RenderingContext,
        private readonly canvas: HTMLCanvasElement,
        private readonly textureMap: TextureMap
    ) {
        this.shaderProgram = loadAndCompileShaders(this.context);
    }

    start() {
        this.init();
        this.loop.start();
    }

    stop() {
        this.loop.stop();
        this.rommeGame.cleanup();
    }

    private init() {
        this.rommeGame = new RommeGame(
            this.context,
            this.shaderProgram,
            this.canvas,
            this.textureMap
        );
        this.fpsRecorder = new FPSRecorder();
        this.fpsRecorder.registerOnLowFPSDetected(this.onLowFPSDetected);
        const scene = new Scene();
        scene.add(this.rommeGame);
        this.loop = new GameLoop(this.context, scene, this.fpsRecorder);
        this.rommeGame.registerOnScoreChanged((newScore: number) => {
            if (!this.onScoreChanged) {
                return;
            }
            this.onScoreChanged(newScore);
        });
        this.rommeGame.registerOnGameDone((finalScore: number) => {
            this.loop.stop();
            if (!this.onGameDone) {
                return;
            }
            this.onGameDone(finalScore);
        });
        this.loop.init();
    }

    onLowFPSDetected = () => {
        console.log("Low FPS detected. Switching to lower quality settings.");
        this.rommeGame.switchToLowerQuality();
    };

    registerOnScoreChanged(callback: (newScore: number) => void) {
        this.onScoreChanged = callback;
    }

    registerOnGameDone(callback: (finalScore: number) => void) {
        this.onGameDone = callback;
    }
}
