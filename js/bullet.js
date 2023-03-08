import { BULLET_SPRITE1 } from "./spriteSettings.js";

const BULLET_SPRITE1_IMAGE = new Image()
BULLET_SPRITE1_IMAGE.src = BULLET_SPRITE1.url;

const BULLET_IMAGE_MAP = new Map();
BULLET_IMAGE_MAP.set(BULLET_SPRITE1, BULLET_SPRITE1_IMAGE)

export class Bullet {
    constructor(x, y, sprite, trajectoryFunction, lifetime) {
        this.initX = x;
        this.initY = y;
        this.x = x;
        this.y = y;
        this.radius = sprite.radius;
        this.sprite = BULLET_IMAGE_MAP.get(sprite);
        this.trajectoryFunction = trajectoryFunction;
        this.lifetime = lifetime;
        this.framesAlive = 0;
    }
    nextPos() {
        let xyShift = this.trajectoryFunction(this.framesAlive);
        this.x += xyShift[0];
        this.y += xyShift[1];
        this.framesAlive++;
    }
    hasBulletFaded(){
        return this.framesAlive >= this.lifetime;
    }
}