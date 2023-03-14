export const INPUTS_CHALLENGER = {
    left: false,
    right: false,
    down: false,
    up: false,
    shift: false,
    special: false,
}
export const INPUTS_BOSS = {
    left: false,
    right: false,
    down: false,
    up: false,
}

export let INPUTS_PLAYER1 = {
    left: "ArrowLeft",
    right: "ArrowRight",
    down: "ArrowDown",
    up: "ArrowUp",
    shift: "ShiftLeft",
}

export let INPUTS_PLAYER2 = {
    left: "KeyA",
    right: "KeyD",
    down: "KeyS",
    up: "KeyW",
    shift: "ShiftRight",
}

document.addEventListener("keydown", (event) => {
    //Challenger
    if (event.code === INPUTS_PLAYER1.left) {
        INPUTS_CHALLENGER.left = true;
    } else if (event.code === INPUTS_PLAYER1.up) {
        INPUTS_CHALLENGER.up = true;
    } else if (event.code === INPUTS_PLAYER1.right) {
        INPUTS_CHALLENGER.right = true;
    } else if (event.code === INPUTS_PLAYER1.down) {
        INPUTS_CHALLENGER.down = true;
    } else if (event.code === INPUTS_PLAYER1.shift) {
        INPUTS_CHALLENGER.shift = true;
    }

    //Boss
    else if (event.code === INPUTS_PLAYER2.left) {
        INPUTS_BOSS.left = true;
    } else if (event.code === INPUTS_PLAYER2.up) {
        INPUTS_BOSS.up = true;
    } else if (event.code === INPUTS_PLAYER2.right) {
        INPUTS_BOSS.right = true;
    } else if (event.code === INPUTS_PLAYER2.down) {
        INPUTS_BOSS.down = true;
    }
});

document.addEventListener("keyup", (event) => {
    //Challenger
    if (event.code === INPUTS_PLAYER1.left) {
        INPUTS_CHALLENGER.left = false;
    } else if (event.code === INPUTS_PLAYER1.up) {
        INPUTS_CHALLENGER.up = false;
    } else if (event.code === INPUTS_PLAYER1.right) {
        INPUTS_CHALLENGER.right = false;
    } else if (event.code === INPUTS_PLAYER1.down) {
        INPUTS_CHALLENGER.down = false;
    } else if (event.code === INPUTS_PLAYER1.shift) {
        INPUTS_CHALLENGER.shift = false;
    }

    //Boss
    else if (event.code === INPUTS_PLAYER2.left) {
        INPUTS_BOSS.left = false;
    } else if (event.code === INPUTS_PLAYER2.up) {
        INPUTS_BOSS.up = false;
    } else if (event.code === INPUTS_PLAYER2.right) {
        INPUTS_BOSS.right = false;
    } else if (event.code === INPUTS_PLAYER2.down) {
        INPUTS_BOSS.down = false;
    }
});

