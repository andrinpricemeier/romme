const vertexShader = `#version 300 es
in vec3 position;
in vec3 color;
in vec2 textureCoord;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
out vec3 vColor;
out vec2 vTextureCoord;

void main () {
    vColor = color;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vTextureCoord = textureCoord;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;
export default vertexShader;
