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
        let border = this.radius * 2 + 100;
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
    


hitableObject

trajectoryField

bullet
    tag

	traillength
	trailhistory


https://jsfiddle.net/

    var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x = 50,
  y = 50,
  // Radii of the white glow.
  innerRadius = 5,
  outerRadius = 47,
  // Radius of the entire circle.
  radius = 50,
  gradient,
  joolean = false,
  step = 0.01,
  firstStop = 0,
  secondStopInit = 0.8,
  secondStop = 0.8;

function gameLoop() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
  gradient.addColorStop(0, 'rgba(123, 255, 123, 1)');
  gradient.addColorStop(firstStop, 'rgba(123, 255, 123, 1)');
  gradient.addColorStop(secondStop, 'rgba(255, 0, 0, 1)');
  gradient.addColorStop(secondStopInit, 'rgba(255, 0, 0, 1)');
  gradient.addColorStop(0.9, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.95, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
  firstStop = (firstStop + step > secondStopInit) ? 0 : firstStop + step;
  secondStop = (secondStop - step <= 0) ? secondStopInit : secondStop - step;



  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();

  gradient = null;

  requestAnimationFrame(gameLoop);
}

gameLoop();
*/