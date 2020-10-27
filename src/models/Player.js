import Robot from './Robot';
import Controls from '../game/Controls';

class Player extends Robot {
    /** @type {"player1" | "player2"} */
    type;

    /** @type {Controls} */
    controls;

    constructor(gl, program, type, name, spawnLocation, color) {
        super(gl, program, name, spawnLocation, color);

        this.type = type;

        this.controls = new Controls();

    }

    move(e) {
        this.controls.handleInput(e, this.type);
        this.walkOnArena(this.controls);
    }

}

export default Player;