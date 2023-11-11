import { mat4 } from "gl-matrix";

export class ModelMatrix {
    private readonly matrixId;

    constructor(readonly context: any, shaderProgram: any) {
        this.matrixId = context.getUniformLocation(
            shaderProgram,
            "modelMatrix"
        );
    }

    setValues(matrix: mat4) {
        this.context.uniformMatrix4fv(this.matrixId, false, matrix);
    }
}
