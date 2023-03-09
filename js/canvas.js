import { INPUTS_CHALLENGER } from "./inputSettings.js"
import { challenger, boss, bullets } from "./main.js";

export class GameCanvas {
    constructor(container) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.container = container;
        this.#createCanvas();
        this.canvasUnit = this.canvas.width / 200;
    }
    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.#drawChallenger();
        this.#drawBoss();
        this.#drawBullets();

        /* this.ctx.beginPath(); TODOOO lösche nur test gsi
        this.ctx.arc(100, 400, 40, 0, 2 * Math.PI);
        this.ctx.fillStyle = "rgba(50, 168, 82, 0.1)";
        this.ctx.fill(); */
    }
    #createCanvas() {
        this.canvas.height = this.container.offsetHeight;
        this.canvas.width = this.canvas.height / 3 * 2;
        this.container.appendChild(this.canvas);
        this.canvas.classList.add("gameCanvas");
        this.updateCanvas();
    }
    resizeCanvas(){
        this.canvas.height = this.container.offsetHeight;
        this.canvas.width = this.canvas.height / 3 * 2;
        this.canvasUnit = this.canvas.width / 200;
    }
    #drawChallenger() {
        let challengerRatio = challenger.sprite.width / challenger.sprite.height;
        let challengerWidth = this.canvasUnit * challenger.sizeFactor * challengerRatio;
        let challengerHeight = this.canvasUnit * challenger.sizeFactor;
        this.ctx.drawImage(
            challenger.sprite,
            challenger.x - challengerWidth / 2,
            challenger.y - challengerHeight / 2,
            challengerWidth,
            challengerHeight,
        );
        if (INPUTS_CHALLENGER.shift) {
            this.ctx.beginPath();
            this.ctx.arc(challenger.x, challenger.y, this.canvasUnit * challenger.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = challenger.hitboxColor;
            this.ctx.fill();
        }
    }
    #drawBoss() {
        let bossRatio = boss.sprite.width / boss.sprite.height;
        let bossWidth = this.canvasUnit * boss.sprite.width * bossRatio * boss.sizeFactor;
        let bossHeight = this.canvasUnit * boss.sprite.height * boss.sizeFactor;
        this.ctx.drawImage(
            boss.sprite,
            boss.x - bossWidth / 2,
            boss.y - bossHeight / 2, 
            bossWidth, 
            bossHeight
        );
    }
    #drawBullets() {
        bullets.forEach(bullet => {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'red';
            var bulletRadius = bullet.radius * this.canvasUnit
            this.ctx.arc(
                bullet.x + bulletRadius / 2,
                bullet.y + bulletRadius / 2,
                bulletRadius / 2, 
                0, 
                2 * Math.PI
            );
            this.ctx.fill();
        });
    }
}