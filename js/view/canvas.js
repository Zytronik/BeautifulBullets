import { INPUTS_CHALLENGER } from "../settings/inputSettings.js"
import { challenger, boss, spriteLoader } from "../main.js";
import { BOARD_WIDTH } from "../settings/gameSettings.js";
import { mouseCoordinates } from "./windowOnLoad.js";
import { allBullets } from "../gameElements/bullet.js";

export let CANVAS_UNIT;
export class GameCanvas {
    constructor(container) {
        this.container = container;
        this.#setContainerSize();
        this.characterApp = new PIXI.Application({ 
            resizeTo: container,
            backgroundAlpha: 0,
        });
        this.characterContainer = new PIXI.Container();
        this.bulletApp = new PIXI.Application({
            resizeTo: container,
            backgroundAlpha: 0,
        });
        this.canvasHeight;
        this.canvasWidth;

        this.challengerSprite = new PIXI.Sprite();
        this.bossSprite = new PIXI.Sprite();
        
        this.#createCharacterCanvas();
        this.#createBulletCanvas();
        this.resizeCanvas();
        this.#initSprites();
    }
    #setContainerSize(){
        this.container.style.width = this.container.clientHeight * 2 / 3+"px";
    }
    #createCharacterCanvas() {
        this.container.appendChild(this.characterApp.view);
        this.characterApp.stage.addChild(this.characterContainer);
        this.characterApp.view.classList.add("characterCanvas");
    }
    #createBulletCanvas() {
        this.container.appendChild(this.bulletApp.view);
        this.bulletApp.view.classList.add("bulletCanvas");
    }
    resizeCanvas() {
        //TODO Omar resize gaht glaub nonig
        this.canvasHeight = this.container.offsetHeight;
        this.canvasWidth = this.container.clientHeight * 2 / 3
        CANVAS_UNIT = this.canvasWidth / BOARD_WIDTH;
        /* this.canvasHeight = this.container.offsetHeight;
        this.characterCanvas.height = this.canvasHeight;
        this.canvasWidth = this.characterCanvas.height * 2 / 3;
        this.characterCanvas.width = this.canvasWidth;
        this.bulletCanvas.width = this.characterCanvas.width;
        this.bulletCanvas.height = this.characterCanvas.height;
        CANVAS_UNIT = this.canvasWidth / BOARD_WIDTH; */
    }
    updateCanvas() {
        this.#drawBoss();
        this.#drawChallenger();
        this.#drawBulletsAndTrails();
    }
    addBullet(bullet) {
        this.bulletApp.stage.addChild(bullet);
    }
    removeBullet(bullet) {
        this.bulletApp.stage.removeChild(bullet);
    }
    #initSprites(){
        for(const index in spriteLoader.loadedTexturesArray){
            console.log(spriteLoader.loadedTexturesArray[index]);
        }
        this.#drawChallenger();
        this.characterApp.stage.addChild(this.challengerSprite);
        this.#drawBoss();
        this.characterApp.stage.addChild(this.bossSprite);
    }
    #drawChallenger() {
        let challengerSprites = spriteLoader.getCurrentChallengerTexture();
        this.challengerSprite.texture = challengerSprites.textures[0];

        let challengerAspectRatio = this.challengerSprite.texture.width / this.challengerSprite.texture.height;
        let challengerWidth = CANVAS_UNIT * challenger.spriteScaling * challengerAspectRatio;
        let challengerHeight = CANVAS_UNIT * challenger.spriteScaling;
        this.challengerSprite.anchor.set(0.5);
        this.challengerSprite.x = CANVAS_UNIT * challenger.x;
        this.challengerSprite.y = CANVAS_UNIT * challenger.y;
        this.challengerSprite.width = challengerWidth;
        this.challengerSprite.height = challengerHeight;
        if (INPUTS_CHALLENGER.shift) {
            const challengerShiftGraphic = new PIXI.Graphics();
            challengerShiftGraphic.lineStyle(0);
            challengerShiftGraphic.beginFill(challenger.hitboxColor, 1);
            challengerShiftGraphic.drawCircle(CANVAS_UNIT * challenger.x, CANVAS_UNIT * challenger.y, CANVAS_UNIT * challenger.radius);
            challengerShiftGraphic.endFill();
            this.characterApp.stage.addChild(challengerShiftGraphic);
        }
        
    }
    #drawBoss() {
        let bossSprites = spriteLoader.getCurrentBossTexture();
        this.bossSprite.texture = bossSprites.textures[0];
        
        let bossAspectRatio = this.bossSprite.texture.width / this.bossSprite.texture.height;
        let bossWidth = CANVAS_UNIT * boss.spriteScaling * bossAspectRatio;
        let bossHeight = CANVAS_UNIT * boss.spriteScaling;
        this.bossSprite.anchor.set(0.5);
        this.bossSprite.x = CANVAS_UNIT * boss.x;
        this.bossSprite.y = CANVAS_UNIT * boss.y;
        this.bossSprite.width = bossWidth;
        this.bossSprite.height = bossHeight;
    }
    #drawBulletsAndTrails() {
        allBullets.forEach(bullet => {
            this.#updateBulletPosition(bullet)
        });
        this.bulletApp.render();
    }
    #updateBulletPosition(bullet) {
        bullet.position.x = CANVAS_UNIT * (bullet.logicX -  bullet.radius);
        bullet.position.y = CANVAS_UNIT * (bullet.logicY -  bullet.radius);      
    }
}

export function convertMouseCoordinatesToCanvasCoordinates() {
    let mouseX = 0;
    let mouseY = 0;
    const canvas = document.querySelector("article.game .boss canvas");
    if (canvas != undefined) {
        const canvasTop = canvas.getBoundingClientRect().top;
        const canvasLeft = canvas.getBoundingClientRect().left;
        mouseX = (mouseCoordinates[0] - canvasLeft) / CANVAS_UNIT;
        mouseY = (mouseCoordinates[1] - canvasTop) / CANVAS_UNIT;
    }
    return [mouseX, mouseY];
}