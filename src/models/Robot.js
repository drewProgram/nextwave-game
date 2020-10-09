class Robot {
    /** @type {WebGLVertexArrayObject} */
    vao;

    buffer;

    positionAttributeLocation;
        
    colorLocation;
    
    translationLocation;

    position;
    
    life = 100;

    name;
    
    color = [0, 0, 0.5, 1];

    /** @type {number[]} */
    translation = [0, 0, 0, 0];

    constructor(gl, program, name, {start, width, height}) {
        console.log("created a robot");

        // Create a buffer
        this.buffer = gl.createBuffer();

        // look up where the vertex data needs to go.
        this.positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        // look up uniform locations
        this.colorLocation = gl.getUniformLocation(program, "u_color");
        this.translationLocation = gl.getUniformLocation(program, "u_translation");

        // Create a vertex array object (attribute state)
        this.vao = gl.createVertexArray();

        this.name = name;

        const x2 = start.x + width;
        const y2 = start.y + height;
        this.position = {
            leftDown: {x: start.x, y: start.y},
            leftUp: {x: start.x, y: y2},
            rightDown: {x: x2, y: start.y},
            rightUp: {x: x2, y: y2},
        };

        console.log(this.life);
    }

    #collisionWithEnemy() {}

    walkOnArena(movement) {
        // const nextXPosition = direction.x + this.positionAttributeLocation;
        // const nextYPosition = direction.x + this.positionAttributeLocation;
        // if (1) {

        // }
        if (movement.up) {
            this.translation[1] += 0.05;
        }
        if (movement.left) {
            this.translation[0] -= 0.05;
        }
        if (movement.down) {
            this.translation[1] -= 0.05;
        }
        if (movement.right) {
            this.translation[0] += 0.05;
        }
    }
}

export default Robot;
