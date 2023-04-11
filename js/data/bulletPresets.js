import { player1Canvas, player2Canvas } from "../main.js"

export const BULLET_ORIGIN = {
    CHALLENGER: "CHALLENGER",
    BOSS: "BOSS",
}

export const BULLET_TAG = {
    REGULAR_SHOT: "REGULAR_SHOT",
}

export const EXAMPLE_BULLET_PROPERTIES = {
    origin: BULLET_ORIGIN.BOSS,
    tag: BULLET_TAG.REGULAR_SHOT,
    showTrail: true,                                //whether or not a bullet trail should be drawn
    trailColor: "rgb(255, 70, 70, 0.6)",            //trailcolor
    trailLength: 4,                                 //amount of bullet frameLocations to keep track of and display as trail
}

export const EXAMPLE_BULLET_PROPERTIES_CHALLENGER = {
    origin: BULLET_ORIGIN.CHALLENGER,
    tag: BULLET_TAG.REGULAR_SHOT,
    showTrail: true,                                //whether or not a bullet trail should be drawn
    trailColor: "rgb(255, 70, 70, 0.6)",            //trailcolor
    trailLength: 4,                                 //amount of bullet frameLocations to keep track of and display as trail
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
        .lineStyle({ width: bOuterWidth, color: bOuterColor, alignment: 0 })
        .beginFill("0xFFFFFF00")
        .drawCircle(0, 0, radius - bOuterWidth)
        .lineStyle({ width: bInnerBWidth, color: bInnerColor, alignment: 0 })
        .beginFill(textureProperties.mainColor)
        .drawCircle(0, 0, radius - (bOuterWidth - bInnerBWidth));
    const { width, height } = bulletGraphics;
    const renderTexture = PIXI.RenderTexture.create({
        width,
        height,
    });
    //TODO probably the wrong app
    player1Canvas.bulletApp.renderer.render(bulletGraphics, {
        renderTexture,
        transform: new PIXI.Matrix(1, 0, 0, 1, width / 2, height / 2)
    });
    player2Canvas.bulletApp.renderer.render(bulletGraphics, {
        renderTexture,
        transform: new PIXI.Matrix(1, 0, 0, 1, width / 2, height / 2)
    });
    bulletGraphics.destroy(true);
    return renderTexture;
}