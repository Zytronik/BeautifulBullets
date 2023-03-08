export const INPUTS_CHALLENGER = {
    left: false,
    right: false,
    down: false,
    up: false,
    shift: false,
}
export const INPUTS_BOSS = {
    left: false,
    right: false,
    down: false,
    up: false,
}

document.addEventListener("keydown", (event) => {
    //Challenger
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        INPUTS_CHALLENGER.left = true;
    } else if (event.code === "ArrowUp" || event.code === "KeyW") {
        INPUTS_CHALLENGER.up = true;
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        INPUTS_CHALLENGER.right = true;
    } else if (event.code === "ArrowDown" || event.code === "KeyS") {
        INPUTS_CHALLENGER.down = true;
    } else if (event.code === "ShiftLeft") {
        INPUTS_CHALLENGER.shift = true;
    }

    //Boss
    else if (event.code === "KeyJ") {
        INPUTS_BOSS.left = true;
    } else if (event.code === "KeyI") {
        INPUTS_BOSS.up = true;
    } else if (event.code === "KeyL") {
        INPUTS_BOSS.right = true;
    } else if (event.code === "KeyK") {
        INPUTS_BOSS.down = true;
    }
});

document.addEventListener("keyup", (event) => {
    //Challenger
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        INPUTS_CHALLENGER.left = false;
    } else if (event.code === "ArrowUp" || event.code === "KeyW") {
        INPUTS_CHALLENGER.up = false;
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        INPUTS_CHALLENGER.right = false;
    } else if (event.code === "ArrowDown" || event.code === "KeyS") {
        INPUTS_CHALLENGER.down = false;
    } else if (event.code === "ShiftLeft") {
        INPUTS_CHALLENGER.shift = false;
    }

    //Boss
    else if (event.code === "KeyJ") {
        INPUTS_BOSS.left = false;
    } else if (event.code === "KeyI") {
        INPUTS_BOSS.up = false;
    } else if (event.code === "KeyL") {
        INPUTS_BOSS.right = false;
    } else if (event.code === "KeyK") {
        INPUTS_BOSS.down = false;
    }
});

