export class Bullet {
    constructor(x, y, sprite, trajectory, lifetime) {
        this.initX = x;
        this.initY = y;
        this.x = x;
        this.y = y;
        this.trajectory = trajectory;
        this.lifetime = lifetime;
        this.framesAlive = 0;
    }
    nextPos() {
        let xyShift = this.trajectory(this.framesAlive);
        this.x += xyShift[0];
        this.y += xyShift[1];
        this.framesAlive++;
    }
    hasBulletFaded(){
        return this.framesAlive >= this.lifetime;
    }
}