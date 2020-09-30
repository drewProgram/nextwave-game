class Robot {
    positionAttributeLocation;
    
    resolutionUniformLocation;
    
    colorLocation;
    
    translationLocation;
    
    #life;

    name;

    /** @param {WebGL2RenderingContext} gl */
    constructor(gl, program, name) {
        console.log("created a robot");

        // look up where the vertex data needs to go.
        this.positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        // look up uniform locations
        this.resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
        this.colorLocation = gl.getUniformLocation(program, "u_color");
        this.translationLocation = gl.getUniformLocation(program, "u_translation");

        this.name = name;
        this.#life = 100;
    }

    collisionWithEnemy() {
        this.#life -= 20;
        console.log("Attacking");
    }

    walkOnArena() {
        console.log("walking...");
    }
}

export default Robot;
