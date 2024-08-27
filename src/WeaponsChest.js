import {canvas,ctx} from './utils.js';
import {Level} from './Level.js';
import {Action} from './Action.js';

const buyWeapon = document.querySelector(".weaponsBlock");

export class Chest{
    constructor(){
        Action.Objects.push(this);
    }
    chestOpen = false;
    ak47 = {
        state: false,
        price: 300,
    }
    buyError = false;
    info = {
        img: new Image(),
        x:450,
        y:100,
        w:120,
        h:90,
    }

    draw(){
        if(this.chestOpen){
            this.info.img.src = "../Images/objects/objects/chestOpen.png";
        }else{
            this.info.img.src = "../Images/objects/objects/chest.png";
        }
        this.WeaponBlock();
        this.info.img.onload = ctx.drawImage(this.info.img,this.info.x,this.info.y,this.info.w,this.info.h);
        if(Level.mapMove.state){
            this.info.x += Level.mapMove.dx;
            this.info.y += Level.mapMove.dy; 
        }
        if(this.buyError && this.chestOpen){
           this.checkError();
        }
    }
    WeaponBlock(){
        if(Action.checkCollision(this,this.player)){
            let pressF = "Press F"
            ctx.fillStyle = "white"
            ctx.font = "28px Arial"
            ctx.fillText(pressF,this.info.x,this.info.y)
            if(this.chestOpen){
                this.closeChest();  
            }else{
                this.openChest();
            }
        }else{
            this.chestOpen = false;
        }

        if(this.chestOpen){
            buyWeapon.style.display = "flex";
        }else{
            buyWeapon.style.display = "none";
            this.buyError = false;
        }
    }
    openChest(){
        document.addEventListener("keydown",(e) => {
            if(e.key == "f"){
                this.chestOpen = true;
            } 
        })
    }
    closeChest(){
        document.addEventListener("keydown",(e) => {
            if(e.key == "f"){
                this.chestOpen = false;
            } 
        })      
    }
    checkError(){
        let text;
        if(this.buyError == "alreadyHave"){
            text = "You Already Have AK47"
        }else if(this.buyError == "notEnoughScore"){
            text = "Not Enough Score"
        }
        ctx.fillStyle = "white"
        ctx.font = "28px Arial"
        ctx.fillText(text,canvas.width / 2 - 120,canvas.height - 150)
    }
}
