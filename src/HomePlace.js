import {canvas,ctx} from './utils.js';
import {Action} from './Action.js';
import {Level} from './Level.js';

export class Home {
    info = {
        img: new Image(),
        x:150,
        y:50,
        w:700,
        h:500,
    }
    
    draw(){
        this.info.img.src = Action.night ? "../Images/objects/tiles/floorMainNight.png" : "../Images/objects/tiles/floorMain.png";
        this.info.img.onload = ctx.drawImage(this.info.img,this.info.x,this.info.y);
        if(Level.mapMove.state){
            this.info.x += Level.mapMove.dx;
            this.info.y += Level.mapMove.dy; 
        }
    }
}