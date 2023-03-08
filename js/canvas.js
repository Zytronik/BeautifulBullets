import { INPUTS_CHALLENGER } from "./inputSettings.js"
import { challenger, boss, bullets } from "./main.js";

export class GameCanvas {
    constructor(container) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.container = container;
        this.#createCanvas();
    }
    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.#drawChallenger();
        this.#drawBoss();
        this.#drawBullets();
    }
    #createCanvas() {
        this.canvas.height = this.container.offsetHeight;
        this.canvas.width = this.canvas.height / 3 * 2;
        this.container.appendChild(this.canvas);
        this.canvas.classList.add("gameCanvas");
        this.updateCanvas();
    }
    #drawChallenger() {
        //TODO: make more pretty
        //drawImage(image, canvasX, canvasY, canvasWidth, canvasHeight)
        //drawImage(image, spriteSheetX, spriteSheetY, spriteSheetWidth, spriteSheetHeight, canvasX, canvasY, canvasWidth, canvasHeight)
        this.ctx.drawImage(challenger.sprite, challenger.x - challenger.sprite.width / 16, challenger.y - challenger.sprite.height / 16, challenger.sprite.width / 8, challenger.sprite.height / 8);
        if (INPUTS_CHALLENGER.shift) {
            this.ctx.beginPath();
            this.ctx.arc(challenger.x, challenger.y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            this.ctx.fill();
        }
    }
    #drawBoss() {
        this.ctx.drawImage(boss.sprite, boss.x, boss.y, boss.sprite.width / 7, boss.sprite.height / 7);
    }
    #drawBullets() {
        bullets.forEach(bullet => {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'green';
            this.ctx.arc(bullet.x, bullet.y, bullet.radius/2, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.drawImage(bullet.sprite, bullet.x, bullet.y, bullet.radius, bullet.radius);
        });
    }
}