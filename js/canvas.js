import { INPUTS } from "./inputSettings.js"

export class GameCanvas {
    constructor(container, challenger, boss) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.container = container;
        this.challenger = challenger;
        this.boss = boss;
        this.#createCanvas();
    }
    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.#drawChallenger();
        this.#drawBoss();
    }
    #createCanvas() {
        this.canvas.height = this.#getContainerHeight();
        this.canvas.width = this.canvas.height / 3 * 2;
        this.container.appendChild(this.canvas);
        this.canvas.classList.add("gameCanvas");
        this.updateCanvas();
    }
    #getContainerHeight() {
        return this.container.offsetHeight;
    }
    #drawChallenger() {
        //TODO: make more pretty
        this.ctx.drawImage(this.challenger.sprite, this.challenger.x - this.challenger.sprite.width / 16, this.challenger.y  - this.challenger.sprite.height / 16, this.challenger.sprite.width / 8, this.challenger.sprite.height / 8);
        if(INPUTS.shift){
            this.ctx.beginPath();
            this.ctx.arc(this.challenger.x, this.challenger.y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            this.ctx.fill(); 
        }
    }
    #drawBoss() {
        this.ctx.drawImage(this.boss.sprite, this.boss.x, this.boss.y, this.boss.sprite.width / 7, this.boss.sprite.height / 7);
    }
}