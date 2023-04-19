import { cheats, lowerChallengerHealth, lowerBossHealth, setTime, main_setGameStateEnraged, main_handleGoBackButton, match } from "../main.js";
import { updateConfigPage, getInputsCookie } from "../view/page/configPage.js";

export function updateSetting(key, code, type, isPlayerOne){
    //console.log(key, code, isBoss, isPlayerOne);
    if(isPlayerOne){
        PLAYER_ONE_BUTTONS[type][key] = code;
    }else{
        PLAYER_TWO_BUTTONS[type][key] = code;
    }
    
    updateConfigPage();
}

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

export const INPUTS_CHEATS = {
    h: false,
    a: false,
    c: false,
    k: false,
    t: false,
    e: false,
    c: false,
    b: false,
    shiftLeft: false,
    hb: false,
    ab: false,
    cb: false,
    kb: false,

}

export function getAndOverrideByCookies() {
    let p1Cookie = getInputsCookie("player1Inputs");
    if (p1Cookie) {
        PLAYER_ONE_BUTTONS = JSON.parse(p1Cookie);
    }
    let p2Cookie = getInputsCookie("player2Inputs");
    if (p2Cookie) {
        PLAYER_TWO_BUTTONS = JSON.parse(p2Cookie);
    }
}

export let PLAYER_ONE_BUTTONS = {
    "movement": {
        left: "KeyA",
        right: "KeyD",
        down: "KeyS",
        up: "KeyW",
    },
    "challenger": {
        shift: "ShiftLeft",
        special: "Digit1",
    },
    "boss": {
        ability1: 1,
        ability2: "Digit2",
        ability3: "Digit3",
    }
}

export let PLAYER_TWO_BUTTONS = {
    "movement": {
        left: "KeyJ",
        right: "KeyL",
        down: "KeyK",
        up: "KeyI",
    },
    "challenger": {
        shift: "KeyN",
        special: "Digit7",
    },
    "boss": {
        ability1: 1,
        ability2: "Digit8",
        ability3: "Digit9",
    }
}

export let GO_BACK_BUTTON = "Escape";

export let CHEAT_BUTTONS = {
    h: "KeyH",
    a: "KeyA",
    c: "KeyC",
    k: "KeyK",
    t: "KeyT",
    e: "KeyE",
    c: "KeyC",
    b: "KeyB",
    g: "KeyG",
    shiftLeft: "ShiftLeft",
}

function checkGameKeyDowns(){
    let challengerInputs = PLAYER_TWO_BUTTONS.challenger;
    let bossInputs = PLAYER_ONE_BUTTONS.boss;
    let playerOneIsChallenger = false;
    if(match.challenger === 1){
        playerOneIsChallenger = true;
        challengerInputs = PLAYER_ONE_BUTTONS.challenger;
        bossInputs = PLAYER_TWO_BUTTONS.boss;
    }

    //Movement Player One
    if (event.code === PLAYER_ONE_BUTTONS.movement.left) {
        if(playerOneIsChallenger){
            INPUTS_CHALLENGER.left = true;
        }else{
            INPUTS_BOSS.left = true;
        }
    } else if (event.code === PLAYER_ONE_BUTTONS.movement.up) {
        if(playerOneIsChallenger){
            INPUTS_CHALLENGER.up = true;
        }else{
            INPUTS_BOSS.up = true;
        }
    } else if (event.code === PLAYER_ONE_BUTTONS.movement.right) {
        if(playerOneIsChallenger){
            INPUTS_CHALLENGER.right = true;
        }else{
            INPUTS_BOSS.right = true;
        }
    } else if (event.code === PLAYER_ONE_BUTTONS.movement.down) {
        if(playerOneIsChallenger){
            INPUTS_CHALLENGER.down = true;
        }else{
            INPUTS_BOSS.down = true;
        }
    }

    //Movement Player Two
    if (event.code === PLAYER_TWO_BUTTONS.movement.left) {
        if(playerOneIsChallenger){
            INPUTS_BOSS.left = true;
        }else{
            INPUTS_CHALLENGER.left = true;
        }
    } else if (event.code === PLAYER_TWO_BUTTONS.movement.up) {
        if(playerOneIsChallenger){
            INPUTS_BOSS.up = true;
        }else{
            INPUTS_CHALLENGER.up = true;
        }
    } else if (event.code === PLAYER_TWO_BUTTONS.movement.right) {
        if(playerOneIsChallenger){
            INPUTS_BOSS.right = true;
        }else{
            INPUTS_CHALLENGER.right = true;
        }
    } else if (event.code === PLAYER_TWO_BUTTONS.movement.down) {
        if(playerOneIsChallenger){
            INPUTS_BOSS.down = true;
        }else{
            INPUTS_CHALLENGER.down = true;
        }
    }

    //Challenger
    if (event.code === challengerInputs.shift) {
        INPUTS_CHALLENGER.shift = true;
    } else if (event.code === challengerInputs.special) {
        INPUTS_CHALLENGER.special = true;
    }

    //Boss
    if (event.code === bossInputs.ability1) {
        INPUTS_BOSS.ability1 = true;
    } else if (event.code === bossInputs.ability2) {
        INPUTS_BOSS.ability2 = true;
    } else if (event.code === bossInputs.ability3) {
        INPUTS_BOSS.ability3 = true;
    }
}

