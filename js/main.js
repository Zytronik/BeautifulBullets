import { GameCanvas } from "./canvas.js";
import { Challenger } from "./challenger.js";
import { Boss } from "./boss.js";
import { FPS } from "./gameSettings.js";

let challenger;
let boss;
let challengerCanvas;
let bossCanvas;
window.onload = function () {
    challenger = new Challenger(10, 10);
    boss = new Boss(10, 10);
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
function gameLoop(currentTime) {
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender >= 1000/FPS) {
        lastRenderTime = currentTime;

        challengerCanvas.updateCanvas();
        bossCanvas.updateCanvas();

        gameLogic();

    }

    requestAnimationFrame(gameLoop);
}


function gameLogic() {
    challenger.move()
}