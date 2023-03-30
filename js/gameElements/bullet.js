import { BOARD_HEIGHT, BOARD_WIDTH, FPS } from "../settings/gameSettings.js";

export let allBullets = [];
export class Bullet {
    constructor(x, y, visuals, origin, tag, trajectoryFunction, lifetimeInSeconds, attributes) {
        this.x = x;
        this.y = y;
        this.visuals = EXAMPLE_VISUALS;
        this.origin = origin;
        this.tag = tag;
        this.trajectoryFunction = trajectoryFunction;
        this.lifetime = lifetimeInSeconds * FPS;
        this.framesAlive = 0;
        this.attributes = attributes;
        this.trailHistory = []
    }
    getGradientLocationOfCurrentPulse(GRADIENT_LOCATION, GRADIENT_BREAKPOINT) {
        //1 / fps = stepAmount to get one pulse per second
        let res = GRADIENT_LOCATION + ((this.visuals.pulsesPerSecond / FPS) * this.framesAlive);
        while (res > GRADIENT_BREAKPOINT) {
            res = res - GRADIENT_BREAKPOINT;
        }
        return res;
    }
    getCurrentRotation() {
        //2pi / fps = stepAmount to get one rotation per second
        return ((2 * Math.PI * this.visuals.rotationsPerSecond) / FPS) * this.framesAlive;
    }
    nextPos() {
        this.trailHistory.unshift({ x: this.x, y: this.y });
        if (this.trailHistory.length > this.visuals.trailLength) {
            this.trailHistory.length = this.visuals.trailLength;
        }
        let xyShift = this.trajectoryFunction();
        this.x += xyShift[0];
        this.y += xyShift[1];
        this.framesAlive++;
    }
    hasBulletFaded() {
        return (this.framesAlive >= this.lifetime) || this.#isBulletOutOfFrame();
    }
    #isBulletOutOfFrame() {
        let border = this.visuals.radius * 3 + 100;
        let outsideX = this.x <= -border || this.x >= BOARD_WIDTH + border;
        let outsideY = this.y <= -border || this.y >= BOARD_HEIGHT + border;
        return outsideX || outsideY;
    }
}

const EXAMPLE_VISUALS = {
    radius: 10,                                     //size of the bullet. used in hitdetection
    mainColor: "rgba(255, 70, 70, 1)",              //main color visible inside of bullet
    subColor: "rgba(200, 123, 0, 0.4)",             //sub color  visible inside of bullet
    showBorder: true,                               //whether or not the border should be drawn
    animateBorder: true,                            //whether or not the border should be rotating
    borderWith: 3,                                  //width of the rotating border. not part of hitdetection
    rotationsPerSecond: 0.5,                        //rotation speed of the border 
    showPulse: true,                                //whether or not the pulse should be drawn
    pulsesPerSecond: 2,                             //pulse speed of the inner bullet gradient
    showTrail: true,                                //whether or not a bullet trail should be drawn
    trailColor: "rgb(255, 70, 70, 0.6)",            //trailcolor
    trailLength: 4,                                 //amount of bullet frameLocations to keep track of and display as trail
}

export const BULLET_ORIGIN = {
    CHALLENGER: "CHALLENGER",
    BOSS: "BOSS",
}

export const BULLET_TAG = {
    REGULAR_SHOT: "REGULAR_SHOT",
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