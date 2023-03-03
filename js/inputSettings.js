export const inputs = {
    left: false,
    right: false,
    down: false,
    up: false,
    shift: false,
}

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        inputs.left = true;
    } else if (event.code === "ArrowUp") {
        inputs.up = true;
    } else if (event.code === "ArrowRight") {
        inputs.right = true;
    } else if (event.code === "ArrowDown") {
        inputs.down = true;
    } else if (event.code === "LeftShift") {
        inputs.shift = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
        inputs.left = false;
    } else if (event.code === "ArrowUp") {
        inputs.up = false;
    } else if (event.code === "ArrowRight") {
        inputs.right = false;
    } else if (event.code === "ArrowDown") {
        inputs.down = false;
    } else if (event.code === "LeftShift") {
        inputs.shift = false;
    }
});