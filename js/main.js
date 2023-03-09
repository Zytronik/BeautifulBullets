import { GameCanvas } from "./canvas.js";
import { Challenger } from "./challenger.js";
import { Boss } from "./boss.js";
import { FPS } from "./gameSettings.js";
import { Bullet } from "./bullet.js";
import { BULLET_SPRITE1 } from "./spriteSettings.js";
import { BulletFunctions } from "./bulletFunctions.js";

export let challenger;
export let boss;
export let bullets;
let challengerCanvas;
let bossCanvas;
window.onload = function () {
    challenger = new Challenger(100, 300);
    boss = new Boss(100, 100);
    bullets = [];

    // bullets.push(new Bullet(300, 500, BULLET_SPRITE1, bro, 50));
    let bf = new BulletFunctions();
    // bf.pattern1(50);
    setInterval(function () {
        bf.pattern1(50)
    }, 2000);

    setInterval(function () {
        console.log(bullets);
    }, 1000);

    challengerCanvas = new GameCanvas(document.querySelector(".challengerCanvas"), challenger, boss);
    bossCanvas = new GameCanvas(document.querySelector(".bossCanvas"), challenger, boss);  
    
    //TODO: make more pretty
    //https://stackoverflow.com/questions/37854355/wait-for-image-loading-to-complete-in-javascript
    challenger.sprite.onload = function(){
        challengerCanvas.updateCanvas();
        bossCanvas.updateCanvas();
    }
    
    boss.sprite.onload = function(){
        challengerCanvas.updateCanvas();
        bossCanvas.updateCanvas();
    }
    requestAnimationFrame(gameLoop);
};

let lastRenderTime = 0;
let deltaTime = 0;
function gameLoop(currentTime) {
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender >= 1000/FPS) {
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
    3. collision detection
        (is the character in i-frames?)
        just got hit for example

        reversed, bullet just spawned
        no active hitbox yet

        performance? check all bullets? only nearest bullets, parallelization
        x-difference^2 + y-difference^2 < (bulletsize + playersize)^2

        health
    
    
    */
    challenger.move()
    boss.move()
    // console.log(bullets)
    bullets.forEach(function(bullet, index) {
        bullet.nextPos();
        if (bullet.hasBulletFaded()) {
            bullets.splice(index, 1);
        }
    });
}

function bro(framesAlive){
    console.log("ligmaballs xd", framesAlive);
    return [0.005*framesAlive**2, 3]
}