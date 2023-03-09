import { BOSS_SPRITE } from "./spriteSettings.js";
import { INPUTS_BOSS } from "./inputSettings.js";

export class Boss {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = new Image()
        this.sprite.src = BOSS_SPRITE.url;
        this.radius = BOSS_SPRITE.radius;
        this.sizeFactor = BOSS_SPRITE.sizeFactor;
        this.speed = 3;
    }
    getPosition() {
        return { x: this.x, y: this.y };
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
            this.x += (xSpeed / normalize) * applySpeed;
            this.y += (ySpeed / normalize) * applySpeed;
        }
    }
}