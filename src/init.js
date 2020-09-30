/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#c');

export default function init() {
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        // no webgl for you!
        alert("You don't have WebGL!");
        return;
    }
    return gl;
}