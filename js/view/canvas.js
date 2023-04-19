import { INPUTS_CHALLENGER } from "../settings/inputSettings.js"
import { challenger, boss, spriteLoader, isGameStateEnraged } from "../main.js";
import { BOARD_WIDTH } from "../settings/gameSettings.js";
import { mouseCoordinates } from "./windowOnLoad.js";
import { allBullets, BULLET_TRAIL_ALPHAS } from "../gameElements/bullet.js";

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
        this.#createBulletCanvas();
        this.bulletTrailLayersMap = new Map();
        this.#initializeBulletTrailLayers();

        this.canvasHeight;
        this.canvasWidth;

        this.challengerSprite = new PIXI.Sprite();
        this.bossSprite = new PIXI.Sprite();

        this.backgroundApp = new PIXI.Application({
            /* background: '#1099bb', */
            resizeTo: container,
        });
        this.bgCloudsArray = [];
        this.bgNumberOfClouds = 0;
        this.bgTextures;
        this.bg1;
        this.bg2;
        this.bgFilter;
        this.bgCounter = 1600;
        this.bgSpeedFactor = 1;

        this.#createCharacterCanvas();
        this.#createBackgroundCanvas();
        this.resizeCanvas();
        this.#initSprites();
    }
    #setContainerSize() {
        this.container.style.width = this.container.clientHeight * 2 / 3 + "px";
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
    #initializeBulletTrailLayers() {
        this.bulletApp.stage = new PIXI.layers.Stage();
        for (let alpha in BULLET_TRAIL_ALPHAS) {
            //bullet trails: https://pixijs.io/examples/#/plugin-layers/trail.js
            const layer = new PIXI.layers.Layer();
            layer.useRenderTexture = true;
            layer.useDoubleBuffer = true;
            const trailSprite = new PIXI.Sprite(layer.getRenderTexture());
            trailSprite.alpha = BULLET_TRAIL_ALPHAS[alpha];
            layer.addChild(trailSprite);
            this.bulletApp.stage.addChild(layer);
            const showLayer = new PIXI.Sprite(layer.getRenderTexture());
            this.bulletApp.stage.addChild(showLayer);
            this.bulletTrailLayersMap.set(BULLET_TRAIL_ALPHAS[alpha], layer);
        }
    }
    #createBackgroundCanvas() {
        this.container.appendChild(this.backgroundApp.view);
        this.backgroundApp.view.classList.add("backgroundCanvas");

        PIXI.Assets.add('background', 'img/bg/bg.jpg');
        PIXI.Assets.add('cloud1', 'img/bg/cloud1.png');
        PIXI.Assets.add('cloud2', 'img/bg/cloud2.png');
        PIXI.Assets.add('cloud3', 'img/bg/cloud3.png');
        PIXI.Assets.add('cloud4', 'img/bg/cloud4.png');
        PIXI.Assets.add('cloud5', 'img/bg/cloud5.png');

        const texturesPromise = PIXI.Assets.load(['background', 'cloud1', 'cloud2', 'cloud3', 'cloud4', 'cloud5']);
        texturesPromise.then((textures) => {
            this.bgTextures = textures;
            this.bgNumberOfClouds = Object.keys(this.bgTextures).length - 1;

            this.bg1 = PIXI.Sprite.from(textures.background);
            this.bg2 = PIXI.Sprite.from(textures.background);
            let aspectRatio = this.bg1.width / this.bg1.height;

            this.bg1.height = this.backgroundApp.screen.height;
            this.bg1.width = this.backgroundApp.screen.height * aspectRatio;

            this.bg2.height = this.bg1.height;
            this.bg2.width = this.bg1.width;

            this.bg1.x = 0;
            this.bg1.y = 0;
            this.bg2.x = 0;
            this.bg2.y = this.bg1.y - this.bg1.height;

            this.backgroundApp.stage.addChild(this.bg1);
            this.backgroundApp.stage.addChild(this.bg2);

            this.bgFilter = new PIXI.Filter(null,
                "precision mediump float;" +

                "varying vec2 vTextureCoord;" +
                "varying vec4 vColor;" +

                "uniform sampler2D uSampler;" +
                "uniform float customUniformY;" +
                "uniform float customUniformX;" +

                "void main(void)" +
                "{" +
                "vec2 uvs = vTextureCoord.xy;" +
                "vec4 fg = texture2D(uSampler, vTextureCoord);" +
                "fg.r = -uvs.y + sin(customUniformY);" +
                "gl_FragColor = fg;" +
                "}", {
                customUniformY: 0.0,
                customUniformX: 0.0
            });

            this.backgroundApp.stage.filters = [this.bgFilter];
        });
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
        this.#drawBackground();
        this.#drawBoss();
        this.#drawChallenger();
        this.#drawBullets();
    }
    addBullet(bulletSprite, alphaLayer) {
        this.bulletTrailLayersMap.get(alphaLayer).addChild(bulletSprite);
    }
    removeBullet(bullet) {
        let layer = this.bulletTrailLayersMap.get(bullet.alphaLayer);
        layer.removeChild(bullet.sprite1);
        layer.removeChild(bullet.sprite2);
    }
    #initSprites() {
        this.characterApp.stage.addChild(this.challengerSprite);
        this.characterApp.stage.addChild(this.bossSprite);
        this.challengerSprite.y = 100000;
        this.bossSprite.y = -100000;
        for (const index in spriteLoader.loadedTexturesArray) {
            this.challengerSprite.texture = spriteLoader.loadedTexturesArray[index]
            this.characterApp.render();
        }
    }
    #drawBackground() {
        if (isGameStateEnraged) {
            this.bgSpeedFactor = 2.5;
        }
        if (this.bg1 == undefined && this.bg2 == undefined) {
            return false;
        }
        if (this.bg1.y < this.backgroundApp.screen.height) {
            this.bg1.y = this.bg1.y + 0.8 * this.bgSpeedFactor;
            this.bg2.y = this.bg1.y - this.bg1.height;
        } else {
            let temp = this.bg2;
            this.bg2 = this.bg1;
            this.bg1 = temp;
        }

        this.bgFilter.uniforms.customUniformY += Math.random() * 0.01 * this.bgSpeedFactor;
        this.bgFilter.uniforms.customUniformX += Math.random() * 0.01 * this.bgSpeedFactor;

        if (this.bgCounter >= Math.floor(Math.random() * 1400) + 1000) {
            this.bgCounter = 0;
            let randomCloudIndex = Math.floor(Math.random() * this.bgNumberOfClouds) + 1;
            let cloud = new PIXI.Sprite;
            cloud.texture = Object.values(this.bgTextures)[randomCloudIndex];
            let aspectRatioCloud = cloud.height / cloud.width;
            let width = Math.random() * this.backgroundApp.screen.width / 1.2 + this.backgroundApp.screen.width / 3;
            cloud.height = width * aspectRatioCloud;
            cloud.width = width;
            cloud.x = 0 - cloud.width / 2 + Math.random() * this.backgroundApp.screen.width;
            cloud.y = 0 - cloud.height;
            this.bgCloudsArray.push(cloud);
            this.backgroundApp.stage.addChild(cloud);
        }

        this.bgCloudsArray.forEach((c) => {
            c.y = c.y + Math.random() * 0.5 * this.bgSpeedFactor + 0.1 * this.bgSpeedFactor;
            if (c.y > this.backgroundApp.screen.height) {
                this.bgCloudsArray.splice(getIndexInArray(this.bgCloudsArray, c), 1);
            }
        });
        this.bgCounter++;
    }
    #drawChallenger() {
        this.challengerSprite.texture = challenger.spriteAnimator.getNextFrame(challenger.getCurrentSpriteState());

        let challengerAspectRatio = this.challengerSprite.texture.width / this.challengerSprite.texture.height;
        let challengerWidth = CANVAS_UNIT * challenger.spriteScaling * challengerAspectRatio;
        let challengerHeight = CANVAS_UNIT * challenger.spriteScaling;
        this.challengerSprite.anchor.set(0.5);
        this.challengerSprite.x = CANVAS_UNIT * challenger.x;
        this.challengerSprite.y = CANVAS_UNIT * challenger.y;
        this.challengerSprite.width = challengerWidth;
        this.challengerSprite.height = challengerHeight;
        if (challenger.hitboxTexture != undefined) {
            challenger.hitboxTexture[0].x = -100;
            challenger.hitboxTexture[0].y = -100;
            challenger.hitboxTexture[1].x = -100;
            challenger.hitboxTexture[1].y = -100;
            if (INPUTS_CHALLENGER.shift) {
                challenger.hitboxTexture[0].x = this.challengerSprite.x;
                challenger.hitboxTexture[0].y = this.challengerSprite.y;
                challenger.hitboxTexture[1].x = this.challengerSprite.x;
                challenger.hitboxTexture[1].y = this.challengerSprite.y;
                console.log(challenger.hitboxTexture[0].x, this.challengerSprite.x)
            }
        }

    }
    #drawBoss() {
        this.bossSprite.texture = boss.spriteAnimator.getNextFrame(boss.getCurrentSpriteState());

        let bossAspectRatio = this.bossSprite.texture.width / this.bossSprite.texture.height;
        let bossWidth = CANVAS_UNIT * boss.spriteScaling * bossAspectRatio;
        let bossHeight = CANVAS_UNIT * boss.spriteScaling;
        this.bossSprite.anchor.set(0.5);
        this.bossSprite.x = CANVAS_UNIT * boss.x;
        this.bossSprite.y = CANVAS_UNIT * boss.y;
        this.bossSprite.width = bossWidth;
        this.bossSprite.height = bossHeight;
    }
    #drawBullets() {
        allBullets.forEach(bullet => {
            bullet.sprite1.position.x = CANVAS_UNIT * (bullet.logicX - bullet.radius);
            bullet.sprite1.position.y = CANVAS_UNIT * (bullet.logicY - bullet.radius);
            bullet.sprite2.position.x = CANVAS_UNIT * (bullet.logicX - bullet.radius);
            bullet.sprite2.position.y = CANVAS_UNIT * (bullet.logicY - bullet.radius);
        });
        this.bulletApp.render();
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

function getBoundsID(obj) {
    return obj._boundsID;
}

function getIndexInArray(array, obj) {
    let r = false;
    array.forEach((c, i) => {
        if (getBoundsID(c) === getBoundsID(obj)) {
            r = i;
        }
    });
    return r;
}