export class Bullet {
    constructor(x, y, trajectoryFunction, lifetime, bulletNumba, switcherino) {
        this.initX = x;
        this.initY = y;
        this.x = x;
        this.y = y;
        this.radius = sprite.radius;
        this.trajectoryFunction = trajectoryFunction;
        this.lifetime = lifetime;
        this.framesAlive = 0;
        this.bulletNumba = bulletNumba;
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
        let withinX = this.x <= -border || this.x >= challengerCanvas.canvas.width+border;
        let withinY = this.y <= -border || this.y >= challengerCanvas.canvas.height+border;
        return withinX && withinY;
    }
}