import {canvas,ctx} from './utils.js';
const gunShoot = document.querySelector(".gunShoot");
gunShoot.valume = 0.9;
export class Bullet {
    constructor(){
        this.info.img.src = "../Images/objects/objects/bullet.png";
        this.info.img.onload = () => this.run.bind(this);
    }
    static Bullets = [];
    static reload = false;
    static reloadTime = 200;
    speed = 20;
    bulletState = false;
    info = {
        img: new Image(),
        x:canvas.width / 2 - 15,
        y:canvas.height / 2 - 15,
        dx:0,
        dy:0,
        w:10,
        h:10,
    }
    bulletPos = {x:this.info.x,y:this.info.y}
    

    draw(){
        ctx.drawImage(this.info.img,this.info.x,this.info.y,this.info.w,this.info.h);
    }
    run(){
        this.draw();
        
        this.info.x += this.info.dx;
        this.info.y += this.info.dy;

        if(this.info.x < 0 || this.info.x > canvas.width || this.info.y < 0 || this.info.y > canvas.height){
           let i = Bullet.Bullets.indexOf(this);
           Bullet.Bullets.splice(i,1)
        }
    }
    shootBullet(x,y){
        gunShoot.currentTime = 0.2;
        gunShoot.play();
       if(!this.bulletState){
        let vx = x - this.info.x;
        let vy = y - this.info.y;
        let distance = Math.sqrt(vx * vx + vy * vy);
        
        this.info.dx = (vx / distance) * this.speed;
        this.info.dy = (vy / distance) * this.speed;
        
        this.bulletState = true;
       } 
        
    }
}