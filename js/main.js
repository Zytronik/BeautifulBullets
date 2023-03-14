import { GameCanvas } from "./canvas.js";
import { Challenger } from "./challenger.js";
import { Boss } from "./boss.js";
import { FPS } from "./gameSettings.js";
import { BulletSpawner } from "./bulletSpawner.js";
import { CHARACTER_DATA } from "./characters.js";

export let challenger;
export let boss;
export let bullets = [];
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
    bullets.forEach(function (bullet, index) {
        bullet.nextPos();
        if (bullet.hasBulletFaded() || bullet.isBulletOutOfFrame()) {
            bullets.splice(index, 1);
        }
    });
    hitDetection2ab();
}

//(a-b)^2 = a^2 - 2ab + b^2
function hitDetection2ab() {
    // (is the character in i-frames?)
    // just got hit for example

    // reversed, bullet just spawned
    // no active hitbox yet

    // performance: check all bullets? only nearest bullets? parallelization?
    // x-difference^2 + y-difference^2 < (bulletsize + playersize)^2

    let hasBeenHit = false;
    const challengerX = challenger.x;
    const challengerX2 = challenger.x * challenger.x;
    const challengerY = challenger.y;
    const challengerY2 = challenger.y * challenger.y;
    bullets.forEach(bullet => {
        if (!hasBeenHit) {
            let xDiffSquared =  bullet.x * bullet.x - (2 * bullet.x * challengerX) + challengerX2;
            let yDiffSquared =  bullet.y * bullet.y - (2 * bullet.y * challengerY) + challengerY2;
            let hitRange = (challenger.radius + bullet.radius) * (challenger.radius + bullet.radius);
            if (xDiffSquared + yDiffSquared < hitRange) {
                console.log("GOT HIT!!!");
                hasBeenHit = true;
            }
        }
    });
}
