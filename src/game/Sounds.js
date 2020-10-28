import robotHit from '../assets/robot-hit.wav';
import theme from '../assets/hit-them-harder.mp3';
import win from '../assets/victory.mp3';

class Sounds {
    /** @type {HTMLAudioElement} */
    collisionSound;

    /** @type {HTMLAudioElement} */
    winSound;

    /** @type {HTMLAudioElement} */
    themeSound;

    constructor() {
        this.collisionSound = document.createElement("audio");
        this.collisionSound.src = robotHit;

        this.winSound = document.createElement("audio");
        this.winSound.src = win;

        this.themeSound = document.createElement("audio");
        this.themeSound.src = theme;
        this.themeSound.volume = 0.3;
    }
}

export default Sounds;