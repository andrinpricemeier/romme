import { Texture } from "./Texture";

export class TextureLoader {
    constructor(
        private readonly context: WebGL2RenderingContext,
        private readonly shaderProgram: WebGLProgram
    ) {}

    load(image: HTMLImageElement) {
        const textureObj = this.context.createTexture();
        this.initTexture(image, textureObj);
        return new Texture(this.context, this.shaderProgram, textureObj);
    }

    initTexture(image, textureObject) {
        this.context.bindTexture(this.context.TEXTURE_2D, textureObject);
        this.context.pixelStorei(this.context.UNPACK_FLIP_Y_WEBGL, true);
        this.context.texImage2D(
            this.context.TEXTURE_2D,
            0,
            this.context.RGBA,
            this.context.RGBA,
            this.context.UNSIGNED_BYTE,
            image
        );
        this.context.texParameteri(
            this.context.TEXTURE_2D,
            this.context.TEXTURE_MIN_FILTER,
            this.context.LINEAR_MIPMAP_NEAREST
        );
        this.context.texParameteri(
            this.context.TEXTURE_2D,
            this.context.TEXTURE_MAG_FILTER,
            this.context.LINEAR
        );
        const ext =
            this.context.getExtension("EXT_texture_filter_anisotropic") ||
            this.context.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
            this.context.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        if (ext) {
            const max = this.context.getParameter(
                ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT
            );
            this.context.texParameterf(
                this.context.TEXTURE_2D,
                ext.TEXTURE_MAX_ANISOTROPY_EXT,
                max
            );
        }
        this.context.generateMipmap(this.context.TEXTURE_2D);
        this.context.bindTexture(this.context.TEXTURE_2D, null);
    }
}
