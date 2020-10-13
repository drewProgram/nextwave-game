class Controls {
    up = false;

    left = false;

    down = false;

    right = false;

    /** @param {KeyboardEvent} e */
    handleInput(e, type) {
        let keyState = (e.type === 'keydown') ? true : false;

        const self = this;

        const acceptedMovesP1 = {
            KeyW() {
                console.log('moving player 1 up');
                self.up = keyState;
            },
            KeyA() {
                console.log('moving player 1 left');
                self.left = keyState;
            },
            KeyS() {
                console.log('moving player 1 down');
                self.down = keyState;
            },
            KeyD() {
                console.log('moving player 1 right');
                self.right = keyState;
            },
            
        };

        const acceptedMovesP2 = {
            ArrowUp() {
                console.log('moving player 2 up');
                self.up = keyState;
            },
            ArrowLeft() {
                console.log('moving player 2 left');
                self.left = keyState;
            },
            ArrowDown() {
                console.log('moving player 2 down');
                self.down = keyState;
            },
            ArrowRight() {
                console.log('moving player 2 right');
                self.right = keyState;
            }
        }

        const keyPressed = e.code;
        const moveFunction = (type === 'player1') ? acceptedMovesP1[keyPressed]
            : acceptedMovesP2[keyPressed];

        if (!moveFunction) {
            return;
        }

        moveFunction();
    }
}

export default Controls;