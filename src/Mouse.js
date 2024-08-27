import { Bullet } from './Bullet.js';
import {canvas,ctx} from './utils.js';

export class Mouse{
    player = null;
    angle = 0;
    rotateState = false;

    run(){
        canvas.addEventListener("mousemove",(e) =>  {
            this.getMouseAngle(e);
        });
        if(this.player.gun == "AK47"){
            Bullet.reloadTime = 0;
            canvas.onclick = (e) => {   
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                if(!Bullet.reload){
                    Bullet.Bullets.push(new Bullet());
                    Bullet.Bullets.forEach(bullet =>  bullet.shootBullet(x,y))
                    Bullet.reload = true;
                    setTimeout(() => Bullet.reload = false,Bullet.reloadTime)
                }
            }
        }else{
            canvas.onclick = (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                if(!Bullet.reload){
                    Bullet.Bullets.push(new Bullet());
                    Bullet.Bullets.forEach(bullet =>  bullet.shootBullet(x,y))
                    Bullet.reload = true;
                    setTimeout(() => Bullet.reload = false,Bullet.reloadTime)
                }
            };
        }
    }

    getMouseAngle(event){
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left - canvas.width / 2;
        const y = event.clientY - rect.top - canvas.height / 2;
        this.angle = Math.atan2(y, x);
    }
}

