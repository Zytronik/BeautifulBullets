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
        let xSpeed = INPUTS.right ? xSpeed + speed : xSpeed;
        xSpeed = INPUTS.left ? xSpeed - speed : xSpeed;

        let ySpeed = INPUTS.down ? xSpeed + speed : ySpeed;
        ySpeed = INPUTS.up ? xSpeed - speed : ySpeed;

        let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
        x += (xSpeed / normalize);
        y += (ySpeed / normalize);
    }
}