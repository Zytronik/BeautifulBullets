import { showPage, resetRdyUps, getSelectedCharacters, setupGameUI, showPauseScreen, closePauseScreen, showRoundEndScreen, switchSidesAnimations } from "./view/frontend.js";
import { loadGame, match, pauseGameLogic, resumeGameLogic } from "./main.js";

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
    ROUNDOVER_CUTSCENE: "ROUNDOVER_CUTSCENE",
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
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.CHALLENGER_DEATH, gameplayToChallengerDeath)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_ENRAGE + GAMESTATE.CHALLENGER_DEATH, gameplayToChallengerDeath)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_ENRAGE + GAMESTATE.PAUSE_SCREEN, gameplayEnrageToPauseScreen)
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.GAMEPLAY_REGULAR, pauseScreenToGameplayRegular)
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.GAMEPLAY_ENRAGE, pauseScreenToGameplayEnrage)
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.MAIN_MENU, pauseScreenToMainMenu)
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.SWITCHING_SIDES_CUTSCENE, challengerDeathToSwitchingSidesCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.ROUNDOVER_CUTSCENE, challengerDeathToRoundOverCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.GAMEOVER_CUTSCENE, challengerDeathToGameOverCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.SWITCHING_SIDES_CUTSCENE + GAMESTATE.GAMESTART_CUTSCENE, switchingSidesCutsceneToGameStartCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.ROUNDOVER_CUTSCENE + GAMESTATE.GAMESTART_CUTSCENE, roundOverCutsceneToGameStartCutscene)
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEOVER_CUTSCENE + GAMESTATE.RESULT_SCREEN, gameOverCutsceneToResultScreen)
STATE_TRANSITION_MAP.set(GAMESTATE.RESULT_SCREEN + GAMESTATE.CHARACTER_SELECTION, resultScreenToCharacterSelection)


currentGameState = GAMESTATE.MAIN_MENU;
export function goToState(GAMESTATE) {
    // Find out where the spaghetti beginns :)
    try { throw Error(); }
    catch (e) {
        console.debug("Function callstack:\n", e.stack);
    }

    let transitionMethod = STATE_TRANSITION_MAP.get(currentGameState + GAMESTATE);
    if (transitionMethod == null) {
        console.error(`Illegal GameStateTransition. CurrentGameState: ${currentGameState}, desired next GameState: ${GAMESTATE}. 
        \nNo transition-method found for ${currentGameState} -> ${GAMESTATE}.`)
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
    loadGame(getSelectedCharacters());
    setupGameUI();
    currentGameState = GAMESTATE.GAMESTART_CUTSCENE;
    //TODO isch nur temporär
    goToState(GAMESTATE.GAMEPLAY_REGULAR);
}
function gameStartCutsceneToGameplayRegular() {
    console.log("game start cutscene -> gameplay regular");
    currentGameState = GAMESTATE.GAMEPLAY_REGULAR;
}
function gameplayRegularToGameplayEnrage() {
    console.log("gameplay regular -> gameplay enrage");
    pauseGameLogic();
    showPauseScreen();
    currentGameState = GAMESTATE.GAMEPLAY_ENRAGE;
}
function gameplayRegularToPauseScreen() {
    console.log("gameplay regular -> pause screen");
    pauseGameLogic();
    showPauseScreen();
    currentGameState = GAMESTATE.PAUSE_SCREEN;
}
function gameplayToChallengerDeath() {
    console.log("gameplay enrage -> challenger death");
    currentGameState = GAMESTATE.CHALLENGER_DEATH;
    match.updateStats();
    if (match.hasMatchFinished()) {
        goToState(GAMESTATE.RESULT_SCREEN)
    } else {
        if (match.hasRoundFinished()) {
            match.decideRoundWinner();
            goToState(GAMESTATE.SWITCHING_SIDES_CUTSCENE);
        } else {
            goToState(GAMESTATE.ROUNDOVER_CUTSCENE);
        }
    }
}
function gameplayEnrageToPauseScreen() {
    console.log("gameplay enrage -> pause screen");
    currentGameState = GAMESTATE.PAUSE_SCREEN;
}
function pauseScreenToGameplayRegular() {
    console.log("pause screen -> gameplay regular");
    closePauseScreen();
    resumeGameLogic();
    currentGameState = GAMESTATE.GAMEPLAY_REGULAR;
}
function pauseScreenToGameplayEnrage() {
    console.log("pause screen -> gameplay enrage");
    currentGameState = GAMESTATE.GAMEPLAY_ENRAGE;
}
function pauseScreenToMainMenu() {
    console.log("pause screen -> main menu");
    showPage("titleScreen");
    currentGameState = GAMESTATE.MAIN_MENU;
}
function challengerDeathToSwitchingSidesCutscene() {
    console.log("challenger death -> switching sides cutscene");
    currentGameState = GAMESTATE.SWITCHING_SIDES_CUTSCENE;
    switchSidesAnimations();
    match.swapSides();
}
function challengerDeathToRoundOverCutscene() {
    console.log("challenger death -> round over cutscene");
    showRoundEndScreen(match.scoreP1, match.scoreP2);
    currentGameState = GAMESTATE.ROUNDOVER_CUTSCENE;
}
function challengerDeathToGameOverCutscene() {
    console.log("challenger death -> game over cutscene");
    currentGameState = GAMESTATE.challengerDeathToGameOverCutscene;
}
function switchingSidesCutsceneToGameStartCutscene() {
    console.log("switching sides cutscene -> game start cutscene");
    currentGameState = GAMESTATE.GAMESTART_CUTSCENE;
    //TODO isch nur temporär
    goToState(GAMESTATE.GAMEPLAY_REGULAR);
}
function roundOverCutsceneToGameStartCutscene() {
    console.log("round over cutscene -> game start cutscene");
    currentGameState = GAMESTATE.GAMESTART_CUTSCENE;
}
function gameOverCutsceneToResultScreen() {
    console.log("game over cutscene -> result screen");
    currentGameState = GAMESTATE.RESULT_SCREEN;
}
function resultScreenToCharacterSelection() {
    console.log("result screen -> character selection");
    currentGameState = GAMESTATE.CHARACTER_SELECTION;
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