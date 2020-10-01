"use_strict";
import { resizeCanvas } from 'webgl-helper';

import createProgram from './shaders/js/program';
import Robot from './models/Robot';
import Player from './models/Player';
import Canvas from './models/Canvas';

import './styles.css';

/** @param {WebGL2RenderingContext} gl
 *  @param {Robot | Player} robots
 *  @param {WebGLProgram} program
 *  @param {WebGLVertexArrayObject} vao
 */
function drawScene(gl, robots, program, vao) {
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
    gl.uniform4fv(robots.colorLocation, robots.color);

    gl.uniform2fv(robots.translationLocation, robots.translation);

    // Draw the rectangle.
    const primitiveType = gl.TRIANGLES;
    let offset = 0;
    const count = 6;
    gl.drawArrays(primitiveType, offset, count);
}

// Fill the buffer with the values that define a rectangle.
function setRobots(gl) {
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
    const canvas = new Canvas();

    /** @type {WebGL2RenderingContext} */
    const gl = canvas.getWebGL();
    const program = createProgram(gl);

    // Create a buffer
    const positionBuffer = gl.createBuffer();

    // set the buff we want to work with
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Create a vertex array object (attribute state)
    const player1VAO = gl.createVertexArray();

    // and make it the one we're currently working with
    gl.bindVertexArray(player1VAO);

    const player1 = new Player(gl, program, "Lucy");

    // turn on the attribute
    gl.enableVertexAttribArray(player1.positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRobots(gl);

    // how to pull the data out of the buffer
    let size = 2;             // 2 components per iteration
    let type = gl.FLOAT;      // the data is 32 bit floats
    let normalize = false;    // don't normalize the data
    let stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;           // start at the beginning of the buffer
    gl.vertexAttribPointer(
        player1.positionAttributeLocation, size, type,
        normalize, stride, offset
    );

    drawScene(gl, player1, program, player1VAO);

    window.addEventListener('keydown', e => {
        player1.handleInput(e);
        drawScene(gl, player1, program, player1VAO);
    });
}

main();