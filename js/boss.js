import { canvasUnit } from "./canvas.js";
import { INPUTS_BOSS } from "./inputSettings.js";

export class Boss {
    constructor(bossData) {
        this.x;
        this.y;

        this.sprite = new Image();
        this.sprite.src = bossData.spriteUrl;
        this.spriteScaling = bossData.spriteScaling;
        this.radius = bossData.radius;

        this.speed = 3;
    }
    move() {
        let xSpeed = 0;
        xSpeed = INPUTS_BOSS.right ? xSpeed + 1 : xSpeed;
        xSpeed = INPUTS_BOSS.left ? xSpeed - 1 : xSpeed;

        let ySpeed = 0;
        ySpeed = INPUTS_BOSS.down ? ySpeed + 1 : ySpeed;
        ySpeed = INPUTS_BOSS.up ? ySpeed - 1 : ySpeed;

        if (xSpeed != 0 || ySpeed != 0) {
            let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
            let applySpeed = INPUTS_BOSS.shift ? this.shiftSpeed : this.speed;
            this.x += (xSpeed / normalize) * applySpeed * canvasUnit;
            this.y += (ySpeed / normalize) * applySpeed * canvasUnit;
        }
    }
}