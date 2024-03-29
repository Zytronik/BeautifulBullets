import { INPUTS_CHALLENGER } from "../settings/inputSettings.js"
import { challenger, boss, spriteLoader } from "../main.js";
import { BOARD_WIDTH } from "../settings/gameSettings.js";
import { GRAPHIC_SETTINGS, COLORS } from "../settings/graphicSettings.js";
import { mouseCoordinates } from "./windowOnLoad.js";
import { allBullets } from "../gameElements/bullet.js";
import { SpriteAnimator } from "./spriteAnimator.js";

export let CANVAS_UNIT;
const GRADIENT_LOCATIONS = [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3, 6 / 3, 7 / 3];
const GRADIENT_BREAKPOINT = 8 / 3;
export class GameCanvas {
    constructor(container) {
        this.characterCanvas = document.createElement("canvas");
        this.bulletCanvas = document.createElement("canvas");
        this.characterCtx = this.characterCanvas.getContext("2d");
        this.bulletCtx = this.bulletCanvas.getContext("2d"); // , { alpha: false }
        this.container = container;
        this.canvasHeight;
        this.canvasWidth;

        let bossSprites = spriteLoader.getCurrentBossSprite()
        this.bossAnimator = new SpriteAnimator(bossSprites.urls, bossSprites.framerate);
        let challengerSprites = spriteLoader.getCurrentChallengerSprite()
        this.challengerAnimator = new SpriteAnimator(challengerSprites.urls, challengerSprites.framerate);

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
        this.#drawBulletsAndTrails();
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
        let challengerSprite = this.challengerAnimator.getNextFrame();
        //console.log(challengerSprite);
        let challengerAspectRatio = challengerSprite.width / challengerSprite.height;
        let challengerWidth = CANVAS_UNIT * challenger.spriteScaling * challengerAspectRatio;
        let challengerHeight = CANVAS_UNIT * challenger.spriteScaling;
        this.characterCtx.drawImage(
            challengerSprite,
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
    }
    #drawBoss() {
        //can potentially be stored
        let bossSprite = this.bossAnimator.getNextFrame();
        let bossAspectRatio = bossSprite.width / bossSprite.height;
        let bossWidth = CANVAS_UNIT * boss.spriteScaling * bossAspectRatio;
        let bossHeight = CANVAS_UNIT * boss.spriteScaling;
        this.characterCtx.drawImage(
            bossSprite,
            CANVAS_UNIT * boss.x - bossWidth / 2,
            CANVAS_UNIT * boss.y - bossHeight / 2,
            bossWidth,
            bossHeight
        );
    }
    #drawBulletsAndTrails() {
        this.bulletCtx.clearRect(0, 0, this.bulletCanvas.width, this.bulletCanvas.height);
        allBullets.forEach(bullet => {
            this.#drawBullet(bullet);
            this.#drawBulletTrail(bullet);
        });
    }
    #drawBullet(bullet) {
        let bulletx = Math.floor(CANVAS_UNIT * bullet.x);
        let bullety = Math.floor(CANVAS_UNIT * bullet.y);
        let fillStyle = this.bulletCtx.createRadialGradient(bulletx, bullety, 0, bulletx, bullety, bullet.visuals.radius);
        if (GRAPHIC_SETTINGS.PULSATING_BULLETS && bullet.visuals.showPulse) {
            for (let i = 0; i < GRADIENT_LOCATIONS.length; i++) {
                let gradientLocation = GRADIENT_LOCATIONS[i];
                gradientLocation = bullet.getGradientLocationOfCurrentPulse(gradientLocation, GRADIENT_BREAKPOINT)

                //GRADIENT_LOCATIONS are ordered as follows: [subColor, subColor, mainColor, mainColor, subColor, subColor, mainColor, mainColor]
                let useSubColor = (Math.floor(i / 2) % 2) === 0;
                if (gradientLocation <= 1 && useSubColor) {
                    fillStyle.addColorStop(gradientLocation, bullet.visuals.subColor);
                } else if (gradientLocation <= 1 && !useSubColor) {
                    fillStyle.addColorStop(gradientLocation, bullet.visuals.mainColor);
                }
            }
            //naive approach to find the 4th gradient out of bounds to manually set it to 1
            let leftOutGradientLocations = []
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
        this.bulletCtx.arc(bulletx, bullety, bullet.visuals.radius, 0, 2 * Math.PI);
        this.bulletCtx.fill();

        if (GRAPHIC_SETTINGS.SHOW_BULLET_BORDER && bullet.visuals.showBorder) {
            let lineGradient;
            let xRot;
            let yRot;
            if (GRAPHIC_SETTINGS.ANIMATE_BULLET_BORDER && bullet.visuals.animateBorder) {
                let rotation = bullet.getCurrentRotation();
                xRot = Math.cos(rotation) - Math.sin(rotation);
                yRot = Math.sin(rotation) + Math.cos(rotation);
                console.log("hello")
            } else {
                xRot = 1;
                yRot = 1;
                lineGradient = COLORS.BULLET_BORDER_WHITE
            }
            // let radius = bullet.visuals.radius;
            // lineGradient = this.bulletCtx.createLinearGradient(bulletx - radius * xRot, bullety - radius * yRot, bulletx + radius * xRot, bullety + radius * yRot);
            // lineGradient.addColorStop("0", COLORS.BULLET_BORDER_WHITE);
            // lineGradient.addColorStop("1.0", COLORS.BULLET_BORDER_BLACK);
            this.bulletCtx.strokeStyle = lineGradient;
            this.bulletCtx.lineWidth = bullet.visuals.borderWith;
            this.bulletCtx.stroke();
        }
        this.bulletCtx.closePath();
    }
    #drawBulletTrail(bullet) {
        if (GRAPHIC_SETTINGS.BULLET_TRAILS && bullet.visuals.showTrail) {
            let trailCoords = [...bullet.trailHistory];
            trailCoords.unshift({ x: bullet.x, y: bullet.y });
            this.bulletCtx.strokeStyle = bullet.visuals.trailColor;
            this.bulletCtx.lineWidth = bullet.visuals.radius * 2;

            let x1 = CANVAS_UNIT * trailCoords[trailCoords.length-1].x;
            let y1 = CANVAS_UNIT * trailCoords[trailCoords.length-1].y;
            let x2 = CANVAS_UNIT * trailCoords[Math.floor((trailCoords.length-1)/2)].x;
            let y2 = CANVAS_UNIT * trailCoords[Math.floor((trailCoords.length-1)/2)].y;
            let x3 = CANVAS_UNIT * trailCoords[0].x;
            let y3 = CANVAS_UNIT * trailCoords[0].y;

            let w1 = CANVAS_UNIT * bullet.visuals.trailMinWidth;
            let w2 = CANVAS_UNIT * bullet.visuals.radius;

            let xdiff = x3 - x1
            let ydiff = y3 - y1
            let alpha = Math.atan(ydiff / xdiff)
            let beta = Math.PI / 2 - alpha

            let startX1 = x1 - Math.cos(beta) * w1
            let startY1 = y1 + Math.sin(beta) * w1
            let midX1 = x2 - Math.cos(beta) * (w1 + w2) / 2
            let midY1 = y2 + Math.sin(beta) * (w1 + w2) / 2
            let endX1 = x3 - Math.cos(beta) * w2
            let endY1 = y3 + Math.sin(beta) * w2

            let endX2 = x3 + Math.cos(beta) * w2
            let endY2 = y3 - Math.sin(beta) * w2
            let midX2 = x2 + Math.cos(beta) * (w1 + w2) / 2
            let midY2 = y2 - Math.sin(beta) * (w1 + w2) / 2
            let startX2 = x1 + Math.cos(beta) * w1
            let startY2 = y1 - Math.sin(beta) * w1
            
            let gradient = this.bulletCtx.createLinearGradient(startX1, startY1, endX2, endY2);
            gradient.addColorStop(0, "rgba(0,0,0,0)");
            gradient.addColorStop(1, bullet.visuals.trailColor);

            this.bulletCtx.beginPath();
            this.bulletCtx.fillStyle = gradient;
            this.bulletCtx.moveTo(startX1, startY1);
            this.bulletCtx.quadraticCurveTo(midX1, midY1, endX1, endY1);
            this.bulletCtx.lineTo(endX2, endY2);
            this.bulletCtx.quadraticCurveTo(midX2, midY2, startX2, startY2);
            this.bulletCtx.fill();
            this.bulletCtx.closePath();
        }
        /*
        trailmath:
            let x1 = 20
            let y1 = 20
            let x2 = 120
            let y2 = 50
            let x3 = 220
            let y3 = 310

            let w1 = 3
            let w2 = 20

            let xdiff = x3 - x1
            let ydiff = y3 - y1
            let alpha = Math.atan(ydiff / xdiff)
            let beta = Math.PI/2 - alpha

            let startX1 = x1 - Math.cos(beta) * w1
            let startY1 = y1 + Math.sin(beta) * w1
            let midX1 = x2 - Math.cos(beta) * (w1 + w2) / 2
            let midY1 = y2 + Math.sin(beta) * (w1 + w2) / 2
            let endX1 = x3 - Math.cos(beta) * w2
            let endY1 = y3 + Math.sin(beta) * w2

            let endX2 = x3 + Math.cos(beta) * w2
            let endY2 = y3 - Math.sin(beta) * w2
            let midX2= x2 + Math.cos(beta) * (w1 + w2) / 2
            let midY2 = y2 - Math.sin(beta) * (w1 + w2) / 2
            let startX2 = x1 + Math.cos(beta) * w1
            let startY2 = y1 - Math.sin(beta) * w1
        */
    }
    /*
        2radius -> minwidth
        (2radius - minwidth) / steps, 
    */
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