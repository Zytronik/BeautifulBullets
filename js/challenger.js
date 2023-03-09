import { CHALLENGER_SPRITE } from "./spriteSettings.js";
import { INPUTS_CHALLENGER } from "./inputSettings.js";
import { challengerCanvas } from "./main.js"

export class Challenger {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = new Image()
        this.sprite.src = CHALLENGER_SPRITE.url;
        this.radius = CHALLENGER_SPRITE.radius;
        this.sizeFactor = CHALLENGER_SPRITE.sizeFactor;
        this.speed = 4;
        this.hitboxColor = CHALLENGER_SPRITE.hitboxColor;
        this.shiftSpeed = 1;
    }
    move() {
        let xSpeed = 0;
        xSpeed = INPUTS_CHALLENGER.right ? xSpeed + 1 : xSpeed;
        xSpeed = INPUTS_CHALLENGER.left ? xSpeed - 1 : xSpeed;

        let ySpeed = 0;
        ySpeed = INPUTS_CHALLENGER.down ? ySpeed + 1 : ySpeed;
        ySpeed = INPUTS_CHALLENGER.up ? ySpeed - 1 : ySpeed;

        if (xSpeed != 0 || ySpeed != 0) {
            let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
            let applySpeed = INPUTS_CHALLENGER.shift ? this.shiftSpeed : this.speed;
            this.x += (xSpeed / normalize) * applySpeed * challengerCanvas.canvasUnit;
            this.y += (ySpeed / normalize) * applySpeed * challengerCanvas.canvasUnit;
        }
    }
}