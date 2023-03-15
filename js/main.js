import { GameCanvas } from "./canvas.js";
import { Challenger } from "./challenger.js";
import { Boss } from "./boss.js";
import { FPS, GRACE_RANGE } from "./gameSettings.js";
import { CHARACTER_DATA } from "./characters.js";
import { updateGameUI } from "./frontend.js";

export let challenger;
export let boss;
export let bossBullets = [];
export let challengerBullets = [];
let challengerCanvas;
let bossCanvas;

export function loadGame(player1, player2) {
    challenger = new Challenger(CHARACTER_DATA[player1].challenger);
    boss = new Boss(CHARACTER_DATA[player2].boss);
    //console.log(boss.currentHealth)

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
    }, 500);
}

let lastRenderTime = 0;
let deltaTime = 0;
export let currentFPS = 0;
function gameLoop(currentTime) {
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender >= 1000 / FPS) {
        deltaTime = timeSinceLastRender;
        currentFPS = Math.round(1000 / timeSinceLastRender);
        lastRenderTime = currentTime;

        challengerCanvas.updateCanvas();
        bossCanvas.updateCanvas();
        gameLogic();
    }

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

function gameOver(){
    console.log("G A M E   O V E R");
}

//(a-b)^2 = a^2 - 2ab + b^2
function hitDetection2ab() {
    // TODO:
    // (is the character in i-frames?)
    // just got hit for example

    // reversed, bullet just spawned
    // no active hitbox yet

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
            //console.log(boss.currentHealth)
            challengerBullets.splice(index, 1);
            let isGameOver = boss.takeDamageAndCheckDead(challenger.bulletDamage);
            if (isGameOver) {
                gameOver();
            }
        }
    });
}
