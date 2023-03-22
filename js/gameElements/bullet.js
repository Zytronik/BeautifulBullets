import { BOARD_HEIGHT, BOARD_WIDTH, FPS } from "../settings/gameSettings.js";

export class Bullet {
    constructor(x, y, visuals, trajectoryFunction, lifetimeInSeconds, attributes) {
        this.x = x;
        this.y = y;
        this.color = visuals.color;
        this.radius = visuals.radius;
        this.trajectoryFunction = trajectoryFunction;
        this.lifetime = lifetimeInSeconds * FPS;
        this.framesAlive = 0;
        this.attributes = attributes;
    }
    nextPos() {
        let xyShift = this.trajectoryFunction();
        this.x += xyShift[0];
        this.y += xyShift[1];
        this.framesAlive++;
    }
    hasBulletFaded() {
        return (this.framesAlive >= this.lifetime) || this.#isBulletOutOfFrame();
    }
    #isBulletOutOfFrame() {
        let border = this.radius * 2;
        let outsideX = this.x <= -border || this.x >= BOARD_WIDTH + border;
        let outsideY = this.y <= -border || this.y >= BOARD_HEIGHT + border;
        return outsideX || outsideY;
    }
}

/*
animations

challenger
	idle
	left
	right
	down
	up
	special

	death
	intro
	sideswitch 

boss	
	idle
	left
	right
	down
	up
	a1
	a2
	a3
	
	enrage timeup
	enrage death
	intro
	sideswitch 

background
	layer1
	layer2
	layer3



bulletManager
	challengerBullets
	bossBullets
        ability1
        ability2
        ability3
        passive

hitableObject


bullet
	traillength
	trailhistory
*/