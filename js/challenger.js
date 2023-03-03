import { CHALLENGER_SPRITE } from "./spriteSettings.js";
import { INPUTS } from "./inputSettings.js";

export class Challenger {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = new Image()
        this.sprite.src = CHALLENGER_SPRITE.url;
        this.size = CHALLENGER_SPRITE.radius;
        this.speed = 0.2;
    }
    move(){
        let xSpeed = 0;
        xSpeed = INPUTS.right ? xSpeed + this.speed : xSpeed;
        xSpeed = INPUTS.left ? xSpeed - this.speed : xSpeed;
        
        let ySpeed = 0;
        ySpeed = INPUTS.down ? xSpeed + this.speed : ySpeed;
        ySpeed = INPUTS.up ? xSpeed - this.speed : ySpeed;
        
        console.log("INPUTS.down", INPUTS.down)
        console.log("xSpeed", xSpeed)
        console.log("ySpeed", ySpeed)

        let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
        this.x += (xSpeed / normalize);
        this.y += (ySpeed / normalize);
    }
}