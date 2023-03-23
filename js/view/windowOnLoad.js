import { isGameStateEnraged } from "../main.js";
import { goToState, GAMESTATE } from "../gameStateManager.js";
import { loadCharacterSelectionScreen, rdyUpPlayer1, rdyUpPlayer2, getHighestStats } from "./characterSelectionPage.js";

export let highestStats;

export let mouseCoordinates = [];

window.onload = function () {
    prepareFrontendButtons();
    prepareCharacterSelectionData();
    addMouseCoordinateEventListener();
}

//https://stackoverflow.com/questions/1223764/how-to-trap-double-key-press-in-javascript in game leave
function prepareFrontendButtons() {
    document.querySelector("#play").addEventListener("click", function (e) {
        e.preventDefault();
        goToState(GAMESTATE.CHARACTER_SELECTION);
    });
    document.querySelector("#config").addEventListener("click", function (e) {
        e.preventDefault();
        goToState(GAMESTATE.SETTINGS);
    });
    document.querySelector("#rdyButton1").addEventListener("click", function (e) {
        rdyUpPlayer1(this);
    });
    document.querySelector("#rdyButton2").addEventListener("click", function (e) {
        rdyUpPlayer2(this);
    });
    document.querySelector("#pageBack").addEventListener("click", function (e) {
        goToState(GAMESTATE.MAIN_MENU);
    });
    document.querySelector("#resumeGame").addEventListener("click", function (e) {
        if (isGameStateEnraged) {
            goToState(GAMESTATE.GAMEPLAY_ENRAGED);
        } else {
            goToState(GAMESTATE.GAMEPLAY_REGULAR);
        }
    });
    document.querySelector("#quitGame").addEventListener("click", function (e) {
        goToState(GAMESTATE.MAIN_MENU);
    });
}

function prepareCharacterSelectionData() {
    highestStats = getHighestStats();
    loadCharacterSelectionScreen();
}

function addMouseCoordinateEventListener() {
    document.onmousemove = (event) => {
        mouseCoordinates = [event.clientX, event.clientY];
    }
}