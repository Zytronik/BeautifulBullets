import { CHALLENGER_SPRITE } from "./spriteSettings.js";
import { INPUTS_CHALLENGER } from "./inputSettings.js";
import { CHARACTER_NAME } from "./characters.js";

export const CHARACTER_STATS_MAP = new Map();
BULLET_SPAWNER_MAP.set(CHARACTER_NAME.JOHN, []);

export class Challenger {
    constructor(challengerData, specialAbility) {
        this.x;
        this.y;

        this.sprite = new Image();
        this.sprite.src = challengerData.SpriteUrl;
        this.sizeFactor = challengerData.sizeFactor;
        this.radius = challengerData.radius;
        this.hitboxColor = challengerData.hitboxColor;

        this.health = challengerData.health;

        this.homing = challengerData.homing;
        this.fireRate = challengerData.fireRate;
        this.bulletDamage = challengerData.bulletDamage;
        this.bulletSpeed = challengerData.bulletSpeed;

        this.speed = challengerData.speed;
        this.shiftSpeed = challengerData.shiftSpeed;

        this.specialCharge = 0;
        this.specialChargeRequired = challengerData.specialChargeRequired;
        this.specialMaxCharge = 100;
        this.specialChargeSpeed = challengerData.specialChargeSpeed;
        this.specialPassiveChargeSpeed = challengerData.specialPassiveChargeSpeed;
        
        this.specialDuration = challengerData.specialDuration;
        this.specialActiveFor = 0;
        this.specialActive = false;

        this.useSpecialAbility = specialAbility;
    }

    move() {
        let xSpeed = 0;
        xSpeed = INPUTS_CHALLENGER.right ? xSpeed + 1 : xSpeed;
        xSpeed = INPUTS_CHALLENGER.left ? xSpeed - 1 : xSpeed;

        let ySpeed = 0;
        ySpeed = INPUTS_CHALLENGER.down ? ySpeed + 1 : ySpeed;
        ySpeed = INPUTS_CHALLENGER.up ? ySpeed - 1 : ySpeed;

        if (xSpeed != 0 || ySpeed != 0) {
            let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
            let applySpeed = INPUTS_CHALLENGER.shift ? this.shiftSpeed : this.speed;
            this.x += (xSpeed / normalize) * applySpeed * challengerCanvas.canvasUnit;
            this.y += (ySpeed / normalize) * applySpeed * challengerCanvas.canvasUnit;
        }

        if (INPUTS_CHALLENGER.special || this.specialActive) {
            this.useSpecialAbility();
        }

        this.#shootBullets();
    }

    takeDamage(){

    }

    gainCharge() {

    }

    #shootBullets() {

    }
}