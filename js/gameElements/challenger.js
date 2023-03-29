import { BOARD_HEIGHT, BOARD_WIDTH, CHALLENGER_I_FRAMES, FPS } from "../settings/gameSettings.js";
import { INPUTS_CHALLENGER } from "../settings/inputSettings.js";
import { allBullets, Bullet, BULLET_ORIGIN } from "./bullet.js";
import { boss, isGameStateEnraged } from "../main.js";
import { sounds } from "../sound/sound.js";

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

        this.maxHealth = challengerData.stats.health;
        this.currentHealth = this.maxHealth;
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

        this.specialAbility = challengerData.special;
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
        this.#specialAbility();
        this.#iframesTimeout();
        if (!isGameStateEnraged) {
            this.#gainPassiveCharge();
            this.#shootBullets();
        }
    }
    gainGraceCharge() {
        if (!isGameStateEnraged) {
            if (this.specialCharge + this.specialGraceChargeSpeed > this.specialMaxCharge) {
                this.specialCharge = this.specialMaxCharge;
            } else {
                this.specialCharge += this.specialGraceChargeSpeed;
            }
            this.timeInGraceInFrames++;
        }
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
        this.currentHealth = this.maxHealth;
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
                sounds["challengerShotSound"].play();
                let attributes = [this.homing, 0, 0, i, this.bullets],
                    bullet = new Bullet(this.x, this.y, null, BULLET_ORIGIN.CHALLENGER, null, trajectory, 5, attributes);
                allBullets.push(bullet);
                this.fireRateTracker = 0;
            }
        } else {
            this.fireRateTracker++
        }

        function trajectory() {
            let homing = this.attributes[0],
                prevX = this.attributes[1],
                prevY = this.attributes[2],
                bulletNumber = this.attributes[3],
                totalBullets = this.attributes[4],
                maxSpeed = 0.5,
                x = 0,
                y = 0;
            if (this.attributes[4] == 1) {
                let angle = Math.atan2(boss.y - this.y, boss.x - this.x);
                x = Math.cos(angle) * (maxSpeed * (homing + (homing / 4))) + prevX + (boss.xSpeedNormalized*homing/30);
                y = Math.sin(angle) * (maxSpeed * (homing)) / 3 + prevY + (boss.ySpeedNormalized*homing/30);
                if (y >= 0) {
                    y = 0;
                }
                this.attributes[1] = x;
                this.attributes[2] = y;
            } else {
                let c = Math.PI / ((10 - totalBullets) * 2) ** (0.011 * totalBullets ** 2 - 0.178 * totalBullets + 1.211),
                    angle = Math.atan2(boss.y - this.y, boss.x - this.x) - (c / (totalBullets - 1) * bulletNumber);
                x = Math.sin(c / (totalBullets - 1) * bulletNumber + Math.PI - c / 2) * 10 + prevX + (boss.xSpeedNormalized*homing/30);
                y = Math.cos(c / (totalBullets - 1) * bulletNumber + Math.PI - c / 2) - 20 + prevX + (boss.ySpeedNormalized*homing/30);
                if (y >= 0) {
                    y = 0;
                }
                this.attributes[1] += Math.cos(angle + c / (totalBullets - 1) * bulletNumber) * (maxSpeed * (homing + homing / 3));
                this.attributes[2] += Math.sin(angle + c / (totalBullets - 1) * bulletNumber) * maxSpeed * homing / 4;
            }
            return [x, y - 20]
        }
    }
    /* TODO
    Special Ability with constant charge use and initial activation cost
    onDeactivate()
    */
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
            this.specialAbility.use();
            this.specialActiveFor++;
            if(this.specialActiveFor >= this.specialDuration){
                this.specialAbility.deactivate();
                this.specialActive = false;
            }
        }
    }
    #iframesTimeout() {
        if (this.isInvincible) {
            this.iFramesCounter++;
            this.isInvincible = (this.iFramesCounter < CHALLENGER_I_FRAMES);
        }
    }
}