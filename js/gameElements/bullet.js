import { player1Canvas, player2Canvas } from "../main.js";
import { BOARD_HEIGHT, BOARD_WIDTH, FPS } from "../settings/gameSettings.js";

export let allBullets = [];
export class Bullet {
    constructor(x, y, texture, origin, tag, alphaLayer, trajectoryFunction, trajectoryAttributes = [], lifetimeInSeconds = 5) {
        this.sprite1 = new PIXI.Sprite(texture[0])
        this.sprite2 = new PIXI.Sprite(texture[1])
        this.logicX = x;
        this.logicY = y;
        this.radius = texture[0].width / 2;
        this.origin = origin;
        this.tag = tag;
        this.alphaLayer = alphaLayer;
        this.trajectoryFunction = trajectoryFunction;
        this.trajectoryAttributes = trajectoryAttributes;
        this.lifetimeInFrames = lifetimeInSeconds * FPS;
        this.framesAlive = 0;
        player1Canvas.addBullet(this.sprite1);
        player2Canvas.addBullet(this.sprite2);
        allBullets.push(this);
    }
    nextPos() {
        let xyShift = this.trajectoryFunction();
        this.logicX += xyShift[0];
        this.logicY += xyShift[1];
        this.framesAlive++;
        return { xPos: this.logicX, yPos: this.logicY }
    }
    hasBulletFaded() {
        return (this.framesAlive >= this.lifetimeInFrames) || this.#isBulletOutOfFrame();
    }
    #isBulletOutOfFrame() {
        let border = this.radius * 3;
        let outsideX = this.logicX <= -border || this.logicX >= BOARD_WIDTH + border;
        let outsideY = this.logicY <= -border || this.logicY >= BOARD_HEIGHT + border;
        return outsideX || outsideY;
    }
    getRadius() {
        return this.radius;
    }
    getLifetimeInFrame() {
        return this.lifetimeInFrames;
    }
}

export const BULLET_ORIGIN = {
    CHALLENGER: "CHALLENGER",
    BOSS: "BOSS",
}
export function getBulletsByOrigin(ORIGIN) {
    let filtered = allBullets.filter(bullet => {
        return bullet.origin === ORIGIN;
    });
    return filtered;
}

export const BULLET_TAG = {
    REGULAR_SHOT: "REGULAR_SHOT",
    NONE: "NONE",
}
export function getBulletsByTag(TAG) {
    let filtered = allBullets.filter(bullet => {
        return bullet.origin === TAG;
    });
    return filtered;
}

export const BULLET_TRAIL_ALPHAS = {
    ZERO: 0,
    POINT3: 0.3,
    POINT5: 0.5,
    POINT7: 0.7,
    POINT9: 0.9,
    POINT97: 0.97,
}

export const EXAMPLE_BULLET_TEXTURE_PROPERTIES = {
    radius: 10,                                     //total radius, including the border widths
    mainColor: "rgba(255, 70, 70, 0.3)",
    outerBorderColor: "rgba(0, 0, 0, 1)",
    outerBorderWidth: "2",
    innerBorderColor: "rgba(255, 255, 255, 1)",
    innerborderWidth: "2",
}
export function createBulletTexture(textureProperties) {
    let radius = textureProperties.radius;
    let bOuterWidth = textureProperties.outerBorderWidth;
    let bOuterColor = textureProperties.outerBorderColor;
    let bInnerBWidth = textureProperties.innerborderWidth;
    let bInnerColor = textureProperties.innerBorderColor;
    const bulletGraphics = new PIXI.Graphics()
        .lineStyle({ width: bOuterWidth, color: bOuterColor, alignment: 1 })
        .beginFill("FFFFFF00")
        .drawCircle(0, 0, radius - bOuterWidth)
        .lineStyle({ width: bInnerBWidth, color: bInnerColor, alignment: 1 })
        .beginFill(textureProperties.mainColor)
        .drawCircle(0, 0, (radius - bOuterWidth) - bInnerBWidth);

    const renderTexture1 = PIXI.RenderTexture.create({
        width: bulletGraphics.width,
        height: bulletGraphics.height,
    });
    player1Canvas.bulletApp.renderer.render(bulletGraphics, {
        renderTexture: renderTexture1,
        transform: new PIXI.Matrix(1, 0, 0, 1, bulletGraphics.width / 2, bulletGraphics.height / 2)
    });
    const renderTexture2 = PIXI.RenderTexture.create({
        width: bulletGraphics.width,
        height: bulletGraphics.height,
    });
    player2Canvas.bulletApp.renderer.render(bulletGraphics, {
        renderTexture: renderTexture2,
        transform: new PIXI.Matrix(1, 0, 0, 1, bulletGraphics.width / 2, bulletGraphics.height / 2)
    });

    bulletGraphics.destroy(true);
    return [renderTexture1, renderTexture2];
}