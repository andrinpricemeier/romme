const fragmentShader = `#version 300 es
precision mediump float;
in vec3 vColor;
uniform bool enableTexture;
uniform sampler2D sampler;
out vec4 finalColor;
in vec2 vTextureCoord;

void main() {
    vec4 baseColor = vec4(vColor, 1);
    if (enableTexture) {
        finalColor = vec4(texture(sampler, vTextureCoord).rgb, 1.0);
    } else {
        finalColor = baseColor;
    }
}`;

export default fragmentShader;
