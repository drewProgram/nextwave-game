import createProgram from '../shaders/js/program';
import Player from '../models/Player';
import Sounds from './Sounds';

class Game {
    /** @type {WebGL2RenderingContext} */
    #gl;

    /** @type {WebGLProgram} */
    #program;

    /** @type {Player[]} */
    #players;

    /** @type {Sounds} */
    sounds;

    gameType = 'pvp';

    controls;

    lifeP1El;

    lifeP2El;

    collisionsEl;

    isDamageInCooldown = false;

    collisions = 0;

    randomDamageRange = 20;

    constructor() {
        const canvas = document.getElementById("c");
        this.#gl = canvas.getContext("webgl2");

        !this.#gl && alert("Seu navegador não suporta WebGL2.");

        this.#program = createProgram(this.#gl);

        const { player1Spawn, player2Spawn } = this.setRobotSpawn();

        this.#players = [
            new Player(this.#gl, this.#program, 'player1', 'Lucy', player1Spawn, [0, 0, 0.5, 1]),
            new Player(this.#gl, this.#program, 'player2', 'Enemy', player2Spawn, [0.5, 0, 0, 1]),
        ];

        this.sounds = new Sounds();

        this.lifeP1El = document.getElementById('hp-player1');
        this.lifeP1El.appendChild(document.createTextNode(100));

        this.lifeP2El = document.getElementById('hp-player2');
        this.lifeP2El.appendChild(document.createTextNode(100));

        this.collisionsEl = document.getElementById('collisions-number');
        this.collisionsEl.appendChild(document.createTextNode(this.collisions));
    }

    setRobotSpawn() {
        if (this.gameType === 'pvp') {
            return {
                player1Spawn: {
                    start: { x: -0.1, y: -0.98 },
                    width: 0.15,
                    height: 0.15,
                },
                player2Spawn: {
                    start: { x: -0.1, y: 0.84 },
                    width: 0.15,
                    height: 0.15,
                }
            };
        }
    }

    // Fill the buffer with the values that define a robot.
    setRobot({ spawnLocation: position }) {
        this.#gl.bufferData(this.#gl.ARRAY_BUFFER, new Float32Array([
            // first triangle
            position.leftDown.x, position.leftDown.y,
            position.leftUp.x, position.leftUp.y,
            position.rightDown.x, position.rightDown.y,
            // second triangle
            position.rightUp.x, position.rightUp.y,
            position.leftUp.x, position.leftUp.y,
            position.rightDown.x, position.rightDown.y
        ]), this.#gl.STATIC_DRAW);
    }

    init() {
        this.#players.forEach(player => {
            // set the buff we want to work with
            this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, player.buffer);

            // and make it the one we're currently working with
            this.#gl.bindVertexArray(player.vao);

            // turn on the attribute
            this.#gl.enableVertexAttribArray(player.positionAttributeLocation);

            this.setRobot(player);

            // how to pull the data out of the buffer
            let size = 2;             // 2 components per iteration
            let type = this.#gl.FLOAT;// the data is 32 bit floats
            let normalize = false;    // don't normalize the data
            let stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
            let offset = 0;           // start at the beginning of the buffer
            this.#gl.vertexAttribPointer(
                player.positionAttributeLocation, size, type,
                normalize, stride, offset
            );

            window.addEventListener('keydown', e => {
                player.move(e, player.type);
            });
            window.addEventListener('keyup', e => {
                player.move(e, player.type);
            });
        });
        window.setTimeout(() => {
            this.sounds.themeSound.play();
        }, 1500)
    }

    resize() {
        if (this.#gl.canvas !== undefined) {
            this.#gl.canvas.width = window.innerWidth;
            this.#gl.canvas.height = window.innerHeight;

            // Tell WebGL how to convert from clip space to pixels
            this.#gl.viewport(0, 0, this.#gl.canvas.width, this.#gl.canvas.height);
        }
    }

    isGameOver() {
        if (this.collisions == 5) {
            return true;
        }
        return false;
    }

    gameOver() {
        this.sounds.themeSound.pause();
        this.sounds.winSound.play();

        this.#gl.clearColor(0, 0, 0, 0);
        this.#gl.clear(this.#gl.COLOR_BUFFER_BIT | this.#gl.DEPTH_BUFFER_BIT);

        let gameOverEl = document.getElementById('game-over');
        let winnerEl = document.getElementById('winner');

        const HPs = [];
        this.#players.forEach(player => HPs.push(player.life));

        const higherHP = Math.max(...HPs);

        const winner = this.#players.find(player => player.life === higherHP);

        if (winner.type == 'player1') {
            gameOverEl.style.color = 'blue';
            winnerEl.style.color = 'blue';
        } else if (winner.type == 'player2') {
            gameOverEl.style.color = 'red';
            winnerEl.style.color = 'red';
        }
        
        gameOverEl.appendChild(document.createTextNode(`Game Over!`));
        winnerEl.appendChild(document.createTextNode(`${winner.type.toUpperCase()} venceu!`));
    }

    update() {
        this.resize();

        // clear canvas
        this.#gl.clearColor(0, 0, 0, 0);
        this.#gl.clear(this.#gl.COLOR_BUFFER_BIT | this.#gl.DEPTH_BUFFER_BIT);

        this.#players.forEach(player => {
            player.walkOnArena(player.controls);

            // tell it to use our program
            this.#gl.useProgram(this.#program);

            this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, player.buffer);

            // and make it the one we're currently working with
            this.#gl.bindVertexArray(player.vao);

            // turn on the attribute
            this.#gl.enableVertexAttribArray(player.positionAttributeLocation);

            // Set a random color.
            this.#gl.uniform4fv(player.colorLocation, player.color);

            this.#gl.uniform4fv(player.translationLocation, player.speed);

            // Draw the rectangle.
            const primitiveType = this.#gl.TRIANGLES;
            let offset = 0;
            const count = 6;
            this.#gl.drawArrays(primitiveType, offset, count);
        });

        if (this.#players[0].hasCollided(this.#players[1]) && this.isDamageInCooldown == false) {
            this.sounds.collisionSound.play();

            this.#players[0].removeHP(this.randomDamageRange, this.lifeP1El);
            this.#players[1].removeHP(this.randomDamageRange, this.lifeP2El);
            
            this.collisions++;            
            this.collisionsEl.innerHTML = '';
            this.collisionsEl.appendChild(document.createTextNode(this.collisions));

            this.isDamageInCooldown = true;

            window.setTimeout(() => {
                this.isDamageInCooldown = false;
            }, 1500);
        };
    }
}

export default Game;