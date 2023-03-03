import { CHALLENGER_SPRITE } from "./spriteSettings.js";
import { inputs } from "./inputSettings.js";

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
        let xSpeed = inputs.right ? xSpeed + speed : xSpeed;
        xSpeed = inputs.left ? xSpeed - speed : xSpeed;

        let ySpeed = inputs.down ? xSpeed + speed : ySpeed;
        ySpeed = inputs.up ? xSpeed - speed : ySpeed;

        let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
        x += (xSpeed / normalize);
        y += (ySpeed / normalize);
    }
}