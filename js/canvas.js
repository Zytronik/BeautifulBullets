export class GameCanvas {
    constructor(container) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.container = container;
        this.#createCanvas();
    }
    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
}