import { GameCanvas } from "./canvas.js";
import { Challenger } from "./challenger.js";
import { Boss } from "./boss.js";
import { FPS, GRACE_RANGE } from "./gameSettings.js";
import { CHARACTER_DATA } from "./characters.js";
import { updateGameUI, gamePaused,showRoundEndScreen } from "./frontend.js";

export let challenger;
export let boss;
export let bossBullets = [];
export let challengerBullets = [];
let challengerCanvas;
let bossCanvas;

export function loadGame(player1, player2) {
    challenger = new Challenger(CHARACTER_DATA[player1].challenger);
    boss = new Boss(CHARACTER_DATA[player2].boss);

    challengerCanvas = new GameCanvas(document.querySelector(".player1Canvas"));
    bossCanvas = new GameCanvas(document.querySelector(".player2Canvas"));

    requestAnimationFrame(gameLoop);
}

window.onresize = function () {
    setTimeout(()=>{
        if(challengerCanvas !== undefined && bossCanvas !== undefined){
            challengerCanvas.resizeCanvas();
            bossCanvas.resizeCanvas();
        }
    }, 800);
}

let previousFrameAt = 0;
let currentlyAt = 0;
let nextCalculationAt = 0;
export let currentFPS = 0;
export let canvasRenderTime = 0;
export let gameLogicTime = 0;
export let totalFrameCalculationTime = 0;
function gameLoop() {
    //Wait for next frame on high refreshrates
    do {
        currentlyAt = performance.now();
    } while (currentlyAt < nextCalculationAt);
    let amountWaitedTooLong = currentlyAt - nextCalculationAt;
    if (amountWaitedTooLong > 1000/FPS) {
        amountWaitedTooLong = 0
    }
    currentFPS = Math.round(1000 / (currentlyAt - previousFrameAt));
    previousFrameAt = currentlyAt;

    let t1 = performance.now()
    challengerCanvas.updateCanvas();
    bossCanvas.updateCanvas();
    canvasRenderTime = Math.round(performance.now() - t1);

    t1 = performance.now();
    if(!gamePaused){
        gameLogic();
    }
    gameLogicTime = Math.round(performance.now() - t1);
    totalFrameCalculationTime = canvasRenderTime + gameLogicTime;

    nextCalculationAt = currentlyAt + 1000 / FPS - amountWaitedTooLong;
    requestAnimationFrame(gameLoop);
}

function gameLogic() {
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
    hitDetection2ab();
    updateGameUI();
}

function gameOver() {
    showRoundEndScreen();
    console.log("G A M E   O V E R");
}

//(a-b)^2 = a^2 - 2ab + b^2
function hitDetection2ab() {
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
            let isGameOver = challenger.takeDamageAndCheckDead();
            if (isGameOver) {
                gameOver();
            }
        }
        if (xDiffSquared + yDiffSquared < GRACE_RANGE + hitRange) {
            challenger.gainGraceCharge();
        }
    });

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
            let isGameOver = boss.takeDamageAndCheckDead(challenger.bulletDamage);
            if (isGameOver) {
                gameOver();
            }
        }
    });
}
