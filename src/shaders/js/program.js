import { createProgramFromSources } from 'webgl-helper';

const vertexShaderSource = `#version 300 es
in vec2 a_position;

uniform vec2 u_resolution;

uniform vec2 u_translation;

void main() {
    vec2 position = a_position + u_translation;

    vec2 zeroToOne = position / u_resolution;

    vec2 zertoToTwo = zeroToOne * 2.0;

    vec2 clipSpace = zertoToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
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
