import Robot from './Robot';
import Controls from '../game/Controls';

class Player extends Robot {
    /** @type {"player1" | "player2"} */
    #type;

    /** @type {Controls} */
    controls;

    constructor(gl, program, type, name, spawnLocation) {
        super(gl, program, name, spawnLocation);

        this.#type = type;

        this.controls = new Controls(type);

        console.log(spawnLocation);
    }

    move(e) {
        this.controls.handleInput(e, this.#type);
        this.walkOnArena(this.controls);
    }

}

export default Player;