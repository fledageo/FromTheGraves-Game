import {canvas,ctx} from './utils.js';
import {Bullet} from './Bullet.js';
import {Action} from './Action.js';
import {Game} from './Game.js';
import {Barrier} from './Barrier.js';
import {Level} from './Level.js';
import { Zombie } from './Zombie.js';


export class Player {
    constructor(){
        Action.Objects.push(this);
    }
    center = {x:canvas.width / 2 - 60 , y:canvas.height / 2 - 60}
    mouse = null;
    level = null;
    barrier = null;
    initialHealth = 100;
    health = this.initialHealth;
    score = 500;
    gun = "M19"
    info = {
        img: new Image(),
        x:this.center.x,
        y:this.center.y,
        w:120,
        h:120,
        speed: 3,
    }
    buildError = false;

    draw(){
        if(this.gun == "M19"){
            this.info.img.src = "../Images/player/move/playerM19.png";
        }else if(this.gun == "AK47"){
            this.info.img.src = "../Images/player/move/playerAK47.png";
            this.info.w = 141;
            this.info.h = 82;
        }
        this.info.img.onload = ctx.drawImage(this.info.img, -this.info.w / 2, -this.info.h / 2,this.info.w,this.info.h);
        
        this.buildBarrier()
        this.death();
    }

    death(){
        if(this.health <= 0){
            setTimeout(() => Game.gameOver = true,200)
        }
    }

    buildBarrier(){
        // if(this.allowBarrier){   
            addEventListener("keydown",(e) => {
                if(!this.buildError){
                    if(e.key == "c"){
                        if(!Barrier.barrier){
                            Zombie.Zombies.forEach(zomb => {
                                if(Action.checkCollision(zomb,this.barrier)){
                                    this.buildError = "zombie";
                                    setTimeout(() => this.buildError = false,1000);
                                }
                            }) 
                            if(this.score < 500){
                                this.buildError = "notEnoughScore";
                                setTimeout(() => this.buildError = false,1000);
                            }
                            if(!this.buildError){
                                this.score -= 500; 
                                this.barrier.initialHealth = 250; 
                                this.barrier.health = this.barrier.initialHealth; 
                                Barrier.barrier = true;
                            }
                        }
                    }
                }
            })    
        // }
    }

    checkBarrierLimit(){
        let left = this.barrier.info.x + Level.mapMove.dx >= this.info.x;
        let right = this.barrier.info.x + this.barrier.info.w + Level.mapMove.dx <= this.info.x + this.info.w;
        let top = this.barrier.info.y + Level.mapMove.dy >= this.info.y;
        let down = this.barrier.info.y + this.barrier.info.h + Level.mapMove.dy <= this.info.y + this.info.h;
        
        if(left || right || top || down){
            Level.mapMove.state = false; 
        }
    }
    checkBuildError(){
        if(this.buildError == "notEnoughScore"){
            ctx.fillStyle = "#ebce56";
            ctx.fillText("Not enough score to set the Barrier",350,canvas.height - 100); 
        }
        else if(this.buildError == "zombie"){
            ctx.fillStyle = "#ebce56";
            ctx.fillText("Zombie Are Inside",350,canvas.height - 100);         
        }
        
    }
}