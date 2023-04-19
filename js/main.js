import { CHARACTER_DATA } from "./data/characters.js";
import { GameCanvas } from "./view/canvas.js";
import { updateGameUI } from "./view/page/gamePage.js";
import { Boss } from "./gameElements/boss.js";
import { Challenger } from "./gameElements/challenger.js";
import { Match } from "./gameElements/match.js";
import { BULLET_SPAWN_PROTECTION_FRAMES, FPS, GRACE_RANGE_SQUARED } from "./settings/gameSettings.js";
import { currentGameState, GAMESTATE, goToState } from "./gameStateManager.js";
import { allBullets, BULLET_ORIGIN } from "./gameElements/bullet.js";
import { SpriteLoader } from "./view/spriteLoader.js";
import { allHitableCircles } from "./gameElements/hitableObjects.js";
import { sounds } from "./sound/sound.js";

export let challenger;
export let boss;
export let match;
export let isGameStateEnraged = false;
export let gamePaused = true;

export let player1Canvas;
export let player2Canvas;
export let spriteLoader;

export let currentFPS = 0;
export let canvasRenderTime = 0;
export let gameLogicTime = 0;
export let totalJSTime = 0;
export let nonJSTime = 0;

let loadOnFirstCall = true;

export function main_loadGame([character1, character2], onLoad) {
    main_clearAllBullets()
    isGameStateEnraged = false;
    gamePaused = true;

    if (loadOnFirstCall) {
        loadOnFirstCall = false;
        spriteLoader = new SpriteLoader(CHARACTER_DATA[character1], CHARACTER_DATA[character2]);
        match = new Match(CHARACTER_DATA[character1], CHARACTER_DATA[character2]);
        spriteLoader.preloadAllTextures(() => {
            challenger = new Challenger(match.player1Character.challenger);
            boss = new Boss(match.player2Character.boss);
            player1Canvas = new GameCanvas(document.querySelector(".player1Canvas"));
            player2Canvas = new GameCanvas(document.querySelector(".player2Canvas"));
            onLoad();
        });
    } else {
        match = new Match(CHARACTER_DATA[character1], CHARACTER_DATA[character2]);
        challenger = new Challenger(match.player1Character.challenger);
        boss = new Boss(match.player2Character.boss);
    }
}

export function main_swapSides() {
    match.swapSides();
    challenger = new Challenger(match.getChallenger());
    boss = new Boss(match.getBoss());
}

export function main_startGame() {
    challenger = new Challenger(match.getChallenger());
    boss = new Boss(match.getBoss());
    main_clearAllBullets()
    isGameStateEnraged = false;
    gamePaused = false;
    gameLoop();
    sounds["soundtrack"].play();
}

let previousFrameAt = 0;
let currentlyAt = 0;
let nextCalculationAt = 0;
let finishedAt = 0;
function gameLoop() {
    nonJSTime = Math.round(performance.now() - finishedAt);
    //Wait for next frame on high refreshrate monitor
    do {
        currentlyAt = performance.now();
    } while (currentlyAt < nextCalculationAt);
    let amountWaitedTooLong = currentlyAt - nextCalculationAt;
    if (amountWaitedTooLong > 1000 / FPS) {
        amountWaitedTooLong = 0
    }
    currentFPS = Math.round(1000 / (currentlyAt - previousFrameAt));
    previousFrameAt = currentlyAt;

    let t1 = performance.now()
    player1Canvas.updateCanvas();
    player2Canvas.updateCanvas();
    canvasRenderTime = Math.round(performance.now() - t1);

    t1 = performance.now();
    if (!gamePaused) {
        gameLogic();
    }
    gameLogicTime = Math.round(performance.now() - t1);
    totalJSTime = canvasRenderTime + gameLogicTime;

    nextCalculationAt = currentlyAt + 1000 / FPS - amountWaitedTooLong;
    finishedAt = performance.now();
    if (!gamePaused) {
        requestAnimationFrame(gameLoop);
    }
}

function gameLogic() {
    challenger.gameTick();
    boss.gameTick();
    allBullets.forEach(function (bullet, index) {
        bullet.nextPos();
        if (bullet.hasBulletFaded()) {
            player1Canvas.removeBullet(bullet);
            player2Canvas.removeBullet(bullet);
            allBullets.splice(index, 1);
        }
    });
    hitDetectionChallenger();
    hitDetectionBoss();
    hitDetectionObjectsRound();
    match.updateTime();
    updateGameUI();
}

export function main_pauseGameLogic() {
    gamePaused = true;
    sounds["soundtrack"].pause();
}

export function main_unpauseGameLogic() {
    gamePaused = false;
    requestAnimationFrame(gameLoop);
    sounds["soundtrack"].play();
}

export function main_clearAllBullets() {
    allBullets.forEach((bullet) => {
        player1Canvas.removeBullet(bullet);
        player2Canvas.removeBullet(bullet);
    });
    allBullets.length = 0;
}

export function main_setGameStateEnraged() {
    isGameStateEnraged = true;
}

export function main_challengerDeath() {
    main_pauseGameLogic();
    match.updateStats();
    goToState(GAMESTATE.CHALLENGER_DEATH);
}

