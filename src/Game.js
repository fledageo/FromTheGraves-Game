import {canvas,ctx} from './utils.js';
import {Action,backSound} from './Action.js';

const showGameOver = document.querySelector(".gameOver");
export class Game{
    constructor(){
        Game.gameOver = false;
        canvas.style.display = "block";
        showGameOver.style.display = "none";
        this.id = requestAnimationFrame(() => this.run());
    }
    action = new Action();
   




    run(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        this.action.run();
        this.id = requestAnimationFrame(() => this.run());
        if(Game.gameOver){
           cancelAnimationFrame(this.id);
           showGameOver.style.display = "flex";
           backSound.pause();
        }
    }
}