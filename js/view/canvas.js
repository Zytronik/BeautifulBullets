import { INPUTS_CHALLENGER } from "../settings/inputSettings.js"
import { challenger, boss } from "../main.js";
import { BOARD_WIDTH } from "../settings/gameSettings.js";
import { GRAPHIC_SETTINGS, COLORS } from "../settings/graphicSettings.js";
import { mouseCoordinates } from "./windowOnLoad.js";
import { allBullets } from "../gameElements/bullet.js";

export let CANVAS_UNIT;
const GRADIENT_LOCATIONS = [0, 1/3, 2/3, 3/3, 4/3, 5/3, 6/3, 7/3];
const GRADIENT_BREAKPOINT = 8/3;
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
        this.bulletContainer = new PIXI.Container();
        this.canvasHeight;
        this.canvasWidth;
        this.challengerSprite;
        this.bossSprite;
        
        this.#createCharacterCanvas();
        this.#createBulletCanvas();
        this.resizeCanvas();
        this.#preloadImgs();
    }
    #preloadImgs() {
        PIXI.Assets.add('challengerSprite', challenger.sprite.src);
        PIXI.Assets.add('bossSprite', boss.sprite.src);
        const spritePromise = PIXI.Assets.load(['challengerSprite', 'bossSprite']);
        spritePromise.then((textures) => {
            this.challengerSprite = PIXI.Sprite.from(textures.challengerSprite);
            this.bossSprite = PIXI.Sprite.from(textures.bossSprite);;
            this.updateCanvas();
        });
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
        this.bulletApp.stage.addChild(this.bulletContainer);
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
        this.#drawChallenger();
        this.#drawBoss();
        this.#drawBulletsAndTrails();
        //TODO Omar mit Simu How the fuck does Pixi Renderer works with update loop??
        //this.characterApp.renderer.render(this.characterContainer);
        //this.bulletApp.renderer.render(this.bulletContainer);
        /* this.characterCtx.clearRect(0, 0, this.characterCanvas.width, this.characterCanvas.height);
        this.#drawChallenger();
        this.#drawBoss();
        this.#drawBulletsAndTrails();*/
    } 
    #drawChallenger() {
        //can potentially be stored
        let challengerAspectRatio = challenger.sprite.width / challenger.sprite.height;
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

        this.characterApp.stage.addChild(this.challengerSprite);
    }
    #drawBoss() {
        //can potentially be stored
        let bossAspectRatio = boss.sprite.width / boss.sprite.height;
        let bossWidth = CANVAS_UNIT * boss.spriteScaling * bossAspectRatio;
        let bossHeight = CANVAS_UNIT * boss.spriteScaling;
        this.bossSprite.anchor.set(0.5);
        this.bossSprite.x = CANVAS_UNIT * boss.x;
        this.bossSprite.y = CANVAS_UNIT * boss.y;
        this.bossSprite.width = bossWidth;
        this.bossSprite.height = bossHeight;

        this.characterApp.stage.addChild(this.bossSprite);
    }
    #drawBulletsAndTrails() {
        // TODO Simu PLS uwu (uskommentierte Code isch Original vo vorher);
        /* this.bulletCtx.clearRect(0, 0, this.bulletCanvas.width, this.bulletCanvas.height);
        allBullets.forEach(bullet => {
            this.#drawBullet(bullet)
        }); */
    }
    #drawBullet(bullet) {
        let bulletx = Math.floor(bullet.x);
        let bullety = Math.floor(bullet.y);
        


        
        // TODO Simu PLS uwu (uskommentierte Code isch Original vo vorher);
        /* let bulletx = Math.floor(bullet.x);
        let bullety = Math.floor(bullet.y);
        let fillStyle = this.bulletCtx.createRadialGradient(bulletx, bullety, 0, bulletx, bullety, bullet.visuals.radius);
        if (GRAPHIC_SETTINGS.PULSATING_BULLETS && bullet.visuals.showPulse) {
            for (let i = 0; i < GRADIENT_LOCATIONS.length; i++) {
                let gradientLocation = GRADIENT_LOCATIONS[i];
                gradientLocation = bullet.getGradientLocationOfCurrentPulse(gradientLocation, GRADIENT_BREAKPOINT) */
    
                //GRADIENT_LOCATIONS are ordered as follows: [subColor, subColor, mainColor, mainColor, subColor, subColor, mainColor, mainColor]
               /*  let useSubColor = (Math.floor(i / 2) % 2) === 0;
                if (gradientLocation <= 1 && useSubColor) {
                    fillStyle.addColorStop(gradientLocation, bullet.visuals.subColor);
                } else if (gradientLocation <= 1 && !useSubColor) {
                    fillStyle.addColorStop(gradientLocation, bullet.visuals.mainColor);
                } 
            } */
            //naive approach to find the 4th gradient out of bounds to manually set it to 1
            /* let leftOutGradientLocations = []
            let addedGradientsAmount = 0;
            GRADIENT_LOCATIONS.forEach(point => {
                if (point > 1) {
                    leftOutGradientLocations.push(point);
                } else {
                    addedGradientsAmount++;
                }
            });
            if (addedGradientsAmount === 3) {
                let indexOfNextGradientToAdd = GRADIENT_LOCATIONS.indexOf(Math.min(...leftOutGradientLocations))
                let colorSelection = (Math.floor(indexOfNextGradientToAdd / 2) % 2) === 0;
                if (colorSelection) {
                    fillStyle.addColorStop(1, bullet.visuals.subColor);
                } else {
                    fillStyle.addColorStop(1, bullet.visuals.mainColor);
                }
            }
        } else {
            fillStyle.addColorStop(0.5, bullet.visuals.subColor);
            fillStyle.addColorStop(1, bullet.visuals.mainColor);
        }
    
        this.bulletCtx.beginPath();
        this.bulletCtx.fillStyle = fillStyle;
        this.bulletCtx.arc(CANVAS_UNIT * bulletx, CANVAS_UNIT * bullety, bullet.visuals.radius, 0, 2 * Math.PI);
        this.bulletCtx.fill();
    
        if (GRAPHIC_SETTINGS.SHOW_BULLET_BORDER && bullet.visuals.showBorder) {
            let lineGradient;
            let xRot;
            let yRot;
            if (GRAPHIC_SETTINGS.ANIMATE_BULLET_BORDER && bullet.visuals.animateBorder) {
                let rotation = bullet.getCurrentRotation();
                xRot = Math.cos(rotation) - Math.sin(rotation);
                yRot = Math.sin(rotation) + Math.cos(rotation);
            } else {
                xRot = 1;
                yRot = 1;
                lineGradient = COLORS.BULLET_BORDER_WHITE
            } */
            // let radius = bullet.visuals.radius;
            // lineGradient = this.bulletCtx.createLinearGradient(bulletx - radius * xRot, bullety - radius * yRot, bulletx + radius * xRot, bullety + radius * yRot);
            // lineGradient.addColorStop("0", COLORS.BULLET_BORDER_WHITE);
            // lineGradient.addColorStop("1.0", COLORS.BULLET_BORDER_BLACK);
           /*  this.bulletCtx.strokeStyle = lineGradient;
            this.bulletCtx.lineWidth = bullet.visuals.borderWith;
            this.bulletCtx.stroke();
        }
        this.bulletCtx.closePath();*/
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