import { createProgramFromSources } from 'webgl-helper';

const vertexShaderSource = `#version 300 es
in vec4 a_position;

uniform vec4 u_translation;

void main() {
    // add in the translation
    vec4 position = a_position + u_translation;

    gl_Position = vec4(position);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec4 u_color;

out vec4 outColor;

void main() {
  outColor = u_color;
}
`;

export default function createProgram(gl) {
    return createProgramFromSources(gl, vertexShaderSource, fragmentShaderSource); 
}
