"use_strict";
import { resizeCanvas } from 'webgl-helper';

import init from './init';
import createProgram from './shaders/js/program';
import Robot from './models/Robot';

import './styles.css';

const gl = init();

const program = createProgram(gl);

const lucy = new Robot(gl, program, "Lucy");

function updatePosition(index) {
    return (event, ui) => {
        translation[index] = ui.value;
        drawScene(lucy);
    };
}

/** @param {Robot[]} robots
 *  @param {number[]} translation
 *  @param {number[]} color
 */
function drawScene(robots, program, vao, translation, color) {
    resizeCanvas(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // tell it to use our program
    gl.useProgram(program);

    gl.bindVertexArray(vao);

    // pass in the canvas resolution so we can convert from pixels
    // to clip space in the shader
    gl.uniform2f(robots.resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // Set a random color.
    gl.uniform4fv(robots.colorLocation, color);

    gl.uniform2fv(robots.translationLocation, translation);

    // Draw the rectangle.
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    const count = 6;
    gl.drawArrays(primitiveType, offset, count);
}

// Fill the buffer with the values that define a rectangle.
function setGeometry() {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        // left column
        20, 100,
        600, 100,
        20, 300,
        600, 300,
        20, 300,
        600, 100,
    ]), gl.STATIC_DRAW);
}

function main() {
    // Create a buffer
    const positionBuffer = gl.createBuffer();

    // set the buff we want to work with
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Create a vertex array object (attribute state)
    const vao = gl.createVertexArray();

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);

    // turn on the attribute
    gl.enableVertexAttribArray(lucy.positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    // how to pull the data out of the buffer
    let size = 2;             // 2 components per iteration
    let type = gl.FLOAT;      // the data is 32 bit floats
    let normalize = false;    // don't normalize the data
    let stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;           // start at the beginning of the buffer
    gl.vertexAttribPointer(
        lucy.positionAttributeLocation, size, type,
        normalize, stride, offset
    );

    // first let's make some vars to hold the translation,
    // width and height of the rectangle
    const translation = [0, 0];
    const color = [Math.random(), Math.random(), Math.random(), 1];

    drawScene(lucy, translation, color);
}

main();