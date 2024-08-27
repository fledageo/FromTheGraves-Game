import {canvas,ctx,} from './utils.js';
import {Action} from './Action.js';

export class Bar{
    constructor(type){
        this.type = type;
    }
    info = {
        img: new Image,
    }
    scoreText = "0";

    draw(initial,health){
        if(this.type == "health"){
            let healthWidth = (((health * 100)/initial) * 170) / 100;
            this.info.img.src = "../Images/utils/healthBar.png"
            this.info.img.onload = ctx.drawImage(this.info.img,20,20,200,38);
            if(health >= 0){
                ctx.fillStyle = "#DD4B1A";
                ctx.fillRect(35,25,healthWidth,25);
            }
        }
        if(this.type == "dayBar"){
            if(Action.night){
                this.info.img.src = "../Images/utils/night.png"
            }else{
                this.info.img.src = "../Images/utils/day.png"
            }
            this.info.img.onload = ctx.drawImage(this.info.img,225,18);
        }
        if(this.type == "score"){
            this.info.img.src = "../Images/utils/scoreBar.png"
            this.info.img.onload = ctx.drawImage(this.info.img,canvas.width - 160,20);    
            let coin = new Image();
            coin.src = "../Images/utils/coin.png";
            coin.onload = ctx.drawImage(coin,canvas.width - 150,23);
            ctx.font = "25px Arial"
            ctx.fillStyle = "#ebce56"
            ctx.fillText(this.scoreText,canvas.width - 115,47);
        }
        if(this.type == "barrier"){
            let barrierHealth = (((health * 100)/initial) * 170) / 100;
            this.info.img.src = "../Images/utils/barrier.png"
            this.info.img.onload = ctx.drawImage(this.info.img,20,110,200,38);
            if(health >= 0){
                ctx.fillStyle = "#bd9c6d";
                ctx.fillRect(35,115,barrierHealth,25);
            }
        }
    }
}