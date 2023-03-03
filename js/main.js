import { GameCanvas } from "./canvas.js";
import { Challenger } from "./challenger.js";

window.onload = function () {
    var challenger = new Challenger(10, 10);
    var challengerCanvas = new GameCanvas(document.querySelector(".challengerCanvas"), challenger);
    var bossCanvas = new GameCanvas(document.querySelector(".bossCanvas"), challenger);  
    
    challenger.sprite.onload = function(){
        challengerCanvas.updateCanvas();
        bossCanvas.updateCanvas();
    }
};

let lastRenderTime = 0;

function gameLoop(currentTime) {
    // Calculate the time since the last frame
    const timeSinceLastRender = currentTime - lastRenderTime;

    // Only draw the frame if the time since the last frame is greater than or equal to 16.6ms (60fps)
    if (timeSinceLastRender >= 16.6) {
        // Update lastRenderTime to the current time
        lastRenderTime = currentTime;

        // Call your draw function here
        //todoDraw();
        updateKeyInputs();

    }

    // Call requestAnimationFrame() again to schedule the next frame
    requestAnimationFrame(gameLoop);
}

// Call requestAnimationFrame() for the first time to start the loop
requestAnimationFrame(gameLoop);