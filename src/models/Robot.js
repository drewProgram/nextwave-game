class Robot {
    /** @type {WebGLVertexArrayObject} */
    vao;

    buffer;

    positionAttributeLocation;

    colorLocation;

    translationLocation;

    color;

    spawnLocation;

    minX;

    maxX;

    minY;

    maxY;

    life = 100;

    isAlive = true;

    isDamageInCooldown = false;

    name;

    /** @type {number[]} */
    speed = [0, 0, 0, 0];

    constructor(gl, program, name, { start, width, height }, color) {
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

        this.color = color;

        const x2 = start.x + width;
        const y2 = start.y + height;
        this.spawnLocation = {
            leftDown: { x: start.x, y: start.y },
            leftUp: { x: start.x, y: y2 },
            rightDown: { x: x2, y: start.y },
            rightUp: { x: x2, y: y2 },
        };

        this.minX = start.x;
        this.maxX = x2;
        this.minY = start.y;
        this.maxY = y2;

    }

    hasCollided(otherRobot) {
        if ((this.minX >= otherRobot.minX && this.minX <= otherRobot.maxX ||
            this.maxX <= otherRobot.maxX && this.maxX >= otherRobot.minX) &&
            (this.minY >= otherRobot.minY && this.minY <= otherRobot.maxY ||
                this.maxY <= otherRobot.maxY && this.maxY >= otherRobot.minY)) {

            return true;
        }
        return false;
    }

    removeHP(number, lifeEL) {
        if (!this.isDamageInCooldown) {
            const damage = Math.floor(Math.random() * Math.floor(number));

            this.life -= damage;

            if (this.life <= 0) {
                this.isAlive = false;
            }

            lifeEL.innerHTML = '';
            lifeEL.appendChild(document.createTextNode(this.life));

            this.isDamageInCooldown = true;

            window.setTimeout(() => {
                this.isDamageInCooldown = false;
            }, 1500);
        }

        return;
    }

    walkOnArena(controls) {
        if (controls.up && this.maxY + 0.006 < 1) {
            this.minY += 0.006;
            this.maxY += 0.006;

            this.speed[1] += 0.006;
        }
        if (controls.left && this.minX - 0.006 > -1) {
            this.minX -= 0.006;
            this.maxX -= 0.006;

            this.speed[0] -= 0.006;
        }
        if (controls.down && this.minY - 0.006 > -1) {
            this.minY -= 0.006;
            this.maxY -= 0.006;

            this.speed[1] -= 0.006;
        }
        if (controls.right && this.maxX + 0.006 < 1) {
            this.minX += 0.006;
            this.maxX += 0.006;

            this.speed[0] += 0.006;
        }
    }
}

export default Robot;
