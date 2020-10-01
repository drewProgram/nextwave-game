class Canvas {
/** @type {HTMLCanvasElement} */
    #canvas = document.querySelector("#c");

    getWebGL() {
        console.log()
        const gl = this.#canvas.getContext("webgl2");
        
        if (!gl) alert("Seu navegador não suporta WebGL2.");

        return gl;
    }
}

export default Canvas;