document.addEventListener("keydown", (event) => {
    if(match != undefined){
        checkGameKeyDowns();
    }

    //Single Inputs
    if (event.code === GO_BACK_BUTTON) {
        main_handleGoBackButton();
    }

    // ***** Super Secret Sauce Cheaty Cheat Code Section *****
    if (event.code === CHEAT_BUTTONS.h) {
        INPUTS_CHEATS.h = true;
    } else if (event.code === CHEAT_BUTTONS.a) {
        INPUTS_CHEATS.a = true;
    } else if (event.code === CHEAT_BUTTONS.c) {
        INPUTS_CHEATS.c = true;
    } else if (event.code === CHEAT_BUTTONS.k) {
        INPUTS_CHEATS.k = true;
    } else if (event.code === CHEAT_BUTTONS.t) {
        INPUTS_CHEATS.t = true;
    } else if (event.code === CHEAT_BUTTONS.e) {
        INPUTS_CHEATS.e = true;
    } else if (event.code === CHEAT_BUTTONS.c) {
        INPUTS_CHEATS.c = true;
    } else if (event.code === CHEAT_BUTTONS.b) {
        INPUTS_CHEATS.b = true;
    } else if (event.code === CHEAT_BUTTONS.shiftLeft) {
        INPUTS_CHEATS.shiftLeft = true;
    }
    
    if (INPUTS_CHEATS.h && !INPUTS_CHEATS.a && !INPUTS_CHEATS.c && !INPUTS_CHEATS.k) {
        INPUTS_CHEATS.hb = true;
    }
    if (INPUTS_CHEATS.h && INPUTS_CHEATS.a && !INPUTS_CHEATS.c && !INPUTS_CHEATS.k && INPUTS_CHEATS.hb) {
        INPUTS_CHEATS.ab = true;
    }
    if (INPUTS_CHEATS.h && INPUTS_CHEATS.a && INPUTS_CHEATS.c && !INPUTS_CHEATS.k && INPUTS_CHEATS.hb && INPUTS_CHEATS.ab) {
        INPUTS_CHEATS.cb = true;
    }
    if (INPUTS_CHEATS.h && INPUTS_CHEATS.a && INPUTS_CHEATS.c && INPUTS_CHEATS.k && INPUTS_CHEATS.hb && INPUTS_CHEATS.ab && INPUTS_CHEATS.cb) {
        INPUTS_CHEATS.kb = true;
        cheats();
    }
    if (INPUTS_CHEATS.shiftLeft && INPUTS_CHEATS.g) {
        cheats();
    }
    if (INPUTS_CHEATS.shiftLeft && INPUTS_CHEATS.c && INPUTS_CHEATS.h) {
        lowerChallengerHealth();
    }
    if (INPUTS_CHEATS.shiftLeft && INPUTS_CHEATS.b && INPUTS_CHEATS.h) {
        lowerBossHealth();
    }
    if (INPUTS_CHEATS.shiftLeft && INPUTS_CHEATS.t) {
        setTime();
    }
    if (INPUTS_CHEATS.shiftLeft && INPUTS_CHEATS.e) {
        main_setGameStateEnraged();
        console.log("Game State set to Enraged");
    }
});

