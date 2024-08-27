import {canvas,ctx,rndX,rndY,rndNum} from './utils.js';
import {Action} from './Action.js';
import {Level} from './Level.js';
import {Bullet} from './Bullet.js';
import { Player } from './Player.js';
import {Barrier} from './Barrier.js';

export class Zombie {
    
    constructor(){
        this.info.img.onload = () => this.draw;
        Action.Objects.push(this);
    }
    static wave = 1;
    static quantity;
    static Zombies = [];
    player = null;
    barrier;
    atackPower = 20;
    atackState = true;
    atackAnimation = false;
    moveToPos = {
        x:rndNum(canvas.width / 2 - 60,canvas.width / 2 - 60 + 120),
        y:rndNum(canvas.height / 2,canvas.height / 2 - 60),
    }
    info = {
        img: new Image(),
        x:rndX(-1000,2000),
        y:rndY(-600,1200), 
        w:100,
        h:100,
        speed: 2,
        health: 100,
    }
    death = {
        state: false,
        x:0,
        y:0,
    };
    
    draw(){
        if(this.directionState == "right"){
            this.info.img.src = "../Images/zombie/zombieRight.png";
            if(this.atackAnimation){
                this.info.img.src = `../Images/zombie/atackRight.png`;
            }
        }
        if(this.directionState == "left"){
            this.info.img.src = "../Images/zombie/zombieLeft.png";
            if(this.atackAnimation){
                this.info.img.src = `../Images/zombie/atackLeft.png`;
            }
        }
        // if(this.directionState == "up"){
        //     this.info.img.src = "../Images/zombie/zombieUp.png";
        //     if(this.atackAnimation){
        //         this.info.img.src = `../Images/zombie/atackUp.png`;
        //     }
        // }
        // if(this.directionState == "down"){
        //     this.info.img.src = "../Images/zombie/zombieDown.png";
        //     if(this.atackAnimation){
        //         this.info.img.src = `../Images/zombie/atackDown.png`;
        //     }
        // }
        if(this.death.state){
            this.info.img.src = "../Images/zombie/blood.png";
        }
        if(this.atackAnimation){
            this.info.w = 110;
            this.info.h = 110;
        }else{
            this.info.w = 100;
            this.info.h = 100;
        }
        
        ctx.drawImage(this.info.img, this.info.x, this.info.y,this.info.w,this.info.h);
    }
    
    moveTo(){
        this.draw();
        this.atack();
        if(!this.death.state){
            this.checkDeath();
            this.checkDirect();
            if(!Barrier.barrier || !Action.checkCollision(this.player,this.barrier)){
                if(this.directionState == "right"){
                    this.moveToPos.x = this.player.info.x;
                }
                if(this.directionState == "left"){
                    this.moveToPos.x = this.player.info.x + this.player.info.w - 10;
                }
            }else if(Barrier.barrier && Action.checkCollision(this.player,this.barrier)){
                if(this.directionState == "right"){
                    this.moveToPos.x = this.barrier.info.x - 60;

                }else if(this.directionState == "left"){
                    this.moveToPos.x = this.barrier.info.x + this.barrier.info.w;
                }else{

                }
            }
            let x = this.moveToPos.x;
            let y = this.moveToPos.y;
            
            
            let vx = x - this.info.x;
            let vy = y - this.info.y;
            let distance = Math.sqrt(vx * vx + vy * vy);
            
            this.info.dx = vx * this.info.speed / distance;
            this.info.dy = vy * this.info.speed / distance;
            this.info.x += this.info.dx;
            this.info.y += this.info.dy; 
            
        }
        if(Level.mapMove.state){
            this.info.x += Level.mapMove.dx;
            this.info.y += Level.mapMove.dy; 
        }
    }
    
    checkDirect(){
        if(!this.atackAnimation){
            if(this.info.dx > 0 && this.info.x < this.moveToPos.x - 120){
                this.directionState = "right"; 
            }else if(this.info.dx < 0 && this.info.x > this.moveToPos.x + 120){
                this.directionState = "left"; 
            }
            // else{
            //     if(this.info.dy < 0 && this.info.y < this.moveToPos.y - 120){
            //         this.directionState = "up"; 
            //     }
            //     if(this.info.dy > 0 && this.info.x > this.moveToPos.y + 120){
            //         this.directionState = "down"; 
            //     }
            // }
        }

    }
    atack(){
        if(!this.death.state){
            if(Action.checkCollision(this,this.player)){
               if(this.atackState){
                 this.player.health -= this.atackPower;
                 this.atackState = false;
                 this.atackAnimation = true;
                 setTimeout(() => this.atackState = true,2000)
                 setTimeout(() => this.atackAnimation = false,500)
               }    
            } 
            if(Action.checkCollision(this,this.barrier)){
                if(this.atackState && Barrier.barrier){
                  this.barrier.health -= this.atackPower;
                  this.atackState = false;
                  this.atackAnimation = true;
                  setTimeout(() => this.atackState = true,2000)
                  setTimeout(() => this.atackAnimation = false,500)
                }    
            } 

        }
    }
    checkDeath(){
        let i = Zombie.Zombies.indexOf(this);
        let iForObjcts = Action.Objects.indexOf(this);
        Bullet.Bullets.forEach((bullet,index) => {
            if(Action.checkCollision(bullet,this)){
                Bullet.Bullets.splice(index,1);
                --index; 
                this.info.health -= 20; 
            }
        });
        if(this.info.health <= 0){
            this.death.state = true;
            this.death.x = this.info.x
            this.death.y = this.info.y
        }
        if(this.death.state){
            setTimeout(() => {
                Action.Objects.splice(iForObjcts,1);
                Zombie.Zombies = Zombie.Zombies.filter(zomb => !zomb.death.state);
                if(Zombie.Zombies.length == 0){
                    Zombie.wave++;
                }
                this.player.score += 80;
            },500);  
        }
    }
    
}