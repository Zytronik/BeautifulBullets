import { GameCanvas } from "./canvas.js";

window.onload = function () {
    var challengerCanvas = new GameCanvas(document.querySelector(".challengerCanvas"));
    var bossCanvas = new GameCanvas(document.querySelector(".bossCanvas"));
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

let playerSpeed = 5;
let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;

//challenger
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        moveLeft = true;
    } else if (event.code === "ArrowUp") {
        moveUp = true;
    } else if (event.code === "ArrowRight") {
        moveRight = true;
    } else if (event.code === "ArrowDown") {
        moveDown = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
        moveLeft = false;
    } else if (event.code === "ArrowUp") {
        moveUp = false;
    } else if (event.code === "ArrowRight") {
        moveRight = false;
    } else if (event.code === "ArrowDown") {
        moveDown = false;
    }
});

// Update player position based on movement variables
function updateKeyInputs() {
    if (moveLeft) {
        playerX -= playerSpeed;
    }
    if (moveUp) {
        playerY -= playerSpeed;
    }
    if (moveRight) {
        playerX += playerSpeed;
    }
    if (moveDown) {
        playerY += playerSpeed;
    }

    // Update player position on screen
    /* document.getElementById("player").style.left = playerX + "px";
    document.getElementById("player").style.top = playerY + "px"; */
}