function checkGameKeyUps(){
    let challengerInputs = PLAYER_TWO_BUTTONS.challenger;
    let bossInputs = PLAYER_ONE_BUTTONS.boss;
    let playerOneIsChallenger = false;
    if(match.challenger === 1){
        playerOneIsChallenger = true;
        challengerInputs = PLAYER_ONE_BUTTONS.challenger;
        bossInputs = PLAYER_TWO_BUTTONS.boss;
    }

    //Movement Player One
    if (event.code === PLAYER_ONE_BUTTONS.movement.left) {
        if(playerOneIsChallenger){
            INPUTS_CHALLENGER.left = false;
        }else{
            INPUTS_BOSS.left = false;
        }
    } else if (event.code === PLAYER_ONE_BUTTONS.movement.up) {
        if(playerOneIsChallenger){
            INPUTS_CHALLENGER.up = false;
        }else{
            INPUTS_BOSS.up = false;
        }
    } else if (event.code === PLAYER_ONE_BUTTONS.movement.right) {
        if(playerOneIsChallenger){
            INPUTS_CHALLENGER.right = false;
        }else{
            INPUTS_BOSS.right = false;
        }
    } else if (event.code === PLAYER_ONE_BUTTONS.movement.down) {
        if(playerOneIsChallenger){
            INPUTS_CHALLENGER.down = false;
        }else{
            INPUTS_BOSS.down = false;
        }
    }

    //Movement Player Two
    if (event.code === PLAYER_TWO_BUTTONS.movement.left) {
        if(playerOneIsChallenger){
            INPUTS_BOSS.left = false;
        }else{
            INPUTS_CHALLENGER.left = false;
        }
    } else if (event.code === PLAYER_TWO_BUTTONS.movement.up) {
        if(playerOneIsChallenger){
            INPUTS_BOSS.up = false;
        }else{
            INPUTS_CHALLENGER.up = false;
        }
    } else if (event.code === PLAYER_TWO_BUTTONS.movement.right) {
        if(playerOneIsChallenger){
            INPUTS_BOSS.right = false;
        }else{
            INPUTS_CHALLENGER.right = false;
        }
    } else if (event.code === PLAYER_TWO_BUTTONS.movement.down) {
        if(playerOneIsChallenger){
            INPUTS_BOSS.down = false;
        }else{
            INPUTS_CHALLENGER.down = false;
        }
    }

    //Challenger
    if (event.code === challengerInputs.shift) {
        INPUTS_CHALLENGER.shift = false;
    }else if (event.code === challengerInputs.special) {
        INPUTS_CHALLENGER.special = false;
    }

    //Boss
    if (event.code === bossInputs.ability1) {
        INPUTS_BOSS.ability1 = false;
    } else if (event.code === bossInputs.ability2) {
        INPUTS_BOSS.ability2 = false;
    } else if (event.code === bossInputs.ability3) {
        INPUTS_BOSS.ability3 = false;
    }
}

