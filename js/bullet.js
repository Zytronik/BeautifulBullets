class Bullet {
    constructor(x, y, orientation, spriteRef, trajectory, lifetime) {
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.orientation = orientation;
        this.spriteRef = spriteRef;
        this.trajectory = trajectory;
        this.lifetime = lifetime;
        this.framesAlive = 0;
    }
}