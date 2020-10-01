class Robot {
    positionAttributeLocation;
    
    resolutionUniformLocation;
    
    colorLocation;
    
    translationLocation;
    
    #life = 100;

    #name;
    
    color = [0, 0, 0.5, 1];

    translation = [0, 0];

    constructor(gl, program, name) {
        console.log("created a robot");

        // look up where the vertex data needs to go.
        this.positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        // look up uniform locations
        this.resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
        this.colorLocation = gl.getUniformLocation(program, "u_color");
        this.translationLocation = gl.getUniformLocation(program, "u_translation");

        this.#name = name;

        console.log(this.#name);
        console.log(this.#life);
    }

    collisionWithEnemy() {}

    walkOnArena(direction) {
        this.translation[0] += direction.x;
        this.translation[1] += direction.y;
    }
}

export default Robot;
