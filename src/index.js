"use_strict";

import Game from './game/Game';

import './styles.css';

const game = new Game();

function loop() {
    if (game.isGameOver()){
        cancelAnimationFrame(request);
        game.gameOver();
        return;
    };

    game.update();
    const request = requestAnimationFrame(loop);
}

(function main() {
    game.init();
    loop();
})();