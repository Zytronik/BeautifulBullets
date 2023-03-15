import { BOARD_HEIGHT, BOARD_WIDTH, CHALLENGER_I_FRAMES, FPS } from "./gameSettings.js";
import { INPUTS_CHALLENGER } from "./inputSettings.js";
import { Bullet } from "./bullet.js";
import { challengerBullets, boss } from "./main.js";

export class Challenger {
    constructor(challengerData) {
        this.x = BOARD_WIDTH / 2;
        this.y = BOARD_HEIGHT * 5 / 6;

        this.sprite = new Image();
        this.sprite.src = challengerData.spriteUrl;
        this.spriteScaling = challengerData.spriteScaling;
        this.radius = challengerData.radius;
        this.hitboxColor = challengerData.hitboxColor;
        this.bulletVisuals = challengerData.bulletVisuals;

        this.health = challengerData.stats.health;
        this.currentHealth = this.health;
        this.isInvincible = false;
        this.iFramesCounter = 0;

        this.homing = challengerData.stats.homing;
        this.fireRateInFrames = FPS / challengerData.stats.fireRate;
        this.fireRateTracker = 0;
        this.bulletDamage = challengerData.stats.bulletDamage;
        this.bulletSpeed = challengerData.bulletSpeed;

        this.moveSpeed = challengerData.stats.moveSpeed;
        this.shiftSpeed = challengerData.shiftSpeed;

        this.useSpecialAbility = challengerData.special.use;
        this.specialMaxCharge = 100;
        this.specialCharge = 0;
        this.specialChargeRequired = challengerData.special.chargeRequired;
        this.specialGraceChargeSpeed = challengerData.special.graceChargeSpeed / FPS;
        this.specialPassiveChargeSpeed = challengerData.special.passiveChargeSpeed / FPS;
        this.specialDuration = challengerData.special.duration;
        this.specialActiveFor = 0;
        this.specialActive = false;
    }
    gameTick() {
        this.#move();
        this.#gainPassiveCharge();
        this.#shootBullets();
        this.#specialAbility();
        this.#iframesTimeout();
    }
    gainGraceCharge() { this.specialCharge += this.specialGraceChargeSpeed; }
    takeDamageAndCheckDead() {
        if (!this.isInvincible) {
            this.currentHealth--;
            this.isInvincible = true;
            this.iFramesCounter = 0;
        }
        return this.currentHealth === 0;
    }
    #move() {
        let xSpeed = 0;
        xSpeed = INPUTS_CHALLENGER.right ? xSpeed + 1 : xSpeed;
        xSpeed = INPUTS_CHALLENGER.left ? xSpeed - 1 : xSpeed;

        let ySpeed = 0;
        ySpeed = INPUTS_CHALLENGER.down ? ySpeed + 1 : ySpeed;
        ySpeed = INPUTS_CHALLENGER.up ? ySpeed - 1 : ySpeed;

        if (xSpeed != 0 || ySpeed != 0) {
            let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
            let applySpeed = INPUTS_CHALLENGER.shift ? this.shiftSpeed : this.moveSpeed;
            let newX = this.x;
            let newY = this.y;
            newX += (xSpeed / normalize) * applySpeed;
            newY += (ySpeed / normalize) * applySpeed;
            if (checkBoundaries(newX, newY)) {
                this.x = newX;
                this.y = newY;
            }
        }

        function checkBoundaries(newX, newY) {
            return newX >= 0 && newX <= BOARD_WIDTH && newY >= 0 && newY <= BOARD_HEIGHT;
        }
    }
    #gainPassiveCharge() {
        this.specialCharge += this.specialPassiveChargeSpeed;
    }
    #shootBullets() {
        if (this.fireRateTracker >= this.fireRateInFrames) {
            let bullet = new Bullet(this.x, this.y, this.bulletVisuals, trajectory, 10, [this.homing])
            challengerBullets.push(bullet);
            this.fireRateTracker = 0;
        } else {
            this.fireRateTracker++
        }

        function trajectory() {
            let translation;
            let homing = this.attributes[0]
            if (boss.x - this.x + translation >= 0) {
                translation = 50;
            } else {
                translation = -50;
            }
            let x = ((boss.x - this.x + translation) * homing) / this.lifetime * this.framesAlive * homing / (2.5 * homing);
            let y = -20;
            return [x, y]
        }
    }
    #specialAbility() {
        if (INPUTS_CHALLENGER.special && this.specialCharge >= this.specialChargeRequired) {
            this.useSpecialAbility();
            this.specialCharge -= this.specialChargeRequired;
        }
    }
    #iframesTimeout() {
        if (this.isInvincible) {
            this.iFramesCounter++;
            this.isInvincible = (this.iFramesCounter < CHALLENGER_I_FRAMES);
        }
    }
}