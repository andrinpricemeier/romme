import { mat3, mat4, vec3, vec4 } from "gl-matrix";
import { Angle } from "./Angle";
import { NormalizedScreenPoint2D } from "./NormalizedScreenPoint2D";

export class DesktopPlayer {
    private lastHoverMouseOffset: [number, number];
    constructor(private readonly canvas: HTMLCanvasElement) {
        this.hookupEventListeners();
    }

    hookupEventListeners() {
        window.addEventListener("mousemove", this.onMouseOver, false);
    }

    cleanup() {
        window.removeEventListener("mousemove", this.onMouseOver, false);
    }

    isHoveringOverCanvas(): boolean {
        return this.lastHoverMouseOffset !== undefined;
    }

    getHoverPoint(): NormalizedScreenPoint2D {
        const ndcX =
            (this.lastHoverMouseOffset[0] / this.canvas.clientWidth) * 2 - 1;
        const ndcY =
            (1 - this.lastHoverMouseOffset[1] / this.canvas.clientHeight) * 2 -
            1;
        return new NormalizedScreenPoint2D(ndcX, ndcY);
    }

    onMouseOver = (mouseEvent) => {
        if (mouseEvent.target !== this.canvas) {
            this.lastHoverMouseOffset = undefined;
            return;
        }
        this.lastHoverMouseOffset = [mouseEvent.offsetX, mouseEvent.offsetY];
    };
}
