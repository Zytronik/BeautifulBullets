import { BOARD_HEIGHT, BOARD_WIDTH, CHALLENGER_I_FRAMES, FPS } from "./gameSettings.js";
import { INPUTS_CHALLENGER } from "./inputSettings.js";
import { Bullet } from "./bullet.js";
import { challengerBullets, boss } from "./gameLoop.js";

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
        this.bullets = 1;

        this.moveSpeed = challengerData.stats.moveSpeed;
        this.shiftSpeed = challengerData.shiftSpeed;

        this.useSpecialAbility = challengerData.special.use;
        this.specialMaxCharge = 100;
        this.specialCharge = 0;
        this.specialChargeRequired = challengerData.special.chargeRequired;
        this.specialGraceChargeSpeed = challengerData.special.graceChargeSpeed / FPS;
        this.specialPassiveChargeSpeed = challengerData.special.passiveChargeSpeed / FPS;
        this.specialCoolDownRequired = challengerData.special.coolDown * FPS;
        this.specialCoolDown = challengerData.special.coolDown * FPS;
        this.specialDuration = challengerData.special.duration * FPS;
        this.specialActiveFor = 0;
        this.specialActive = false;

        this.timeInGraceInFrames = 0;
    }
    gameTick() {
        this.#move();
        this.#gainPassiveCharge();
        this.#shootBullets();
        this.#specialAbility();
        this.#iframesTimeout();
    }
    gainGraceCharge() {
        if (this.specialCharge + this.specialGraceChargeSpeed > this.specialMaxCharge) {
            this.specialCharge = this.specialMaxCharge;
        } else {
            this.specialCharge += this.specialGraceChargeSpeed;
        }
        this.timeInGraceInFrames++;
    }
    takeDamageAndCheckDead() {
        if (!this.isInvincible) {
            this.currentHealth--;
            this.isInvincible = true;
            this.iFramesCounter = 0;
        }
        return this.currentHealth === 0;
    }
    reset() {
        this.x = BOARD_WIDTH / 2;
        this.y = BOARD_HEIGHT * 5 / 6;
        this.currentHealth = this.health;
        this.isInvincible = false;
        this.iFramesCounter = 0;
        this.fireRateTracker = 0;
        this.specialCharge = 0;
        this.specialActiveFor = 0;
        this.specialActive = false;
        this.timeInGraceInFrames = 0;
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
            this.x = (newX >= 0 && newX <= BOARD_WIDTH) ? newX : this.x;
            this.y = (newY >= 0 && newY <= BOARD_HEIGHT) ? newY : this.y;
        }
    }
    #gainPassiveCharge() {
        if (this.specialCharge + this.specialPassiveChargeSpeed > this.specialMaxCharge) {
            this.specialCharge = this.specialMaxCharge
        } else {
            this.specialCharge += this.specialPassiveChargeSpeed;
        }
    }
    #shootBullets() {
        if (this.fireRateTracker >= this.fireRateInFrames) {
            for (let i = 0; i < this.bullets; i++) {
                let bullet = new Bullet(this.x, this.y, this.bulletVisuals, trajectory, 10, [this.homing, 0, 0, i, this.bullets])
                challengerBullets.push(bullet);
                this.fireRateTracker = 0;
            }
        } else {
            this.fireRateTracker++
        }

        function trajectory() {
            let homing = this.attributes[0],
                maxSpeed = 0.5,
                x = 0,
                y = 0;
            if (this.attributes[4] == 1) {
                let angle = Math.atan2(boss.y - this.y, boss.x - this.x);
                x = Math.cos(angle) * (maxSpeed * (homing + (homing / 4))) + this.attributes[1];
                y = Math.sin(angle) * (maxSpeed * (homing)) / 3 + this.attributes[2];
                // x = Math.cos(angle)*(maxSpeed*(homing+(homing/2)))+(boss.xSpeedNormalized*homing/50)+this.attributes[1],
                // y = Math.sin(angle)*(maxSpeed*(homing))/3+(boss.ySpeedNormalized*homing/50)+this.attributes[2];
                this.attributes[1] = x;
                this.attributes[2] = y;
            } else {
                let c = Math.PI / ((10 - this.attributes[4]) * 2) ** (0.011 * this.attributes[4] ** 2 - 0.178 * this.attributes[4] + 1.211),
                    angle = Math.atan2(boss.y - this.y, boss.x - this.x) - (c / (this.attributes[4] - 1) * this.attributes[3]);
                x = Math.sin(c / (this.attributes[4] - 1) * this.attributes[3] + Math.PI - c / 2) * 10 + this.attributes[1];
                y = Math.cos(c / (this.attributes[4] - 1) * this.attributes[3] + Math.PI - c / 2) - 20 + this.attributes[2];
                this.attributes[1] += Math.cos(angle + c / (this.attributes[4] - 1) * this.attributes[3]) * (maxSpeed * (homing + homing / 3));
                this.attributes[2] += Math.sin(angle + c / (this.attributes[4] - 1) * this.attributes[3]) * maxSpeed * homing / 4;
                // console.log(this.attributes[4]);
            }
            return [x, y - 20]
        }
    }
    #specialAbility() {
        if (this.specialCoolDown <= this.specialCoolDownRequired) {
            this.specialCoolDown++;
        } else if (INPUTS_CHALLENGER.special && this.specialCharge >= this.specialChargeRequired && !this.specialActive) {
            this.specialActive = true;
            this.specialCharge -= this.specialChargeRequired;
            this.specialCoolDown = 0;
            this.specialActiveFor = 0;
        }
        if (this.specialActive && this.specialActiveFor <= this.specialDuration) {
            this.useSpecialAbility();
            this.specialActiveFor++;
        }
    }
    #iframesTimeout() {
        if (this.isInvincible) {
            this.iFramesCounter++;
            this.isInvincible = (this.iFramesCounter < CHALLENGER_I_FRAMES);
        }
    }
}