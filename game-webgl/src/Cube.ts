import { mat4, vec4 } from "gl-matrix";
import { Angle } from "./Angle";
import { GamePoint3D } from "./GamePoint3D";
import { Plane } from "./Plane";

export type Size = [number, number, number];
export type Location = [number, number, number];
export type Alignment = [Angle, [number, number, number]];
export type Color = [number, number, number];
export class Cube {
    private size: Size = [5, 5, 1];
    private location: Location = [128, 128, 0];
    private alignment: Alignment = [Angle.fromDegrees(0), [0, 0, 0]];
    private color: Color = [1.0, 1.0, 0];
    private readonly bufferVertices: WebGLBuffer;
    private readonly bufferSides: WebGLBuffer;
    private textureCoords: WebGLBuffer;
    private bufferColors: WebGLBuffer;

    constructor(
        private readonly context: WebGL2RenderingContext,
        private readonly shaderProgram: WebGLProgram
    ) {
        this.bufferVertices = this.defineVertices();
        this.bufferSides = this.defineSides();
        this.changeColor([1.0, 1.0, 0]);
    }

    resize(newSize: Size) {
        this.size = newSize;
    }

    move(newLocation: Location) {
        this.location = newLocation;
    }

    align(newAlignment: Alignment) {
        this.alignment = newAlignment;
    }

    changeColor(newColor: Color) {
        this.changeColors(
            newColor,
            newColor,
            newColor,
            newColor,
            newColor,
            newColor
        );
    }

