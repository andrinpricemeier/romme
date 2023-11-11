import { ISceneObject } from "./ISceneObject";
import { PerspectiveProjection } from "./PerspectiveProjection";
import { DesktopPlayer } from "./DesktopPlayer";
import { HighDPICanvas } from "./HighDPICanvas";
import { ViewMatrix } from "./ViewMatrix";
import { Cube } from "./Cube";
import { Room } from "./Room";
import { TextureMap } from "./TextureMap";
import { TextureLoader } from "./TextureLoader";

export class RommeGame implements ISceneObject {
    private onScoreChanged: (newScore: number) => void;
    private onGameDone: (finalScore: number) => void;
    private readonly desktopPlayer: DesktopPlayer;
    private readonly viewMatrix: ViewMatrix;
    private readonly projection: PerspectiveProjection;
    private readonly highDPICanvas: HighDPICanvas;
    private readonly room: Room;

    constructor(
        context: WebGL2RenderingContext,
        shaderProgram: WebGLProgram,
        private readonly canvas: HTMLCanvasElement,
        private readonly textureMap: TextureMap
    ) {
        this.projection = new PerspectiveProjection(context, shaderProgram);
        this.highDPICanvas = new HighDPICanvas(this.canvas);
        this.viewMatrix = new ViewMatrix(
            context,
            shaderProgram,
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        this.desktopPlayer = new DesktopPlayer(canvas);
        const cube = new Cube(context, shaderProgram);
        const textureLoader = new TextureLoader(context, shaderProgram);
        const floorTexture = textureLoader.load(textureMap.FLOOR);
        const wallTexture = textureLoader.load(textureMap.WALL);
        const tableTexture = textureLoader.load(textureMap.TABLE);
        const cardHeartTwoTexture = textureLoader.load(
            textureMap.CARD_HEART_TWO
        );
        this.room = new Room(
            cube,
            wallTexture,
            floorTexture,
            tableTexture,
            cardHeartTwoTexture
        );
    }

    switchToLowerQuality(): void {
        this.highDPICanvas.disableHighDPI();
    }

    cleanup() {
        this.desktopPlayer.cleanup();
        this.highDPICanvas.cleanup();
    }

    update(): void {
        this.highDPICanvas.recalculate();
        this.room.resize(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        if (this.desktopPlayer.isHoveringOverCanvas()) {
            const hoverPoint = this.desktopPlayer.getHoverPoint();
            const cameraRay =
                this.projection.getRayFromCameraThroughPixel(hoverPoint);
            const gameRay = this.viewMatrix.transformRayToWorld(cameraRay);
            this.room.handleHover(gameRay);
        }
        this.room.update();
    }

    draw(lagFix: number): void {
        this.highDPICanvas.recalculate();
        this.room.resize(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        this.viewMatrix.resize(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        this.projection.resize(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        this.viewMatrix.activate();
        this.projection.activate();
        this.room.draw(lagFix);
    }

    registerOnScoreChanged(callback: (newScore: number) => void) {
        this.onScoreChanged = callback;
    }

    registerOnGameDone(callback: (finalScore: number) => void) {
        this.onGameDone = callback;
    }
}
