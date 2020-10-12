"use_strict";

import Game from './game/Game';

import './styles.css';

const game = new Game();

function loop() {
    game.update();
    window.requestAnimationFrame(loop);
}

function main() {
    game.init();
    loop();
}

main();