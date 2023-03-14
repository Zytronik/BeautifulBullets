import { BOARD_WIDTH, BOARD_HEIGHT } from "./gameSettings.js";
import { INPUTS_BOSS } from "./inputSettings.js";

export class Boss {
    constructor(bossData) {
        this.x = BOARD_WIDTH / 2;
        this.y = BOARD_HEIGHT / 6;

        this.sprite = new Image();
        this.sprite.src = bossData.spriteUrl;
        this.spriteScaling = bossData.spriteScaling;
        this.radius = bossData.radius;

        this.speed = bossData.speed;
        // this.maxHealth = bossData.health;
        // this.currentHealth = this.maxHealth;

        this.ability1 = bossData.ability1;
        // this.ability2 = bossData.ability2;
        // this.ability3 = bossData.ability3;
        // this.enrage = bossData.enrage;
        // this.passive = bossData.passive;
/*
        ability:
        use
        
        attributes[]
        CoolDown
        CurrentCoolDown
        
        abilityName
        description
        icon
*/        

    }
    move() {
        let xSpeed = 0;
        xSpeed = INPUTS_BOSS.right ? xSpeed + 1 : xSpeed;
        xSpeed = INPUTS_BOSS.left ? xSpeed - 1 : xSpeed;

        let ySpeed = 0;
        ySpeed = INPUTS_BOSS.down ? ySpeed + 1 : ySpeed;
        ySpeed = INPUTS_BOSS.up ? ySpeed - 1 : ySpeed;

        
        if (xSpeed != 0 || ySpeed != 0) {
            let normalize = Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2))
            let applySpeed = this.speed;
            let newX = this.x;
            let newY = this.y;
            newX += (xSpeed / normalize) * applySpeed;
            newY += (ySpeed / normalize) * applySpeed;
            if(this.#checkBoundaries(newX, newY)){
                this.x = newX;
                this.y = newY;
            }
        }
    }
    #checkBoundaries(newX, newY){
        return newX >= 0 && newX <= BOARD_WIDTH && newY >= 0 && newY <= BOARD_HEIGHT / 4;
    }
}