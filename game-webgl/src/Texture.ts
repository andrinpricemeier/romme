export class Texture {
    constructor(
        private readonly context: WebGL2RenderingContext,
        private readonly shaderProgram: WebGLProgram,
        private readonly textureObj: WebGLTexture
    ) {}

    deactivate() {
        const enableTexture = this.context.getUniformLocation(
            this.shaderProgram,
            "enableTexture"
        );
        this.context.uniform1i(enableTexture, 0);
    }

    activate() {
        const enableTexture = this.context.getUniformLocation(
            this.shaderProgram,
            "enableTexture"
        );
        this.context.uniform1i(enableTexture, 1);
        this.context.activeTexture(this.context.TEXTURE0);
        this.context.bindTexture(this.context.TEXTURE_2D, this.textureObj);
        const samplerId = this.context.getUniformLocation(
            this.shaderProgram,
            "sampler"
        );
        this.context.uniform1i(samplerId, 0);
    }
}
