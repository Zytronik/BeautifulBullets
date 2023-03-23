import { BOARD_WIDTH, BOARD_HEIGHT, FPS } from "../settings/gameSettings.js";
import { INPUTS_BOSS } from "../settings/inputSettings.js";

export class Boss {
    constructor(bossData) {
        this.x = BOARD_WIDTH / 2;
        this.y = BOARD_HEIGHT / 6;

        this.healthBarSpriteUrl = bossData.healthBarSpriteUrl;
        this.healthBarName = bossData.healthBarName;

        this.xSpeedNormalized = 0;
        this.ySpeedNormalized = 0;

        this.sprite = new Image();
        this.sprite.src = bossData.spriteUrl;
        this.spriteScaling = bossData.spriteScaling;
        this.radius = bossData.stats.radius;

        this.moveSpeed = bossData.stats.moveSpeed;
        this.maxHealth = bossData.stats.maxHealth;
        this.currentHealth = this.maxHealth;

        this.abilities = bossData.abilities;
        this.ability1 = bossData.abilities.ability1;
        this.ability1CoolDownRequired = bossData.abilities.ability1.coolDown * FPS;
        this.ability1CoolDown = bossData.abilities.ability1.coolDown * FPS;

        // this.ability2 = bossData.ability2;
        // this.ability3 = bossData.ability3;

        this.passive = bossData.passive;
        this.passiveFrequency = bossData.passive.frequency * FPS;
        this.passiveCoolDown = bossData.passive.frequency * FPS;

        this.isEnraged = false;
        this.enrageAbility
        this.enrageFrequency = bossData.passive.frequency * FPS;
        this.enrageCoolDown = bossData.passive.frequency * FPS;
        // this.enrage = bossData.enrage;
    }
    gameTick() {
        this.#move();
        this.#castAbilities();
    }
    takeDamageAndCheckDead(damageAmount) {
        this.currentHealth -= damageAmount;
        return this.currentHealth <= 0
    }
    reset() {
        this.x = BOARD_WIDTH / 2;
        this.y = BOARD_HEIGHT / 6;
        this.xSpeedNormalized = 0;
        this.ySpeedNormalized = 0;
        this.currentHealth = this.maxHealth;
        this.ability1CoolDown = bossData.abilities.ability1.coolDown * FPS;
        this.passiveCoolDown = bossData.passive.frequency * FPS;
    }
    #move() {
        this.xSpeed = 0;
        this.ySpeed = 0;

        this.xSpeed = INPUTS_BOSS.right ? this.xSpeed + 1 : this.xSpeed;
        this.xSpeed = INPUTS_BOSS.left ? this.xSpeed - 1 : this.xSpeed;

        this.ySpeed = INPUTS_BOSS.down ? this.ySpeed + 1 : this.ySpeed;
        this.ySpeed = INPUTS_BOSS.up ? this.ySpeed - 1 : this.ySpeed;


        if (this.xSpeed != 0 || this.ySpeed != 0) {
            let normalize = Math.sqrt(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2))
            let applySpeed = this.moveSpeed;
            let newX = this.x;
            let newY = this.y;
            this.xSpeedNormalized = this.xSpeed / normalize * applySpeed;
            this.ySpeedNormalized = this.ySpeed / normalize * applySpeed;
            newX += this.xSpeedNormalized;
            newY += this.ySpeedNormalized;
            this.x = (newX >= 0 && newX <= BOARD_WIDTH) ? newX : this.x;
            this.y = (newY >= 0 && newY <= BOARD_HEIGHT * 2 / 7) ? newY : this.y;
            this.xSpeedNormalized = (newX >= 0 && newX <= BOARD_WIDTH) ? this.xSpeedNormalized : 0;
            this.ySpeedNormalized = (newY >= 0 && newY <= BOARD_HEIGHT * 2 / 7) ? this.ySpeedNormalized : 0;
        } else {
            this.xSpeedNormalized = 0;
            this.ySpeedNormalized = 0;
        }
    }
    #castAbilities() {
        //TODO inputbuffer?
        if (this.ability1CoolDown <= this.ability1CoolDownRequired) {
            this.ability1CoolDown++;
        } else if (INPUTS_BOSS.ability1) {
            this.ability1.use();
            this.ability1CoolDown = 0;
        }

        if (this.passiveCoolDown <= this.passiveFrequency) {
            this.passiveCoolDown++;
        } else {
            this.passive.use();
            this.passiveCoolDown = 0;
        }
    }
}