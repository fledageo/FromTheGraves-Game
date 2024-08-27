import {canvas,ctx} from './utils.js';
import {Action} from './Action.js';
import {Level} from './Level.js';

export class Barrier{
    constructor(){
        this.info.img.src = "../Images/objects/objects/barrier.png"
    }
    static barrier = false;
    home;
    allowBarrier;
    initialHealth = 250;
    health = this.initialHealth;
    info = {
        img: new Image(),
        x:150,
        y:50,
        w:700,
        h:500,
    }


    build(){
        if(Level.mapMove.state){
            this.info.x += Level.mapMove.dx;
            this.info.y += Level.mapMove.dy; 
        }
        if(Barrier.barrier){  
            this.info.img.onload = ctx.drawImage(this.info.img,this.info.x,this.info.y);
        }
        this.checkBreak();
    }
    checkBreak(){
        if(this.health <= 0){
           Barrier.barrier = false;
        }
    }
}