document.addEventListener("keyup", (event) => {
    if(match != undefined){
        checkGameKeyUps();
    }

    // ***** Super Secret Sauce Cheaty Cheat Code Section *****
    if (event.code === CHEAT_BUTTONS.h) {
        INPUTS_CHEATS.h = false;
        INPUTS_CHEATS.hb = false;
    } else if (event.code === CHEAT_BUTTONS.a) {
        INPUTS_CHEATS.a = false;
        INPUTS_CHEATS.ab = false;
    } else if (event.code === CHEAT_BUTTONS.c) {
        INPUTS_CHEATS.c = false;
        INPUTS_CHEATS.cb = false;
    } else if (event.code === CHEAT_BUTTONS.k) {
        INPUTS_CHEATS.k = false;
        INPUTS_CHEATS.kb = false;
    } else if (event.code === CHEAT_BUTTONS.t) {
        INPUTS_CHEATS.t = false;
    } else if (event.code === CHEAT_BUTTONS.e) {
        INPUTS_CHEATS.e = false;
    } else if (event.code === CHEAT_BUTTONS.b) {
        INPUTS_CHEATS.b = false;
    } else if (event.code === CHEAT_BUTTONS.c) {
        INPUTS_CHEATS.c = false;
    } else if (event.code === CHEAT_BUTTONS.shiftLeft) {
        INPUTS_CHEATS.shiftLeft = false;
    }
});

let lastMouseDown;

function checkGameMouseDowns() {
    let challengerInputs = PLAYER_TWO_BUTTONS.challenger;
    let bossInputs = PLAYER_ONE_BUTTONS.boss;
    let playerOneIsChallenger = false;
    if (match.challenger === 1) {
        playerOneIsChallenger = true;
        challengerInputs = PLAYER_ONE_BUTTONS.challenger;
        bossInputs = PLAYER_TWO_BUTTONS.boss;
    }

    //Movement Player One
    if (event.buttons === PLAYER_ONE_BUTTONS.movement.left) {
        if (playerOneIsChallenger) {
            INPUTS_CHALLENGER.left = true;
            lastMouseDown = event.buttons;
        } else {
            INPUTS_BOSS.left = true;
            lastMouseDown = event.buttons;
        }
    } else if (event.buttons === PLAYER_ONE_BUTTONS.movement.up) {
        if (playerOneIsChallenger) {
            INPUTS_CHALLENGER.up = true;
            lastMouseDown = event.buttons;
        } else {
            INPUTS_BOSS.up = true;
            lastMouseDown = event.buttons;
        }
    } else if (event.buttons === PLAYER_ONE_BUTTONS.movement.right) {
        if (playerOneIsChallenger) {
            INPUTS_CHALLENGER.right = true;
            lastMouseDown = event.buttons;
        } else {
            INPUTS_BOSS.right = true;
            lastMouseDown = event.buttons;
        }
    } else if (event.buttons === PLAYER_ONE_BUTTONS.movement.down) {
        if (playerOneIsChallenger) {
            INPUTS_CHALLENGER.down = true;
            lastMouseDown = event.buttons;
        } else {
            INPUTS_BOSS.down = true;
            lastMouseDown = event.buttons;
        }
    }

    //Movement Player Two
    if (event.buttons === PLAYER_TWO_BUTTONS.movement.left) {
        if (playerOneIsChallenger) {
            INPUTS_BOSS.left = true;
            lastMouseDown = event.buttons;
        } else {
            INPUTS_CHALLENGER.left = true;
            lastMouseDown = event.buttons;
        }
    } else if (event.buttons === PLAYER_TWO_BUTTONS.movement.up) {
        if (playerOneIsChallenger) {
            INPUTS_BOSS.up = true;
            lastMouseDown = event.buttons;
        } else {
            INPUTS_CHALLENGER.up = true;
            lastMouseDown = event.buttons;
        }
    } else if (event.buttons === PLAYER_TWO_BUTTONS.movement.right) {
        if (playerOneIsChallenger) {
            INPUTS_BOSS.right = true;
            lastMouseDown = event.buttons;
        } else {
            INPUTS_CHALLENGER.right = true;
            lastMouseDown = event.buttons;
        }
    } else if (event.buttons === PLAYER_TWO_BUTTONS.movement.down) {
        if (playerOneIsChallenger) {
            INPUTS_BOSS.down = true;
            lastMouseDown = event.buttons;
        } else {
            INPUTS_CHALLENGER.down = true;
            lastMouseDown = event.buttons;
        }
    }

    //Challenger
    if (event.buttons === challengerInputs.shift) {
        INPUTS_CHALLENGER.shift = true;
        lastMouseDown = event.buttons;
    } else if (event.buttons === challengerInputs.special) {
        INPUTS_CHALLENGER.special = true;
        lastMouseDown = event.buttons;
    }

    //Boss
    if (event.buttons === bossInputs.ability1) {
        INPUTS_BOSS.ability1 = true;
        lastMouseDown = event.buttons;
    } else if (event.buttons === bossInputs.ability2) {
        INPUTS_BOSS.ability2 = true;
        lastMouseDown = event.buttons;
    } else if (event.buttons === bossInputs.ability3) {
        INPUTS_BOSS.ability3 = true;
        lastMouseDown = event.buttons;
    }
}

