import {Game} from './src/Game.js';
const playBtn = document.querySelector(".playBtn");
const playWrapper = document.querySelector(".playWrapper");
const restartBtn = document.querySelector(".restartBtn");
let game;
playBtn.onclick = () => {
    playWrapper.style.display = "none";
    game = new Game();
}
restartBtn.onclick = () => {
    game = new Game();
}
