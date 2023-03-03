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
    }
    move() {
        let xSpeed = 0;
        xSpeed = INPUTS.right ? xSpeed + 1 : xSpeed;
        xSpeed = INPUTS.left ? xSpeed - 1 : xSpeed;

        let ySpeed = 0;
        ySpeed = INPUTS.down ? ySpeed + 1 : ySpeed;
        ySpeed = INPUTS.up ? ySpeed - 1 : ySpeed;

        if (xSpeed != 0 || ySpeed != 0) {

            console.log("this.x", this.x)
            console.log("this.y", this.y)


            let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))

            console.log("normalize", normalize)
            console.log("xSpeed / normalize", xSpeed / normalize)
            console.log("ySpeed / normalize", ySpeed / normalize)

            this.x += (xSpeed / normalize) * this.speed;
            this.y += (ySpeed / normalize) * this.speed;
        }
    }
}