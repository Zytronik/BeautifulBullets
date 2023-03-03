export class GameCanvas {
    constructor(container, challenger) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.container = container;
        this.challenger = challenger;
        this.#createCanvas();
    }
    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.#drawChallenger();
    }
    #createCanvas() {
        this.canvas.height = this.#getContainerHeight();
        this.canvas.width = this.canvas.height / 3 * 2;
        this.container.appendChild(this.canvas);
        this.canvas.classList.add("gameCanvas");
        this.updateCanvas();
    }
    #getContainerHeight(){
        return this.container.offsetHeight;
    }
    #drawChallenger(){
        console.log(this.challenger);
        this.ctx.drawImage(this.challenger.sprite, this.challenger.x, this.challenger.y, this.challenger.sprite.width / 8, this.challenger.sprite.height / 8);
    }
}