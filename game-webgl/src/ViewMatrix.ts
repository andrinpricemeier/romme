import { mat4, vec3, vec4 } from "gl-matrix";
import { GamePoint3D } from "./GamePoint3D";
import { GameRay } from "./GameRay";
import { Vector3D } from "./Vector3D";

export class ViewMatrix {
    private readonly matrixId;
    private viewMatrix: mat4;
    private eye: [number, number, number];
    private readonly cameraZ = 10;

    constructor(
        private readonly context: WebGL2RenderingContext,
        shaderProgram: WebGLProgram,
        initialWidth: number,
        initialHeight: number
    ) {
        this.matrixId = context.getUniformLocation(shaderProgram, "viewMatrix");
        this.viewMatrix = mat4.create();
        this.eye = [initialWidth / 2, initialHeight / 2, this.cameraZ];
    }

    resize(width: number, height: number): void {
        this.eye = [width / 2, height / 2, this.cameraZ];
        mat4.lookAt(
            this.viewMatrix,
            this.eye,
            [width / 2, 0.1 * height, -(150 + this.cameraZ)],
            [0, 1, 0]
        );
    }

    transformRayToWorld(cameraRay: Vector3D): GameRay {
        const inverseView = mat4.create();
        mat4.invert(inverseView, this.viewMatrix);
        const rayWorld = vec4.create();
        vec4.transformMat4(
            rayWorld,
            vec4.fromValues(cameraRay.x, cameraRay.y, cameraRay.z, 0.0),
            inverseView
        );
        const normalizedRay = vec3.create();
        vec3.normalize(
            normalizedRay,
            vec3.fromValues(rayWorld[0], rayWorld[1], rayWorld[2])
        );
        const direction = new Vector3D(
            normalizedRay[0],
            normalizedRay[1],
            normalizedRay[2]
        );
        return new GameRay(
            new GamePoint3D(this.eye[0], this.eye[1], this.eye[2]),
            direction
        );
    }

    activate() {
        this.context.uniformMatrix4fv(this.matrixId, false, this.viewMatrix);
    }
}
