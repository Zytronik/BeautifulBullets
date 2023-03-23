import { main_handleGoBackButton } from "../main.js";

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
    ability1: false,
    ability2: false,
    ability3: false,
}

export let CHALLENGER_BUTTONS = {
    left: "ArrowLeft",
    right: "ArrowRight",
    down: "ArrowDown",
    up: "ArrowUp",
    shift: "Comma",
    special: "Period",
}

export let BOSS_BUTTONS = {
    left: "KeyA",
    right: "KeyD",
    down: "KeyS",
    up: "KeyW",
    ability1: "Digit1",
    ability2: "Digit2",
    ability3: "Digit3",
}

export let GO_BACK_BUTTON = "Escape";

document.addEventListener("keydown", (event) => {
    //Challenger
    if (event.code === CHALLENGER_BUTTONS.left) {
        INPUTS_CHALLENGER.left = true;
    } else if (event.code === CHALLENGER_BUTTONS.up) {
        INPUTS_CHALLENGER.up = true;
    } else if (event.code === CHALLENGER_BUTTONS.right) {
        INPUTS_CHALLENGER.right = true;
    } else if (event.code === CHALLENGER_BUTTONS.down) {
        INPUTS_CHALLENGER.down = true;
    } else if (event.code === CHALLENGER_BUTTONS.shift) {
        INPUTS_CHALLENGER.shift = true;
    } else if (event.code === CHALLENGER_BUTTONS.special) {
        INPUTS_CHALLENGER.special = true;
    }

    //Boss
    else if (event.code === BOSS_BUTTONS.left) {
        INPUTS_BOSS.left = true;
    } else if (event.code === BOSS_BUTTONS.up) {
        INPUTS_BOSS.up = true;
    } else if (event.code === BOSS_BUTTONS.right) {
        INPUTS_BOSS.right = true;
    } else if (event.code === BOSS_BUTTONS.down) {
        INPUTS_BOSS.down = true;
    } else if (event.code === BOSS_BUTTONS.ability1) {
        INPUTS_BOSS.ability1 = true;
    } else if (event.code === BOSS_BUTTONS.ability2) {
        INPUTS_BOSS.ability2 = true;
    } else if (event.code === BOSS_BUTTONS.ability3) {
        INPUTS_BOSS.ability3 = true;
    }

    //Single Inputs
    if (event.code === GO_BACK_BUTTON) {
        main_handleGoBackButton();
    }
});

document.addEventListener("keyup", (event) => {
    //Challenger
    if (event.code === CHALLENGER_BUTTONS.left) {
        INPUTS_CHALLENGER.left = false;
    } else if (event.code === CHALLENGER_BUTTONS.up) {
        INPUTS_CHALLENGER.up = false;
    } else if (event.code === CHALLENGER_BUTTONS.right) {
        INPUTS_CHALLENGER.right = false;
    } else if (event.code === CHALLENGER_BUTTONS.down) {
        INPUTS_CHALLENGER.down = false;
    } else if (event.code === CHALLENGER_BUTTONS.shift) {
        INPUTS_CHALLENGER.shift = false;
    }else if (event.code === CHALLENGER_BUTTONS.special) {
        INPUTS_CHALLENGER.special = false;
    }

    //Boss
    else if (event.code === BOSS_BUTTONS.left) {
        INPUTS_BOSS.left = false;
    } else if (event.code === BOSS_BUTTONS.up) {
        INPUTS_BOSS.up = false;
    } else if (event.code === BOSS_BUTTONS.right) {
        INPUTS_BOSS.right = false;
    } else if (event.code === BOSS_BUTTONS.down) {
        INPUTS_BOSS.down = false;
    } else if (event.code === BOSS_BUTTONS.ability1) {
        INPUTS_BOSS.ability1 = false;
    } else if (event.code === BOSS_BUTTONS.ability2) {
        INPUTS_BOSS.ability2 = false;
    } else if (event.code === BOSS_BUTTONS.ability3) {
        INPUTS_BOSS.ability3 = false;
    }
});