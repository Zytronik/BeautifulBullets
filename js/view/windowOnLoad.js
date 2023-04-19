import { isGameStateEnraged } from "../main.js";
import { goToState, GAMESTATE } from "../gameStateManager.js";
import { loadCharacterSelectionScreen, rdyUpPlayer1, rdyUpPlayer2, getHighestStats } from "./page/characterSelectionPage.js";
import { setupConfigPage } from "./page/configPage.js";
import { sounds, loadSounds } from "../sound/sound.js";
import { updateBossCursor } from "./page/gamePage.js";

export let highestStats;

export let mouseCoordinates = [];

window.onload = function () {
    mainScreenBackground();
    loadSounds();
    prepareFrontendButtons();
    prepareCharacterSelectionData();
    addMouseCoordinateEventListener();
    setupConfigPage();
}

//https://stackoverflow.com/questions/1223764/how-to-trap-double-key-press-in-javascript in game leave
function prepareFrontendButtons() {
    /* document.querySelector("#play").addEventListener("click", function (e) {
        e.preventDefault();
        sounds["clickSound"].play();
        goToState(GAMESTATE.CHARACTER_SELECTION);
    }); */ 
    document.body.addEventListener('keypress', ()=>{
        if(GAMESTATE.MAIN_MENU){
            goToState(GAMESTATE.CHARACTER_SELECTION);
        }
    });
    document.querySelector("#config").addEventListener("click", function (e) {
        e.preventDefault();
        sounds["clickSound"].play();
        goToState(GAMESTATE.SETTINGS);
    });
    document.querySelector("#rdyButton1").addEventListener("click", function (e) {
        sounds["clickSound"].play();
        rdyUpPlayer1(this);
    });
    document.querySelector("#rdyButton2").addEventListener("click", function (e) {
        sounds["clickSound"].play();
        rdyUpPlayer2(this);
    });
    document.querySelector("article.characterSelection .pageBack").addEventListener("click", function (e) {
        sounds["backSound"].play();
        goToState(GAMESTATE.MAIN_MENU);
    });
    document.querySelector("article.config .pageBack").addEventListener("click", function (e) {
        sounds["backSound"].play();
        goToState(GAMESTATE.MAIN_MENU);
    });
    document.querySelector("#resumeGame").addEventListener("click", function (e) {
        sounds["clickSound"].play();
        if (isGameStateEnraged) {
            goToState(GAMESTATE.GAMEPLAY_ENRAGED);
        } else {
            goToState(GAMESTATE.GAMEPLAY_REGULAR);
        }
    });
    document.querySelector("#quitGame").addEventListener("click", function (e) {
        sounds["clickSound"].play();
        goToState(GAMESTATE.MAIN_MENU);
    });
    document.querySelector("article.game .resultScreen .menu-wrapper .retry").addEventListener("click", function (e) {
        sounds["clickSound"].play();
        goToState(GAMESTATE.GAMESTART_CUTSCENE);
    });
    document.querySelector("article.game .resultScreen .menu-wrapper .changeCharacters").addEventListener("click", function (e) {
        sounds["clickSound"].play();
        goToState(GAMESTATE.CHARACTER_SELECTION);
    });
    document.querySelector("article.game .resultScreen .menu-wrapper .quitGame").addEventListener("click", function (e) {
        sounds["clickSound"].play();
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
        updateBossCursor();
    }
}

function mainScreenBackground(){
    var now = new Date();
    if(now.getHours() > 20 || now.getHours() < 8){
        document.querySelector("article.titleScreen > section").classList.add("night");
    }
}
