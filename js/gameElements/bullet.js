import { player1Canvas, player2Canvas } from "../main.js";
import { BOARD_HEIGHT, BOARD_WIDTH, FPS } from "../settings/gameSettings.js";

export let allBullets = [];
export class Bullet {
    constructor(x, y, texture, bulletProperties, trajectoryFunction, trajectoryAttributes = [], lifetimeInSeconds = 10) {
        this.sprite1 = new PIXI.Sprite(texture[0])
        this.sprite2 = new PIXI.Sprite(texture[1])
        this.logicX = x;
        this.logicY = y;
        this.radius = texture[0].width/2;
        this.bulletProperties = bulletProperties;
        this.trajectoryFunction = trajectoryFunction;
        this.trajectoryAttributes = trajectoryAttributes;
        this.lifetime = lifetimeInSeconds * FPS;
        this.framesAlive = 0;
        this.trailHistory = []
        player1Canvas.addBullet(this.sprite1);
        player2Canvas.addBullet(this.sprite2);
    }
    nextPos() {
        this.trailHistory.unshift({ x: this.logicX, y: this.logicY });
        if (this.trailHistory.length > this.bulletProperties.trailLength) {
            this.trailHistory.length = this.bulletProperties.trailLength;
        }
        let xyShift = this.trajectoryFunction();
        this.logicX += xyShift[0];
        this.logicY += xyShift[1];
        this.framesAlive++;
    }
    hasBulletFaded() {
        return (this.framesAlive >= this.lifetime) || this.#isBulletOutOfFrame();
    }
    #isBulletOutOfFrame() {
        let border = this.radius * 3;
        let outsideX = this.logicX <= -border || this.logicX >= BOARD_WIDTH + border;
        let outsideY = this.logicY <= -border || this.logicY >= BOARD_HEIGHT + border;
        return outsideX || outsideY;
    }
}

export function getBulletsByOrigin(ORIGIN) {
    let filtered = allBullets.filter(bullet => {
        return bullet.origin === ORIGIN;
    });
    return filtered;
}

export function getBulletsByTag(TAG) {
    let filtered = allBullets.filter(bullet => {
        return bullet.origin === TAG;
    });
    return filtered;
}