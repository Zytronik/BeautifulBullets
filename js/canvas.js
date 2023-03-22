import { INPUTS_CHALLENGER } from "./inputSettings.js"
import { challenger, boss, bossBullets, challengerBullets } from "./gameLoop.js";
import { BOARD_WIDTH } from "./gameSettings.js";

export let CANVAS_UNIT;

export class GameCanvas {
    constructor(container) {
        this.characterCanvas = document.createElement("canvas");
        this.bulletCanvas = document.createElement("canvas");
        this.characterCtx = this.characterCanvas.getContext("2d");
        this.bulletCtx = this.bulletCanvas.getContext("2d");
        this.container = container;
        this.canvasHeight;
        this.canvasWidth;

        this.#createCharacterCanvas();
        this.#createBulletCanvas();
        this.resizeCanvas();
        this.updateCanvas();
    }
    resizeCanvas() {
        this.canvasHeight = this.container.offsetHeight;
        this.characterCanvas.height = this.canvasHeight;
        this.canvasWidth = this.characterCanvas.height * 2 / 3;
        this.characterCanvas.width = this.canvasWidth;
        this.bulletCanvas.width = this.characterCanvas.width;
        this.bulletCanvas.height = this.characterCanvas.height;
        CANVAS_UNIT = this.canvasWidth / BOARD_WIDTH;
    }
    updateCanvas() {
        this.characterCtx.clearRect(0, 0, this.characterCanvas.width, this.characterCanvas.height);
        this.#drawChallenger();
        this.#drawBoss();
        this.#drawBullets();
    }
    #createCharacterCanvas() {
        this.characterCanvas.height = this.container.clientHeight;
        this.characterCanvas.width = this.characterCanvas.height * 2 / 3;
        this.container.appendChild(this.characterCanvas);
        this.characterCanvas.classList.add("characterCanvas");
    }
    #createBulletCanvas() {
        this.bulletCanvas.height = this.container.clientHeight;
        this.bulletCanvas.width = this.characterCanvas.height * 2 / 3;
        this.container.appendChild(this.bulletCanvas);
        this.bulletCanvas.classList.add("bulletCanvas");
    }
    #drawChallenger() {
        //can potentially be stored
        let challengerAspectRatio = challenger.sprite.width / challenger.sprite.height;
        let challengerWidth = CANVAS_UNIT * challenger.spriteScaling * challengerAspectRatio;
        let challengerHeight = CANVAS_UNIT * challenger.spriteScaling;
        this.characterCtx.drawImage(
            challenger.sprite,
            CANVAS_UNIT * challenger.x - challengerWidth / 2,
            CANVAS_UNIT * challenger.y - challengerHeight / 2,
            challengerWidth,
            challengerHeight,
        );
        if (INPUTS_CHALLENGER.shift) {
            this.characterCtx.beginPath();
            this.characterCtx.arc(CANVAS_UNIT * challenger.x, CANVAS_UNIT * challenger.y, CANVAS_UNIT * challenger.radius, 0, 2 * Math.PI);
            this.characterCtx.fillStyle = challenger.hitboxColor;
            this.characterCtx.fill();
        }
        //console.log("challenger.x", challenger.x)
        // console.log("challenger.y", challenger.y)
        // console.log("this.canvasHeight", this.canvasHeight)
        // console.log("CANVAS_UNIT", CANVAS_UNIT)
        // console.log("BOARD_WIDTH", BOARD_WIDTH, "canvasWidth", this.canvasWidth, "canvasWidth / BOARD_WIDTH", this.canvasWidth / BOARD_WIDTH)
        // console.log("BOARD_HEIGHT", BOARD_HEIGHT, "canvasHeight", this.canvasHeight, "canvasHeight/ BOARD_HEIGHT", this.canvasHeight / BOARD_HEIGHT)
    }
    #drawBoss() {
        //can potentially be stored
        let bossAspectRatio = boss.sprite.width / boss.sprite.height;
        let bossWidth = CANVAS_UNIT * boss.spriteScaling * bossAspectRatio;
        let bossHeight = CANVAS_UNIT * boss.spriteScaling;
        this.characterCtx.drawImage(
            boss.sprite,
            CANVAS_UNIT * boss.x - bossWidth / 2,
            CANVAS_UNIT * boss.y - bossHeight / 2,
            bossWidth,
            bossHeight
        );
    }
    #drawBullets() {
        this.bulletCtx.clearRect(0, 0, this.bulletCanvas.width, this.bulletCanvas.height);
        bossBullets.forEach(bullet => {
            this.bulletCtx.beginPath();
            this.bulletCtx.fillStyle = bullet.color;
            this.bulletCtx.arc(
                CANVAS_UNIT * bullet.x,
                CANVAS_UNIT * bullet.y,
                CANVAS_UNIT * bullet.radius,
                0,
                2 * Math.PI
            );
            this.bulletCtx.fill();
        });
        challengerBullets.forEach(bullet => {
            this.bulletCtx.beginPath();
            this.bulletCtx.fillStyle = bullet.color;
            this.bulletCtx.arc(
                CANVAS_UNIT * bullet.x,
                CANVAS_UNIT * bullet.y,
                CANVAS_UNIT * bullet.radius,
                0,
                2 * Math.PI
            );
            this.bulletCtx.fill();
        });
    }
}