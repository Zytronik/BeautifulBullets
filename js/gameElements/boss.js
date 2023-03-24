import { isGameStateEnraged } from "../main.js";
import { BOARD_WIDTH, BOARD_HEIGHT, FPS } from "../settings/gameSettings.js";
import { INPUTS_BOSS } from "../settings/inputSettings.js";

export class Boss {
    constructor(bossData) {
        this.x = BOARD_WIDTH / 2;
        this.y = BOARD_HEIGHT / 6;

        this.healthBarSpriteUrl = bossData.healthBarSpriteUrl;
        this.healthBarName = bossData.healthBarName;

        this.canBeControlled = true;
        this.xSpeedNormalized = 0;
        this.ySpeedNormalized = 0;

        this.sprite = new Image();
        this.sprite.src = bossData.spriteUrl;
        this.spriteScaling = bossData.spriteScaling;
        this.radius = bossData.stats.radius;

        this.moveSpeed = bossData.stats.moveSpeed;
        this.maxHealth = bossData.stats.maxHealth;
        this.currentHealth = this.maxHealth;

        //foreach for frontend
        this.abilities = bossData.abilities;

        this.ability1 = bossData.abilities.ability1;
        this.ability1CoolDownRequired = bossData.abilities.ability1.coolDown * FPS;
        this.ability1CoolDown = bossData.abilities.ability1.coolDown * FPS;
        this.ability1Duration = bossData.abilities.ability1.duration * FPS;
        this.ability1ActiveFor = 0;
        this.ability1Active = false;

        this.ability2 = bossData.abilities.ability2;
        this.ability2CoolDownRequired = bossData.abilities.ability2.coolDown * FPS;
        this.ability2CoolDown = bossData.abilities.ability2.coolDown * FPS;
        this.ability2Duration = bossData.abilities.ability2.duration * FPS;
        this.ability2ActiveFor = 0;
        this.ability2Active = false;

        this.ability3 = bossData.abilities.ability3;
        this.ability3CoolDownRequired = bossData.abilities.ability3.coolDown * FPS;
        this.ability3CoolDown = bossData.abilities.ability3.coolDown * FPS;
        this.ability3Duration = bossData.abilities.ability3.duration * FPS;
        this.ability3ActiveFor = 0;
        this.ability3Active = false;

        this.passive = bossData.passive;
        this.passiveFrequency = bossData.passive.frequency * FPS;
        this.passiveCoolDown = bossData.passive.frequency * FPS;

        this.enragePassive = bossData.enrage;
        this.enrageFrequency = bossData.passive.frequency * FPS;
        this.enrageCoolDown = bossData.passive.frequency * FPS;
    }
    gameTick() {
        this.#move();
        this.#castAbility1();
        this.#castAbility2();
        this.#castAbility3();
        this.#castPassive();
    }
    takeDamageAndCheckDead(damageAmount) {
        if (!isGameStateEnraged) {
            this.currentHealth -= damageAmount;
            return this.currentHealth <= 0
        }
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
        if (this.canBeControlled) {
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
        } else {
            this.x += this.xSpeedNormalized;
            this.y += this.ySpeedNormalized;
        }
    }
    #castAbility1() {
        if (this.ability1CoolDown <= this.ability1CoolDownRequired) {
            this.ability1CoolDown++;
        } else if (INPUTS_BOSS.ability1 && !this.ability1Active) {
            this.ability1Active = true;
            this.ability1CoolDown = 0;
            this.ability1ActiveFor = 0;
        }
        if (this.ability1Active && this.ability1ActiveFor <= this.ability1Duration) {
            this.ability1.use();
            this.ability1ActiveFor++;
            if (this.ability1ActiveFor >= this.ability1Duration) {
                this.ability1.deactivate();
                this.ability1Active = false;
            }
        }
    }
    #castAbility2() {
        if (this.ability2CoolDown <= this.ability2CoolDownRequired) {
            this.ability2CoolDown++;
        } else if (INPUTS_BOSS.ability2 && !this.ability2Active) {
            this.ability2Active = true;
            this.ability2CoolDown = 0;
            this.ability2ActiveFor = 0;
        }
        if (this.ability2Active && this.ability2ActiveFor <= this.ability2Duration) {
            this.ability2.use();
            this.ability2ActiveFor++;
            if (this.ability2ActiveFor >= this.ability2Duration) {
                this.ability2.deactivate();
                this.ability2Active = false;
            }
        }
    }
    #castAbility3() {
        if (this.ability3CoolDown <= this.ability3CoolDownRequired) {
            this.ability3CoolDown++;
        } else if (INPUTS_BOSS.ability3 && !this.ability3Active) {
            this.ability3Active = true;
            this.ability3CoolDown = 0;
            this.ability3ActiveFor = 0;
        }
        if (this.ability3Active && this.ability3ActiveFor <= this.ability3Duration) {
            this.ability3.use();
            this.ability3ActiveFor++;
            if (this.ability3ActiveFor >= this.ability3Duration) {
                this.ability3.deactivate();
                this.ability3Active = false;
            }
        }
    }
    #castPassive() {
        if (!isGameStateEnraged) {
            if (this.passiveCoolDown <= this.passiveFrequency) {
                this.passiveCoolDown++;
            } else {
                this.passive.use();
                this.passiveCoolDown = 0;
            }
        } else {
            if (this.enrageCoolDown <= this.enrageFrequency) {
                this.enrageCoolDown++;
            } else {
                this.enragePassive.use();
                this.enrageCoolDown = 0;
            }
        }
    }
}