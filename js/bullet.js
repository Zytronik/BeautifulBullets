import { BULLET_SPRITE1 } from "./spriteSettings.js";
import { challengerCanvas } from "./main.js";

const BULLET_SPRITE1_IMAGE = new Image()
BULLET_SPRITE1_IMAGE.src = BULLET_SPRITE1.url;

const BULLET_IMAGE_MAP = new Map();
BULLET_IMAGE_MAP.set(BULLET_SPRITE1, BULLET_SPRITE1_IMAGE)

export class Bullet {
    constructor(x, y, sprite, trajectoryFunction, lifetime, bulletNumba, switcherino) {
        this.initX = x;
        this.initY = y;
        this.x = x;
        this.y = y;
        this.radius = sprite.radius;
        this.trajectoryFunction = trajectoryFunction;
        this.lifetime = lifetime;
        this.framesAlive = 0;
        this.bulletNumba = bulletNumba;
        this.switcherino = switcherino;
    }
    nextPos() {
        let xyShift = this.trajectoryFunction(this.bulletNumba, 50, this.framesAlive/this.lifetime);
        this.x += xyShift[0];
        this.y += xyShift[1];
        this.framesAlive++;
    }

    hasBulletFaded(){
        return this.framesAlive >= this.lifetime;
    }

    isBulletOutOfFrame(){
        let border = 50;
        if (this.x <= -border || this.x >= challengerCanvas.canvas.width+border || this.y <= -border || this.y >= challengerCanvas.canvas.height+border) {
            return true;
        } else {
            return false;
        }
    }
}