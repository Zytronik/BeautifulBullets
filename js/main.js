import { GameCanvas } from "./canvas.js";
import { Challenger } from "./challenger.js";
import { Boss } from "./boss.js";
import { FPS } from "./gameSettings.js";
import { setupBulletFunction } from "./bulletFunctions.js";

let challenger;
export let boss;
export let challengerCanvas;
let bossCanvas;
window.onload = function () {
    challenger = new Challenger(100, 300);
    boss = new Boss(100, 100);
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
        setupBulletFunction();
        gameLogic();

    }

    requestAnimationFrame(gameLoop);
}


function gameLogic() {
    challenger.move()
}