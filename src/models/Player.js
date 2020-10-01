import Robot from './Robot';



class Player extends Robot {
    /** @type {"player1" | "player2"} */
    #type;

    static command;

    constructor(gl, program, type, name) {
        super(gl, program, name);

        this.#type = type;

        console.log('teste');
    }

    handleInput(e) {
        let x;
        let y;

        const coord = { x,y };

        
        
        return;
    }
}

export default Player;