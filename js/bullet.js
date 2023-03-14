import { BOARD_HEIGHT, BOARD_WIDTH } from "./gameSettings.js";

export class Bullet {
    constructor(x, y, trajectoryFunction, lifetime, bulletNumba, switcherino, homing=0) {
        this.initX = x;
        this.initY = y;
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.trajectoryFunction = trajectoryFunction;
        this.lifetime = lifetime;
        this.framesAlive = 0;
        this.bulletNumba = bulletNumba;
        this.homing = homing;
        this.bool1 = switcherino;
        this.bool2 = switcherino;
        this.bool3 = switcherino;
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
        let border = this.radius*2;
        let withinX = (this.x <= -border || this.x >= BOARD_WIDTH+border);
        let withinY = (this.y <= -border || this.y >= BOARD_HEIGHT+border);
        return withinX || withinY;
    }
}