document.addEventListener("mousedown", (event) => {
    if(match != undefined){
        checkGameMouseDowns();
    }
});

function checkGameMouseUps() {
    let challengerInputs = PLAYER_TWO_BUTTONS.challenger;
    let bossInputs = PLAYER_ONE_BUTTONS.boss;
    let playerOneIsChallenger = false;
    if (match.challenger === 1) {
        playerOneIsChallenger = true;
        challengerInputs = PLAYER_ONE_BUTTONS.challenger;
        bossInputs = PLAYER_TWO_BUTTONS.boss;
    }
    
    //Movement Player One
    if (lastMouseDown === PLAYER_ONE_BUTTONS.movement.left) {
        if (playerOneIsChallenger) {
            INPUTS_CHALLENGER.left = false;
        } else {
            INPUTS_BOSS.left = false;
        }
    } else if (lastMouseDown === PLAYER_ONE_BUTTONS.movement.up) {
        if (playerOneIsChallenger) {
            INPUTS_CHALLENGER.up = false;
        } else {
            INPUTS_BOSS.up = false;
        }
    } else if (lastMouseDown === PLAYER_ONE_BUTTONS.movement.right) {
        if (playerOneIsChallenger) {
            INPUTS_CHALLENGER.right = false;
        } else {
            INPUTS_BOSS.right = false;
        }
    } else if (lastMouseDown === PLAYER_ONE_BUTTONS.movement.down) {
        if (playerOneIsChallenger) {
            INPUTS_CHALLENGER.down = false;
        } else {
            INPUTS_BOSS.down = false;
        }
    }

    //Movement Player Two
    if (lastMouseDown === PLAYER_TWO_BUTTONS.movement.left) {
        if (playerOneIsChallenger) {
            INPUTS_BOSS.left = false;
        } else {
            INPUTS_CHALLENGER.left = false;
        }
    } else if (lastMouseDown === PLAYER_TWO_BUTTONS.movement.up) {
        if (playerOneIsChallenger) {
            INPUTS_BOSS.up = false;
        } else {
            INPUTS_CHALLENGER.up = false;
        }
    } else if (lastMouseDown === PLAYER_TWO_BUTTONS.movement.right) {
        if (playerOneIsChallenger) {
            INPUTS_BOSS.right = false;
        } else {
            INPUTS_CHALLENGER.right = false;
        }
    } else if (lastMouseDown === PLAYER_TWO_BUTTONS.movement.down) {
        if (playerOneIsChallenger) {
            INPUTS_BOSS.down = false;
        } else {
            INPUTS_CHALLENGER.down = false;
        }
    }

    //Challenger
    if (lastMouseDown === challengerInputs.shift) {
        INPUTS_CHALLENGER.shift = false;
    } else if (lastMouseDown === challengerInputs.special) {
        INPUTS_CHALLENGER.special = false;
    }

    //Boss
    if (lastMouseDown === bossInputs.ability1) {
        INPUTS_BOSS.ability1 = false;
    } else if (lastMouseDown === bossInputs.ability2) {
        INPUTS_BOSS.ability2 = false;
    } else if (lastMouseDown === bossInputs.ability3) {
        INPUTS_BOSS.ability3 = false;
    }
}

document.addEventListener("mouseup", (event) => {
    if(match != undefined){
        checkGameMouseUps();
    }
});