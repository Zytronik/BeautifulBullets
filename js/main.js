import { CHARACTER_DATA } from "./data/characters.js";
import { GameCanvas } from "./view/canvas.js";
import { updateGameUI } from "./view/gamePage.js";
import { Boss } from "./gameElements/boss.js";
import { Challenger } from "./gameElements/challenger.js";
import { Match } from "./data/match.js";
import { SpriteLoader } from "./view/spriteLoader.js";
import { BULLET_SPAWN_PROTECTION_FRAMES, FPS, GRACE_RANGE_SQUARED } from "./settings/gameSettings.js";
import { currentGameState, GAMESTATE, goToState } from "./gameStateManager.js";
import { allBullets, BULLET_ORIGIN, getBulletsByOrigin } from "./gameElements/bullet.js";

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
        challenger = new Challenger(match.player1Character.challenger);
        boss = new Boss(match.player2Character.boss);
        spriteLoader.preloadAllSprites(()=>{
            challenger.sprites = spriteLoader.getChallengerSprites();
            boss.sprites = spriteLoader.getBossSprites();
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
}

let previousFrameAt = 0;
let currentlyAt = 0;
let nextCalculationAt = 0;
let finishedAt = 0;
function gameLoop() {
    nonJSTime = Math.round(performance.now() - finishedAt);
    //Wait for next frame on high refreshrates
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
            allBullets.splice(index, 1);
        }
    });
    hitDetectionChallenger();
    hitDetectionBoss();
    match.updateTime();
    updateGameUI();
}

export function main_pauseGameLogic() {
    gamePaused = true;
}

export function main_unpauseGameLogic() {
    gamePaused = false;
    requestAnimationFrame(gameLoop);
}

export function main_clearAllBullets() {
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
        goToState(GAMESTATE.MAIN_MENU);
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
    allBullets.length = 0;
    isGameStateEnraged = false;
    gamePaused = true;
}

export function handleGoBackButton() {
    if (currentGameState === GAMESTATE.SETTINGS || currentGameState === GAMESTATE.CHARACTER_SELECTION) {
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
        match.elapsedTimeInFrames = 115 * FPS;
        console.log("Timer set to "+match.elapsedTimeInFrames / FPS+" Seconds");
    }
}

//TODO Move to BulletCollection
function hitDetectionChallenger() {
    // TODO:
    // freshly spawned bullet shouldnt hurt
    const bossBullets = getBulletsByOrigin(BULLET_ORIGIN.BOSS);
    const challengerX = challenger.x;
    const challengerX2 = challenger.x * challenger.x;
    const challengerY = challenger.y;
    const challengerY2 = challenger.y * challenger.y;

    let challengerDied = false;
    allBullets.forEach(function (bullet, index) {
        if (!challengerDied && bullet.framesAlive > BULLET_SPAWN_PROTECTION_FRAMES&& bullet.origin === BULLET_ORIGIN.BOSS) {
            let xDiffSquared = bullet.x * bullet.x - (2 * bullet.x * challengerX) + challengerX2;
            let yDiffSquared = bullet.y * bullet.y - (2 * bullet.y * challengerY) + challengerY2;
            let hitRange = Math.pow((challenger.radius + bullet.visuals.radius), 2);
            if (xDiffSquared + yDiffSquared < hitRange) {
                allBullets.splice(index, 1);
                challengerDied = challenger.takeDamageAndCheckDead();
                if (challengerDied) {
                    main_challengerDeath();
                }
            }
            if (xDiffSquared + yDiffSquared < GRACE_RANGE_SQUARED + hitRange) {
                challenger.gainGraceCharge();
            }
        }
    });
}

function hitDetectionBoss() {
    const bossX = boss.x;
    const bossX2 = boss.x * boss.x;
    const bossY = boss.y;
    const bossY2 = boss.y * boss.y;
    let bossDied = false;
    allBullets.forEach(function (bullet, index) {
        if (!bossDied && bullet.origin === BULLET_ORIGIN.CHALLENGER) {
            let xDiffSquared = bullet.x * bullet.x - (2 * bullet.x * bossX) + bossX2;
            let yDiffSquared = bullet.y * bullet.y - (2 * bullet.y * bossY) + bossY2;
            let hitRange = (boss.radius + bullet.visuals.radius) * (boss.radius + bullet.visuals.radius);
            if (xDiffSquared + yDiffSquared < hitRange) {
                allBullets.splice(index, 1);
                bossDied = boss.takeDamageAndCheckDead(challenger.bulletDamage);
                if (bossDied) {
                    goToState(GAMESTATE.BOSS_DEATH_CUTSCENE);
                }
            }
        }
    });
}