import { BOARD_HEIGHT, BOARD_WIDTH } from "./gameSettings.js";
import { INPUTS_CHALLENGER } from "./inputSettings.js";

export class Challenger {
    constructor(challengerData, specialAbility) {
        this.x = BOARD_WIDTH / 2;
        this.y = BOARD_HEIGHT * 5 / 6;

        this.sprite = new Image();
        this.sprite.src = challengerData.spriteUrl;
        this.spriteScaling = challengerData.spriteScaling;
        this.radius = challengerData.radius;
        this.hitboxColor = challengerData.hitboxColor;

        this.health = challengerData.health;
        this.currentHealth = this.health;

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
            let newX = this.x;
            let newY = this.y;
            newX += (xSpeed / normalize) * applySpeed;
            newY += (ySpeed / normalize) * applySpeed;
            if(this.#checkBoundaries(newX, newY)){
                this.x = newX;
                this.y = newY;
            }
        }

        if (INPUTS_CHALLENGER.special || this.specialActive) {
            this.useSpecialAbility();
        }

        this.#shootBullets();
    }
    #checkBoundaries(newX, newY){
        return newX >= 0 && newX <= BOARD_WIDTH && newY >= 0 && newY <= BOARD_HEIGHT;
    }

    takeDamage(){

    }

    gainCharge() {

    }

    #shootBullets() {

    }
}