export function main_handleGoBackButton() {
    if (currentGameState === GAMESTATE.SETTINGS) {
        if (document.querySelector("article.config .choosingKey").classList.contains("active")) {
            document.querySelector("article.config .choosingKey").classList.remove("active");
        }else{
            goToState(GAMESTATE.MAIN_MENU);
        }
    }

    if (currentGameState === GAMESTATE.CHARACTER_SELECTION) {
        goToState(GAMESTATE.MAIN_MENU);
    }

    if (currentGameState === GAMESTATE.GAMEPLAY_REGULAR) {
        goToState(GAMESTATE.PAUSE_SCREEN);
    } else if (currentGameState === GAMESTATE.PAUSE_SCREEN) {
        if (isGameStateEnraged) {
            goToState(GAMESTATE.GAMEPLAY_ENRAGED);
        } else {
            goToState(GAMESTATE.GAMEPLAY_REGULAR);
        }
    }
}

export function main_closeGameLoop() {
    challenger = null;
    boss = null;
    main_clearAllBullets();
    isGameStateEnraged = false;
    gamePaused = true;
    sounds["soundtrack"].stop();
}

// ===================================
// Cheaty section
export function cheats() {
    if (currentGameState === GAMESTATE.GAMEPLAY_REGULAR || currentGameState === GAMESTATE.GAMEPLAY_ENRAGED) {
        challenger.currentHealth = -1;
        challenger.bulletDamage = 0;
        console.log("Challenger Health set to " + challenger.currentHealth + " and bulletDamage set to " + challenger.bulletDamage);
    }
}

export function lowerChallengerHealth() {
    if (currentGameState === GAMESTATE.GAMEPLAY_REGULAR || currentGameState === GAMESTATE.GAMEPLAY_ENRAGED) {
        challenger.currentHealth = 1;
        console.log("Challenger Health set to " + challenger.currentHealth)
    }
}

export function lowerBossHealth() {
    if (currentGameState === GAMESTATE.GAMEPLAY_REGULAR || currentGameState === GAMESTATE.GAMEPLAY_ENRAGED) {
        boss.currentHealth = 30;
        console.log("Boss Health set to " + boss.currentHealth)
    }
}

export function setTime() {
    if (currentGameState === GAMESTATE.GAMEPLAY_REGULAR || currentGameState === GAMESTATE.GAMEPLAY_ENRAGED) {
        match.elapsedTimeInFrames = 120 * FPS;
        console.log("Timer set to " + match.elapsedTimeInFrames / FPS + " Seconds");
    }
}
// ===================================

function hitDetectionChallenger() {
    let challengerDied = false;
    for (let i = allBullets.length - 1; i >= 0; i--) {
        if (!challengerDied && allBullets[i].framesAlive > BULLET_SPAWN_PROTECTION_FRAMES && allBullets[i].origin === BULLET_ORIGIN.BOSS) {
            let xDiffSquared = Math.pow((allBullets[i].logicX - challenger.x), 2)
            let yDiffSquared = Math.pow((allBullets[i].logicY - challenger.y), 2)
            let hitRange = Math.pow((challenger.radius + allBullets[i].radius), 2);
            if (xDiffSquared + yDiffSquared < hitRange) {
                player1Canvas.removeBullet(allBullets[i]);
                player2Canvas.removeBullet(allBullets[i]);
                allBullets.splice(i, 1);
                challengerDied = challenger.takeDamageAndCheckDead();
                if (challengerDied) {
                    main_challengerDeath();
                }
            }
            if (xDiffSquared + yDiffSquared < GRACE_RANGE_SQUARED + hitRange) {
                challenger.gainGraceCharge();
            }
        }
    }
}

function hitDetectionBoss() {
    let bossDied = false;
    for (let i = allBullets.length - 1; i >= 0; i--) {
        if (!bossDied && allBullets[i].origin === BULLET_ORIGIN.CHALLENGER) {
            let xDiffSquared = Math.pow((allBullets[i].logicX - boss.x), 2)
            let yDiffSquared = Math.pow((allBullets[i].logicY - boss.y), 2)
            let hitRange = Math.pow((boss.radius + allBullets[i].radius), 2);
            if (xDiffSquared + yDiffSquared < hitRange) {
                player1Canvas.removeBullet(allBullets[i]);
                player2Canvas.removeBullet(allBullets[i]);
                allBullets.splice(i, 1);
                bossDied = boss.takeDamageAndCheckDead(challenger.bulletDamage);
                if (bossDied) {
                    goToState(GAMESTATE.BOSS_DEATH_CUTSCENE);
                }
            }
        }
    }
}

function hitDetectionObjectsRound() {
    allHitableCircles.forEach(function (hitable) {
        hitable.tick();
        const hitableX = hitable.x;
        const hitableX2 = hitable.x * hitable.x;
        const hitableY = hitable.y;
        const hitableY2 = hitable.y * hitable.y;
        let hitableDestroyed = false;
        for (let i = allBullets.length - 1; i >= 0; i--) {
            let canBeHitByTag = hitable.hitableByTags.includes(allBullets[i].tag);
            let canBeHitByOrigin = hitable.hitableByOrigin.includes(allBullets[i].origin);
            if (!hitableDestroyed && canBeHitByTag && canBeHitByOrigin) {
                let xDiffSquared = allBullets[i].logicX * allBullets[i].logicX - (2 * allBullets[i].logicX * hitableX) + hitableX2;
                let yDiffSquared = allBullets[i].logicY * allBullets[i].logicY - (2 * allBullets[i].logicY * hitableY) + hitableY2;
                let hitRange = (hitable.radius + allBullets[i].radius) * (hitable.radius + allBullets[i].radius);
                if (xDiffSquared + yDiffSquared < hitRange) {
                    player1Canvas.removeBullet(allBullets[i]);
                    player2Canvas.removeBullet(allBullets[i]);
                    allBullets.splice(i, 1);
                    if (!hitableDestroyed) {
                        hitableDestroyed = hitable.takeDamageAndCheckDestroyed();
                    }
                }
            }
        };
    });
}