    private defineVertices() {
        // define the vertices of the cube
        const vertices = [
            // back
            0.0,
            0.0,
            0.0, // v0
            1,
            0.0,
            0.0, // v1
            1,
            1,
            0, // v2
            0,
            1,
            0, // v3
            // front
            0,
            0,
            1, // v4
            1,
            0,
            1, // v5
            1,
            1,
            1, // v6
            0,
            1,
            1, // v7
            // right
            1,
            0,
            0, // v8 = v1
            1,
            1,
            0, // v9 = v2
            1,
            1,
            1, // v10 = v6
            1,
            0,
            1, // v11 = v5
            // left
            0,
            0,
            0, // v12 = v0
            0,
            1,
            0, // v13 = v3
            0,
            1,
            1, // v14 = v7
            0,
            0,
            1, // v15 = v4
            // top
            0,
            1,
            0, // v16 = v3
            0,
            1,
            1, // v17 = v7
            1,
            1,
            1, // v18 = v6
            1,
            1,
            0, // v19 = v2
            //bottom
            0,
            0,
            0, // v20 = v0
            0,
            0,
            1, // v21 = v4
            1,
            0,
            1, // v22 = v5
            1,
            0,
            0 // v23 = v1
        ];
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(vertices),
            this.context.STATIC_DRAW
        );
        return buffer;
    }

    private defineSides() {
        // define the edges for the cube, there are 12 edges in a cube
        const vertexIndices = [
            0,
            2,
            1, // face 0 (back)
            2,
            0,
            3,
            4,
            5,
            6, // face 1 (front)
            4,
            6,
            7,
            8,
            9,
            10, // face 2 (right)
            10,
            11,
            8,
            12,
            15,
            14, // face 3 (left)
            14,
            13,
            12,
            16,
            17,
            18, // face 4 (top)
            18,
            19,
            16,
            20,
            23,
            22, // face 5 (bottom)
            22,
            21,
            20
        ];
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(vertexIndices),
            this.context.STATIC_DRAW
        );

        return buffer;
    }

    changeColors(
        backColor,
        frontColor,
        rightColor,
        leftColor,
        topColor,
        bottomColor
    ) {
        this.bufferColors = this.defineColors(
            backColor,
            frontColor,
            rightColor,
            leftColor,
            topColor,
            bottomColor
        );
    }

    private defineColors(
        backColor,
        frontColor,
        rightColor,
        leftColor,
        topColor,
        bottomColor
    ) {
        // make 4 entries, one for each vertex
        const backSide = backColor.concat(backColor, backColor, backColor);
        const frontSide = frontColor.concat(frontColor, frontColor, frontColor);
        const rightSide = rightColor.concat(rightColor, rightColor, rightColor);
        const leftSide = leftColor.concat(leftColor, leftColor, leftColor);
        const topSide = topColor.concat(topColor, topColor, topColor);
        const bottomSide = bottomColor.concat(
            bottomColor,
            bottomColor,
            bottomColor
        );

        const allSides = backSide.concat(
            frontSide,
            rightSide,
            leftSide,
            topSide,
            bottomSide
        );
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(allSides),
            this.context.STATIC_DRAW
        );
        return buffer;
    }

    resetTextureCoord() {
        const entireTexture = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
        this.defineTextureCoord(
            entireTexture,
            entireTexture,
            entireTexture,
            entireTexture,
            entireTexture,
            entireTexture
        );
    }

    defineTextureCoord(
        back: number[],
        front: number[],
        right: number[],
        left: number[],
        top: number[],
        bottom: number[]
    ) {
        const textureCoords = back.concat(front, right, left, top, bottom);
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(textureCoords),
            this.context.STATIC_DRAW
        );
        this.textureCoords = buffer;
    }

    defineNormals() {
        const backNormal = [0.0, 0.0, -1.0];
        const frontNormal = [0.0, 0.0, 1.0];
        const rightNormal = [1.0, 0.0, 0.0];
        const leftNormal = [-1.0, 0.0, 0.0];
        const topNormal = [0.0, 1.0, 0.0];
        const bottomNormal = [0.0, -1.0, 0.0];

        // make 4 entries, one for each vertex
        const backSideNormal = backNormal.concat(
            backNormal,
            backNormal,
            backNormal
        );
        const frontSideNormal = frontNormal.concat(
            frontNormal,
            frontNormal,
            frontNormal
        );
        const rightSideNormal = rightNormal.concat(
            rightNormal,
            rightNormal,
            rightNormal
        );
        const leftSideNormal = leftNormal.concat(
            leftNormal,
            leftNormal,
            leftNormal
        );
        const topSideNormal = topNormal.concat(topNormal, topNormal, topNormal);
        const bottomSideNormal = bottomNormal.concat(
            bottomNormal,
            bottomNormal,
            bottomNormal
        );

        const allSidesNormal = backSideNormal.concat(
            frontSideNormal,
            rightSideNormal,
            leftSideNormal,
            topSideNormal,
            bottomSideNormal
        );

        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(allSidesNormal),
            this.context.STATIC_DRAW
        );
        return buffer;
    }

    private createModelMatrix(): mat4 {
        const modelMatrix = mat4.create();
        mat4.translate(modelMatrix, modelMatrix, this.location);
        if (
            this.alignment[1][0] !== 0 ||
            this.alignment[1][1] !== 0 ||
            this.alignment[1][2] !== 0
        ) {
            mat4.rotate(
                modelMatrix,
                modelMatrix,
                this.alignment[0].rad,
                this.alignment[1]
            );
        }
        mat4.scale(modelMatrix, modelMatrix, this.size);
        return modelMatrix;
    }

    private transformToWorld(point: [number, number, number]): GamePoint3D {
        const vector4D = vec4.fromValues(point[0], point[1], point[2], 1);
        const inWorld = vec4.create();
        vec4.transformMat4(inWorld, vector4D, this.createModelMatrix());
        return new GamePoint3D(inWorld[0], inWorld[1], inWorld[2]);
    }

    getFrontPlane(): Plane {
        const origin = this.transformToWorld([0, 0, 0]);
        const leftTop = this.transformToWorld([0, 1, 0]);
        const rightBottom = this.transformToWorld([1, 0, 0]);
        return new Plane(origin, leftTop, rightBottom);
    }

    draw() {
        const matrixId = this.context.getUniformLocation(
            this.shaderProgram,
            "modelMatrix"
        );
        this.context.uniformMatrix4fv(
            matrixId,
            false,
            this.createModelMatrix()
        );

        // position
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.bufferVertices);
        const positionId = this.context.getAttribLocation(
            this.shaderProgram,
            "position"
        );
        this.context.vertexAttribPointer(
            positionId,
            3,
            this.context.FLOAT,
            false,
            0,
            0
        );
        this.context.enableVertexAttribArray(positionId);

        // color buffer
        const colorId = this.context.getAttribLocation(
            this.shaderProgram,
            "color"
        );
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.bufferColors);
        this.context.vertexAttribPointer(
            colorId,
            3,
            this.context.FLOAT,
            false,
            0,
            0
        );
        this.context.enableVertexAttribArray(colorId);

        // texture coordinates
        const textureCoordId = this.context.getAttribLocation(
            this.shaderProgram,
            "textureCoord"
        );
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.textureCoords);
        this.context.vertexAttribPointer(
            textureCoordId,
            2,
            this.context.FLOAT,
            false,
            0,
            0
        );
        this.context.enableVertexAttribArray(textureCoordId);

        // bind the element array
        this.context.bindBuffer(
            this.context.ELEMENT_ARRAY_BUFFER,
            this.bufferSides
        );
        this.context.drawElements(
            this.context.TRIANGLES,
            36,
            this.context.UNSIGNED_SHORT,
            0
        );
    }
}
