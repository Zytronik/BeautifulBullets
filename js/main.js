import { GameCanvas } from "./canvas.js";
import { Challenger } from "./challenger.js";
import { Boss } from "./boss.js";
import { FPS } from "./gameSettings.js";
import { BulletSpawner } from "./bulletSpawner.js";
import { CHARACTER_DATA } from "./characters.js";

export let challenger;
export let boss;
export let bossBullets = [];
export let challengerBullets = [];
let challengerCanvas;
let bossCanvas;

export function loadGame(player1, player2) {
    challenger = new Challenger(CHARACTER_DATA[player1].challenger);
    boss = new Boss(CHARACTER_DATA[player2].boss);

    challengerCanvas = new GameCanvas(document.querySelector(".challengerCanvas"));
    bossCanvas = new GameCanvas(document.querySelector(".bossCanvas"));

    let bf = new BulletSpawner();
    // bf.pattern1(50);
    setInterval(function () {
        bf.pattern1(50)
    }, 2000);

    requestAnimationFrame(gameLoop);
}

window.onresize = function () {
    challengerCanvas.resizeCanvas();
    bossCanvas.resizeCanvas();
}

let lastRenderTime = 0;
let deltaTime = 0;
function gameLoop(currentTime) {
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender >= 1000 / FPS) {
        deltaTime = timeSinceLastRender;
        lastRenderTime = currentTime;

        challengerCanvas.updateCanvas();
        bossCanvas.updateCanvas();
        gameLogic();
    }

    requestAnimationFrame(gameLoop);
}

function gameLogic() {
    /*
    1. move everything
    2. spawn bullets
    */
    challenger.move()
    boss.move()
    bossBullets.forEach(function (bullet, index) {
        bullet.nextPos();
        if (bullet.hasBulletFaded() || bullet.isBulletOutOfFrame()) {
        }
    });
    hitDetection2ab();
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
            console.log("CHALLENGER GOT HIT!!!");
            bossBullets.splice(index, 1);
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
            console.log("BOSS GOT HIT!!!");
            challengerBullets.splice(index, 1);
        }
    });
}
