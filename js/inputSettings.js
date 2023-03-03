export const INPUTS = {
    left: false,
    right: false,
    down: false,
    up: false,
    shift: false,
}

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        INPUTS.left = true;
    } else if (event.code === "ArrowUp") {
        INPUTS.up = true;
    } else if (event.code === "ArrowRight") {
        INPUTS.right = true;
    } else if (event.code === "ArrowDown") {
        INPUTS.down = true;
    } else if (event.code === "LeftShift") {
        INPUTS.shift = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
        INPUTS.left = false;
    } else if (event.code === "ArrowUp") {
        INPUTS.up = false;
    } else if (event.code === "ArrowRight") {
        INPUTS.right = false;
    } else if (event.code === "ArrowDown") {
        INPUTS.down = false;
    } else if (event.code === "LeftShift") {
        INPUTS.shift = false;
    }
});