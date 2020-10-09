#version 300 es

in vec4 a_position;

// translation to add to position
uniform vec4 u_translation;

// all shaders have a main function
void main() {
    // add in the translation
    vec4 position = a_position + u_translation;

    // gl_Position is a special var a vertex shader is responsible for setting
    gl_Position = position;
}