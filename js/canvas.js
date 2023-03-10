import { INPUTS_CHALLENGER } from "./inputSettings.js"
import { challenger, boss, bullets } from "./main.js";

export let canvasUnit;
export let canvasHeight;
export let canvasWidth;
export class GameCanvas {
    constructor(container) {
        this.characterCanvas = document.createElement("canvas");
        this.bulletCanvas = document.createElement("canvas");
        this.characterCtx = this.characterCanvas.getContext("2d");
        this.bulletCtx = this.bulletCanvas.getContext("2d");
        this.container = container;
        
        this.#createCharacterCanvas();
        this.#createBulletCanvas();
        this.resizeCanvas();
        this.updateCanvas();
    }
    resizeCanvas() {
        canvasHeight = this.container.offsetHeight;
        canvasWidth = this.characterCanvas.height / 3 * 2;
        this.characterCanvas.height = canvasHeight;
        this.characterCanvas.width = canvasWidth;
        canvasUnit = this.characterCanvas.width / 200;
    }
    updateCanvas() {
        this.characterCtx.clearRect(0, 0, this.characterCanvas.width, this.characterCanvas.height);
        this.#drawChallenger();
        this.#drawBoss();
        this.#drawBullets();
    }
    #createCharacterCanvas() {
        this.characterCanvas.height = this.container.offsetHeight;
        this.characterCanvas.width = this.characterCanvas.height / 3 * 2;
        this.container.appendChild(this.characterCanvas);
        this.characterCanvas.classList.add("characterCanvas");
    }
    #createBulletCanvas() {
        this.bulletCanvas.height = this.container.offsetHeight;
        this.bulletCanvas.width = this.characterCanvas.height / 3 * 2;
        this.container.appendChild(this.bulletCanvas);
        this.bulletCanvas.classList.add("bulletCanvas");
    }
    #drawChallenger() {
        let challengerRatio = challenger.sprite.width / challenger.sprite.height;
        let challengerWidth = canvasUnit * challenger.spriteScaling * challengerRatio;
        let challengerHeight = canvasUnit * challenger.spriteScaling;
        this.characterCtx.drawImage(
            challenger.sprite,
            challenger.x - challengerWidth / 2,
            challenger.y - challengerHeight / 2,
            challengerWidth,
            challengerHeight,
        );
        if (INPUTS_CHALLENGER.shift) {
            this.characterCtx.beginPath();
            this.characterCtx.arc(challenger.x, challenger.y, canvasUnit * challenger.radius, 0, 2 * Math.PI);
            this.characterCtx.fillStyle = challenger.hitboxColor;
            this.characterCtx.fill();
        }
    }
    #drawBoss() {
        let bossRatio = boss.sprite.width / boss.sprite.height;
        let bossWidth = canvasUnit * boss.sprite.width * bossRatio * boss.spriteScaling;
        let bossHeight = canvasUnit * boss.sprite.height * boss.spriteScaling;
        this.characterCtx.drawImage(
            boss.sprite,
            boss.x - bossWidth / 2,
            boss.y - bossHeight / 2,
            bossWidth,
            bossHeight
        );
    }
    #drawBullets() {
        this.bulletCtx.clearRect(0, 0, this.bulletCanvas.width, this.bulletCanvas.height);
        bullets.forEach(bullet => {
            this.bulletCtx.beginPath();
            this.bulletCtx.fillStyle = 'red';
            var bulletRadius = bullet.radius * canvasUnit
            this.bulletCtx.arc(
                bullet.x + bulletRadius / 2,
                bullet.y + bulletRadius / 2,
                bulletRadius / 2,
                0,
                2 * Math.PI
            );
            this.bulletCtx.fill();
        });
    }
}