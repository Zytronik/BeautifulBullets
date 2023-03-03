import { CHALLENGER_SPRITE } from "./spriteSettings.js";
import { INPUTS } from "./inputSettings.js";

export class Challenger {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = new Image()
        this.sprite.src = CHALLENGER_SPRITE.url;
        this.size = CHALLENGER_SPRITE.radius;
        this.speed = 10;
        this.shiftSpeed = 2.5;
    }
    move() {
        let xSpeed = 0;
        xSpeed = INPUTS.right ? xSpeed + 1 : xSpeed;
        xSpeed = INPUTS.left ? xSpeed - 1 : xSpeed;

        let ySpeed = 0;
        ySpeed = INPUTS.down ? ySpeed + 1 : ySpeed;
        ySpeed = INPUTS.up ? ySpeed - 1 : ySpeed;

        if (xSpeed != 0 || ySpeed != 0) {
            let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
            let applySpeed = INPUTS.shift ? this.shiftSpeed : this.speed;
            this.x += (xSpeed / normalize) * applySpeed;
            this.y += (ySpeed / normalize) * applySpeed;
        }
    }
}