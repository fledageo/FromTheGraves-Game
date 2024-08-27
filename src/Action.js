import {canvas,ctx,rndNum} from './utils.js';
import {Level} from './Level.js';
import {Mouse} from './Mouse.js';
import {Player} from './Player.js';
import {Bullet} from './Bullet.js';
import {Zombie} from './Zombie.js';
import {Home} from './HomePlace.js';
import {Bar} from './InfoBars.js';
import {Chest} from './WeaponsChest.js';
import {Barrier} from './Barrier.js';


export const backSound = document.querySelector(".backSound");
backSound.volume = "0.05";
const zombieSound = document.querySelector(".zombieSound");
zombieSound.volume = "0.4";
const buyBtn = document.querySelector("#buyBtn");





export class Action {
    constructor(){
        this.restart();
        this.level = new Level();
        this.home = new Home();
        this.mouse = new Mouse();
        this.player = new Player();
        this.healthBar = new Bar("health");
        this.dayBar = new Bar("dayBar");
        this.scoreBar = new Bar("score");
        this.barrierBar = new Bar("barrier");
        this.chest = new Chest();
        this.barrier = new Barrier();

        this.barrier.home = this.home;
        this.chest.player = this.player;
        this.player.barrier = this.barrier;
        this.player.level = this.level;
        this.level.player = this.player;
        this.player.mouse = this.mouse;
        this.mouse.player = this.player;
    }
    timer = {
        time:20,
        lastTime:Date.now(),    
        elapsed: 0,
    }
    static checkCollision(a,b){
        return a.info.x < b.info.x + b.info.w &&
               a.info.x + a.info.w > b.info.x &&
               a.info.y < b.info.y + b.info.h &&
               a.info.h + a.info.y > b.info.y
    }
    run(){
        this.level.run();
        this.home.draw();
        this.barrier.build();
        this.chest.draw();
        this.allowBarrier();
        this.player.checkBuildError();
        
        if(Action.night){
            if(this.zombieComing){
                if(Zombie.Zombies.length == 0){
                    if(Zombie.wave == 1){
                        Zombie.quantity = 4;
                    }else if(Zombie.wave == 2){
                        Zombie.quantity = 8;
                    }else if(Zombie.wave == 3){  
                        this.restart();
                        console.log(Zombie.wave);
                    }
                    Zombie.Zombies = new Array(Zombie.quantity).fill(null).map(x => x = new Zombie());
                }
                Zombie.Zombies.forEach(zomb => {
                    zomb.player = this.player;
                    zomb.barrier = this.barrier;
                    zomb.moveTo();
                })
            }
        }

        this.healthBar.draw(this.player.initialHealth,this.player.health);
        this.dayBar.draw();
        this.scoreBar.scoreText = `${this.player.score}`
        this.scoreBar.draw();
        if(Barrier.barrier){
            this.barrierBar.draw(this.barrier.initialHealth,this.barrier.health);
        }
        
        this.move();

        Bullet.Bullets.forEach(bullet => {
            if(bullet.bulletState){
                bullet.run();
            }
        }); 
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(this.mouse.angle);
        this.player.draw();
        ctx.restore();
        this.mouse.run();
        
        this.gameInfo();

        buyBtn.innerText = `${this.chest.ak47.price}`
        buyBtn.onclick = () => {
            if(this.chest.ak47.state){
                this.chest.buyError = "alreadyHave";
            }else if(this.player.score < this.chest.ak47.price){
                this.chest.buyError = "notEnoughScore"
            }else{
                this.player.score -= this.chest.ak47.price;
                this.chest.ak47.state = true;
                this.player.gun = "AK47"
                this.chest.chestOpen = false;
            }
        }
    }
    
    
    move(){
        window.onkeydown = (e) => {
            if(e.code == "ArrowRight" || e.key == "d"){
                Level.mapMove.dx = -3
            }
            if(e.code == "ArrowLeft" || e.key == "a"){
                Level.mapMove.dx = 3
            }
            if(e.code == "ArrowUp" || e.key == "w"){
                Level.mapMove.dy = 3
            }
            if(e.code == "ArrowDown" || e.key == "s"){
                Level.mapMove.dy = -3
            }
        }
        window.onkeyup = (e) => {
            if(e.code == "ArrowRight" || e.code == "ArrowLeft" || e.key == "d" || e.key == "a"){
                Level.mapMove.dx = 0;
            }

            if(e.code == "ArrowUp" || e.code == "ArrowDown" || e.key == "w" || e.key == "s"){
                Level.mapMove.dy = 0;
            }
        }
    }

    
    gameInfo(){
        this.zombieTimer();
        if(!Action.night){
            this.gameInfoTxt = `The Zombies Are Coming  (${this.timer.time})`;
        }else{
            if(Zombie.wave == 1){
                this.gameInfoTxt = `Wave 1`
            }else if(Zombie.wave == 2){
                this.gameInfoTxt = `Wave 2`
            }
        }
        let infoBar = new Image();
        infoBar.src = "../Images/utils/infoBar.png";
        infoBar.onload = ctx.drawImage(infoBar,canvas.width/2 - 150,canvas.height - 60,300,50)
        
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText(this.gameInfoTxt,canvas.width/2 - 132,canvas.height - 30,270);
    }

    zombieTimer(){
        if(this.timer.time > 0){
            let now = Date.now();
            this.timer.elapsed += now - this.timer.lastTime;
            this.timer.lastTime = now;
            
            if (this.timer.elapsed >= 1000) {
                this.timer.time--;
                this.timer.elapsed = 0;
            }
        }else{
            Action.night = true;
            setTimeout(() => this.zombieComing = true,3000);
            backSound.play();
            if(Zombie.Zombies.length > 0){
                zombieSound.play();
            }else{
                backSound.volume = "0.04";
                zombieSound.pause() 
            }
        }
    }
    
    allowBarrier(){
        if(Action.checkCollision(this.player,this.home)){
           if(!Barrier.barrier){
               let hammer = new Image();
               hammer.src = "../Images/utils/hammer.png";
               hammer.onload = ctx.drawImage(hammer,25,115);
               ctx.fillStyle = "#ebce56";
               ctx.font = "20px Arial"
               ctx.fillText("Press C",60,123); 
               ctx.fillText("Barrier - 500",60,150);
               this.player.allowBarrier = true;
           }
           
        }else{
           this.player.allowBarrier = false;
        }
    }

    restart(){
        Zombie.Zombies.length = 0;
        Zombie.wave = 1;
        Action.Objects = [];
        Action.night = false;
        Barrier.barrier = false;
        Bullet.reloadTime = 400;
        this.timer.time = 20;
    }

    
}