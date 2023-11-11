import { mat3, mat4, vec3 } from "gl-matrix";
import { Angle } from "./Angle";
import { NormalizedScreenPoint2D } from "./NormalizedScreenPoint2D";
import { Vector3D } from "./Vector3D";

export class PerspectiveProjection {
    private readonly matrixId;
    private readonly projectionMatrix: mat4;

    constructor(private readonly context: any, shaderProgram: any) {
        this.matrixId = context.getUniformLocation(
            shaderProgram,
            "projectionMatrix"
        );
        this.projectionMatrix = mat4.create();
    }

    resize(width: number, height: number) {
        mat4.perspective(
            this.projectionMatrix,
            Angle.fromDegrees(55).rad,
            width / height,
            5,
            256 + 10 * 5
        );
    }

    getRayFromCameraThroughPixel(pixel: NormalizedScreenPoint2D): Vector3D {
        const M = mat3.create();
        mat3.fromMat4(M, this.projectionMatrix);
        const Minv = mat3.create();
        mat3.invert(Minv, M);
        const pixelHom = vec3.fromValues(pixel.x, pixel.y, 1);
        const rayDirection = vec3.create();
        vec3.transformMat3(rayDirection, pixelHom, Minv);
        return new Vector3D(rayDirection[0], rayDirection[1], rayDirection[2]);
    }

    activate() {
        this.context.uniformMatrix4fv(
            this.matrixId,
            false,
            this.projectionMatrix
        );
    }
}
