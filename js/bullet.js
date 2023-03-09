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
}