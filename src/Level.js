import {canvas,ctx} from './utils.js';
import { Zombie } from './Zombie.js';
import {Action} from './Action.js';
import { Player } from './Player.js';
import { Chest } from './WeaponsChest.js';
import { Barrier } from './Barrier.js';

export class Level {
    constructor(){
        Level.map = ["Images/level/level1Day.png","Images/level/level1Night.png"];
        Level.mapMove = {
            state: true,
            dx:0,
            dy:0,
        };
    }
    info = {
        img: new Image(),
        x:-1000,
        y:-600,
        dx: 0,
        dy: 0,
    }
    mapLimit = {}

    draw(){
        this.info.img.src = Action.night ? Level.map[1] : Level.map[0];
        this.info.img.onload = ctx.drawImage(this.info.img,this.info.x,this.info.y);
    }

    run(){
        this.draw();
        this.checkLimit();
        if(Barrier.barrier){
            this.player.checkBarrierLimit();
        }
        if(Level.mapMove.state){
            this.info.x += Level.mapMove.dx;
            this.info.y += Level.mapMove.dy;   
        }
    }

    checkLimit(){
        this.mapLimit.rightLimit = this.info.x + Level.mapMove.dx < -2000;
        this.mapLimit.leftLimit = this.info.x + Level.mapMove.dx > 0;
        this.mapLimit.upLimit = this.info.y + Level.mapMove.dy > 0;
        this.mapLimit.downLimit = this.info.y + Level.mapMove.dy < -1200;

        if(this.mapLimit.rightLimit || this.mapLimit.leftLimit || this.mapLimit.upLimit || this.mapLimit.downLimit){
            Level.mapMove.state = false;
        }else{
            Level.mapMove.state = true;
        }
    }
}