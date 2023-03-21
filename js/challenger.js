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
    gainGraceCharge() {
        if (this.specialCharge + this.specialGraceChargeSpeed > this.specialMaxCharge) {
            this.specialCharge = this.specialMaxCharge;
        } else {
            this.specialCharge += this.specialGraceChargeSpeed;
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
        this.currentHealth = this.health;
        this.isInvincible = false;
        this.iFramesCounter = 0;
        this.fireRateTracker = 0;
        this.specialCharge = 0;
        this.specialActiveFor = 0;
        this.specialActive = false;
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
            let bullet = new Bullet(this.x, this.y, this.bulletVisuals, trajectory, 10, [this.homing, 0, 0])
            challengerBullets.push(bullet);
            this.fireRateTracker = 0;
        } else {
            this.fireRateTracker++
        }

        function trajectory() {
            let homing = this.attributes[0],
                angle = Math.atan2(boss.y-this.y, boss.x-this.x),
                maxSpeed = 0.5,
                x = Math.cos(angle)*(maxSpeed*(homing+(homing/2)))+(boss.xSpeedNormalized*homing/50)+this.attributes[1],
                y = Math.sin(angle)*(maxSpeed*(homing))/3+(boss.ySpeedNormalized*homing/50)+this.attributes[2];
            this.attributes[1] = x;
            this.attributes[2] = y;
            // console.log(boss.xSpeedNormalized)
            return [x, y-20]
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