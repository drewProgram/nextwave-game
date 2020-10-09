import Robot from './Robot';

class Player extends Robot {
    /** @type {"player1" | "player2"} */
    #type;

    constructor(gl, program, type, name, spawnLocation) {
        super(gl, program, name, spawnLocation);

        this.#type = type;

        console.log(spawnLocation);

    }

    /** @param {KeyboardEvent} e */
    handleInput(e, type) {
        const movement = {
            up: false,
            right: false,
            left: false,
            down: false,
        }

        let keyState = (e.type === 'keydown') ? true : false;

        const acceptedMovesP1 = {
            KeyW() {
                console.log('moving player 1 up');
                movement.up = keyState;
            },
            KeyA() {
                console.log('moving player 1 left');
                movement.left = keyState;
            },
            KeyS() {
                console.log('moving player 1 down');
                movement.down = keyState;
            },
            KeyD() {
                console.log('moving player 1 right');
                movement.right = keyState;
            }
        };

        // const acceptedMovesP2 = {
        //     ArrowUp() {
        //         console.log('moving player 2 up');
        //         movement.y++;
        //     },
        //     ArrowLeft() {
        //         console.log('moving player 2 left');
        //         movement.x--;
        //     },
        //     ArrowDown() {
        //         console.log('moving player 2 down');
        //         movement.y--;
        //     },
        //     ArrowRight() {
        //         console.log('moving player 2 right');
        //         movement.x++;
        //     }
        // };

        const keyPressed = e.code;
        const player = type;
        const moveFunction = (player === 'player1') ? acceptedMovesP1[keyPressed]
            : acceptedMovesP2[keyPressed];

        if (!moveFunction) {
            return;
        }

        moveFunction();


        this.walkOnArena(movement);
    }
}

export default Player;