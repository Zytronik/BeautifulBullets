import {BULLET_SPRITES} from "./spriteSettings.js";

export class Bullet {
    constructor(x, y, orientation, spriteRef, trajectory, lifetime) {
        this.x = x;
        this.y = y;
        this.sizeX = spriteRef.sizeX;
        this.sizeY = spriteRef.sizeY;
        this.orientation = orientation;
        this.spriteRef = spriteRef;
        this.trajectory = trajectory;
        this.lifetime = lifetime;
        this.framesAlive = 0;
    }
}