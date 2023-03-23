import { CHARACTER_DATA } from "./data/characters.js";
import { GameCanvas } from "./view/canvas.js";
import { updateGameUI } from "./view/frontend.js";
import { Boss } from "./gameElements/boss.js";
import { Challenger } from "./gameElements/challenger.js";
import { Match } from "./data/match.js";
import { FPS, GRACE_RANGE } from "./settings/gameSettings.js";
import { currentGameState, GAMESTATE, goToState } from "./gameStateManager.js";

export let challenger;
export let challengerBullets;
export let boss;
export let bossBullets;
export let match;
export let isGameStateEnraged = false;
let gamePaused = true;

export let player1Canvas;
export let player2Canvas;

export let currentFPS = 0;
export let canvasRenderTime = 0;
export let gameLogicTime = 0;
export let totalFrameCalculationTime = 0;

let loadOnFirstCall = true;
export function main_loadGame([character1, character2]) {
    match = new Match(CHARACTER_DATA[character1], CHARACTER_DATA[character2]);

    challenger = new Challenger(match.player1Character.challenger);
    challengerBullets = [];

    boss = new Boss(match.player2Character.boss);
    bossBullets = [];


    isGameStateEnraged = false;
    gamePaused = true;

    
    if (loadOnFirstCall) {
        loadOnFirstCall = false;
        player1Canvas = new GameCanvas(document.querySelector(".player1Canvas"));
        player2Canvas = new GameCanvas(document.querySelector(".player2Canvas"));
    }
}

let previousFrameAt = 0;
let currentlyAt = 0;
let nextCalculationAt = 0;
function gameLoop() {
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
    gameLogic();
    gameLogicTime = Math.round(performance.now() - t1);
    totalFrameCalculationTime = canvasRenderTime + gameLogicTime;

    nextCalculationAt = currentlyAt + 1000 / FPS - amountWaitedTooLong;
    if (!gamePaused) {
        requestAnimationFrame(gameLoop);
    }
}

function gameLogic() {
    match.updateTime();
    challenger.gameTick();
    boss.gameTick();
    bossBullets.forEach(function (bullet, index) {
        bullet.nextPos();
        if (bullet.hasBulletFaded()) {
            bossBullets.splice(index, 1);
        }
    });
    challengerBullets.forEach(function (bullet, index) {
        bullet.nextPos();
        if (bullet.hasBulletFaded()) {
            challengerBullets.splice(index, 1);
        }
    });
    hitDetectionChallenger();
    hitDetectionBoss();
    updateGameUI();
}

export function main_pauseGameLogic() {
    gamePaused = true;
}

export function main_resumeGameLogic() {
    gamePaused = false;
    requestAnimationFrame(gameLoop);
}

export function main_setGameStateRegular() {
    isGameStateEnraged = false;
}

export function main_setGameStateEnraged() {
    isGameStateEnraged = true;
}

export function main_challengerDeath(){
    match.updateStats();
    goToState(GAMESTATE.CHALLENGER_DEATH);
}

export function main_switchSides() {
    match.swapSides();
    challenger = new Challenger(match.getChallenger());
    boss = new Boss(match.getBoss());
    challengerBullets = [];
    bossBullets = [];
    isGameStateEnraged = false;
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
    challengerBullets = null;
    boss = null;
    bossBullets = null;
    isGameStateEnraged = false;
    gamePaused = true;
}

export function handleGoBackButton() {
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

export function cheats() {
    if (currentGameState === GAMESTATE.GAMEPLAY_REGULAR || currentGameState === GAMESTATE.GAMEPLAY_ENRAGED) {
        challenger.currentHealth = -1;
        challenger.bulletDamage = 0;
        console.log("You dirty Cheater");
    }
}





//TODO Move to BulletCollection
function hitDetectionChallenger() {
    // TODO:
    // freshly spawned bullet shouldnt hurt

    const challengerX = challenger.x;
    const challengerX2 = challenger.x * challenger.x;
    const challengerY = challenger.y;
    const challengerY2 = challenger.y * challenger.y;

    bossBullets.forEach(function (bullet, index) {
        let xDiffSquared = bullet.x * bullet.x - (2 * bullet.x * challengerX) + challengerX2;
        let yDiffSquared = bullet.y * bullet.y - (2 * bullet.y * challengerY) + challengerY2;
        let hitRange = (challenger.radius + bullet.radius) * (challenger.radius + bullet.radius);
        if (xDiffSquared + yDiffSquared < hitRange) {
            bossBullets.splice(index, 1);
            let challengerDied = challenger.takeDamageAndCheckDead();
            if (challengerDied) {
                main_challengerDeath();
            }
        }
        if (xDiffSquared + yDiffSquared < GRACE_RANGE + hitRange) {
            challenger.gainGraceCharge();
        }
    });
}

function hitDetectionBoss() {
    const bossX = boss.x;
    const bossX2 = boss.x * boss.x;
    const bossY = boss.y;
    const bossY2 = boss.y * boss.y;

    challengerBullets.forEach(function (bullet, index) {
        let xDiffSquared = bullet.x * bullet.x - (2 * bullet.x * bossX) + bossX2;
        let yDiffSquared = bullet.y * bullet.y - (2 * bullet.y * bossY) + bossY2;
        let hitRange = (boss.radius + bullet.radius) * (boss.radius + bullet.radius);
        if (xDiffSquared + yDiffSquared < hitRange) {
            challengerBullets.splice(index, 1);
            let activateEnrage = boss.takeDamageAndCheckDead(challenger.bulletDamage);
            if (activateEnrage) {
                goToState(GAMESTATE.GAMEPLAY_ENRAGED);
            }
        }
    });
}
