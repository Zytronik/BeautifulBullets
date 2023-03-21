import {showPage, resetRdyUps, getSelectedCharacters, setupGameUI, pauseGame, resumeGame} from "./frontend.js";
import { loadGame } from "./main.js";

export let currentGameState;
export const GAMESTATE = {
    MAIN_MENU: "MAIN_MENU",
    SETTINGS: "SETTINGS",
    CHARACTER_SELECTION: "CHARACTER_SELECTION",
    GAMESTART_CUTSCENE: "GAMESTART_CUTSCENE",
    GAMEPLAY_REGULAR: "GAME_REGULAR",
    GAMEPLAY_ENRAGE: "GAME_ENRAGE",
    PAUSE_SCREEN: "PAUSE_SCREEN",
    CHALLENGER_DEATH: "CHALLENGER_DEATH",
    SWITCHING_SIDES_CUTSCENE: "SWITCHING_SIDES_CUTSCENE",
    GAMEOVER_CUTSCENE: "GAMEOVER_CUTSCENE",
    RESULT_SCREEN: "STATS_GAMEOVER",
}
const STATE_TRANSITION_MAP = new Map();
STATE_TRANSITION_MAP.set(GAMESTATE.MAIN_MENU + GAMESTATE.SETTINGS, mainMenuToSettings)
STATE_TRANSITION_MAP.set(GAMESTATE.MAIN_MENU + GAMESTATE.CHARACTER_SELECTION, mainMenuToCharacterSelection)
STATE_TRANSITION_MAP.set(GAMESTATE.SETTINGS + GAMESTATE.MAIN_MENU, settingsToMainMenu)
STATE_TRANSITION_MAP.set(GAMESTATE.CHARACTER_SELECTION + GAMESTATE.MAIN_MENU, characterSelectionToMainMenu)
STATE_TRANSITION_MAP.set(GAMESTATE.CHARACTER_SELECTION + GAMESTATE.GAMESTART_CUTSCENE, characterSelectionToGameStartCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMESTART_CUTSCENE + GAMESTATE.GAMEPLAY_REGULAR, gameStartCutsceneToGameplayRegular)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.GAMEPLAY_ENRAGE, gameplayRegularToGameplayEnrage)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.PAUSE_SCREEN, gameplayRegularToPauseScreen)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_ENRAGE + GAMESTATE.CHALLENGER_DEATH, gameplayEnrageToChallengerDeath)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_ENRAGE + GAMESTATE.PAUSE_SCREEN, gameplayEnrageToPauseScreen)
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.GAMEPLAY_REGULAR, pauseScreenToGameplayRegular)
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.GAMEPLAY_ENRAGE, pauseScreenToGameplayEnrage)
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.MAIN_MENU, pauseScreenToMainMenu)
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.SWITCHING_SIDES_CUTSCENE, challengerDeathToSwitchingSidesCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.GAMEOVER_CUTSCENE, ChallengerDeathToGameOverCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.SWITCHING_SIDES_CUTSCENE + GAMESTATE.GAMESTART_CUTSCENE, switchingSidesCutsceneToGameStartCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEOVER_CUTSCENE + GAMESTATE.RESULT_SCREEN, gameOverCutsceneToResultScreen)
STATE_TRANSITION_MAP.set(GAMESTATE.RESULT_SCREEN + GAMESTATE.CHARACTER_SELECTION, resultScreenToCharacterSelection)


currentGameState = GAMESTATE.MAIN_MENU;
export function goToState(GAMESTATE) {
    let transitionMethod = STATE_TRANSITION_MAP.get(currentGameState + GAMESTATE);
    if (transitionMethod == null) {
        console.error(`Illegal GameStateTransition. CurrentGameState: ${currentGameState}, expected next GameState: ${GAMESTATE}. \nNo transition-method found.`)
    } else {
        transitionMethod();
    }
}
function mainMenuToSettings() {
    console.log("main menu -> settings")
    showPage("config");
    currentGameState = GAMESTATE.SETTINGS;
}
function mainMenuToCharacterSelection() { 
    console.log("main menu -> character selection");
    showPage("characterSelection");
    currentGameState = GAMESTATE.CHARACTER_SELECTION;
}
function settingsToMainMenu() { 
    console.log("settings -> main menu");
    showPage("titleScreen");
    currentGameState = GAMESTATE.MAIN_MENU;
}
function characterSelectionToMainMenu() { 
    console.log("character selection -> main menu");
    showPage("titleScreen");
    resetRdyUps();
    currentGameState = GAMESTATE.MAIN_MENU;
}
function characterSelectionToGameStartCutscene() { 
    console.log("character selection -> game start cutscene");
    showPage("game");
    resetRdyUps();
    currentGameState = GAMESTATE.GAMESTART_CUTSCENE;
    //TODO isch nur temporär
    goToState(GAMESTATE.GAMEPLAY_REGULAR);
}
function gameStartCutsceneToGameplayRegular() { 
    console.log("game start cutscene -> gameplay regular");
    loadGame(getSelectedCharacters());
    setupGameUI();
    currentGameState = GAMESTATE.GAMEPLAY_REGULAR;
}
function gameplayRegularToGameplayEnrage() { 
    console.log("gameplay regular -> gameplay enrage");
    currentGameState = GAMESTATE.GAMEPLAY_ENRAGE;
}
function gameplayRegularToPauseScreen() { 
    console.log("gameplay regular -> pause screen");
    pauseGame();
    currentGameState = GAMESTATE.PAUSE_SCREEN;
}
function gameplayEnrageToChallengerDeath() { 
    console.log("gameplay enrage -> challenger death");
}
function gameplayEnrageToPauseScreen() { 
    console.log("gameplay enrage -> pause screen");
    currentGameState = GAMESTATE.PAUSE_SCREEN;
}
function pauseScreenToGameplayRegular(){
    console.log("pause screen -> gameplay regular");
    resumeGame();
    currentGameState = GAMESTATE.GAMEPLAY_REGULAR;
}
function pauseScreenToGameplayEnrage(){
    console.log("pause screen -> gameplay enrage") 
}
function pauseScreenToMainMenu() { 
    console.log("pause screen -> main menu");
    showPage("titleScreen");
    currentGameState = GAMESTATE.MAIN_MENU;
}
function challengerDeathToSwitchingSidesCutscene() { 
    console.log("challenger death -> switching sides cutscene") 
}
function ChallengerDeathToGameOverCutscene() { 
    console.log("challenger death -> game over cutscene") 
}
function switchingSidesCutsceneToGameStartCutscene() { 
    console.log("switching sides cutscene -> game start cutscene") 
}
function gameOverCutsceneToResultScreen() { 
    console.log("game over cutscene -> result screen") 
}
function resultScreenToCharacterSelection() { 
    console.log("result screen -> character selection") 
}


/*
    states:
    
    login/title
    mainmenu
        character selection
            gamesettings
        stage selection
            gamestart cutscene
            game
                pausescreen
            timeover/bossdeath
            challenger death
            switching sides cutscene
            gamestart cutscene
            timeover/bossdeath
            challenger death
            statscreen

            loop / finish


        config

*/