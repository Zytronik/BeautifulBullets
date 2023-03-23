import { frontend_showPage, PAGES } from "./view/frontend.js";
import { frontend_setupGameUI, frontend_showPauseScreen, frontend_closePauseScreen, frontend_showRoundEndScreen, frontend_switchSidesAnimations } from "./view/gamePage.js";
import { frontend_resetRdyUps, frontend_getSelectedCharacters, } from "./view/characterSelectionPage.js";
import { main_closeGameLoop, main_loadGame, match, main_pauseGameLogic, main_resumeGameLogic, main_setGameStateRegular, main_switchSides } from "./main.js";

export let currentGameState;
export const GAMESTATE = {
    MAIN_MENU: "MAIN_MENU",
    SETTINGS: "SETTINGS",
    CHARACTER_SELECTION: "CHARACTER_SELECTION",
    GAMESTART_CUTSCENE: "GAMESTART_CUTSCENE",
    GAMEPLAY_REGULAR: "GAME_REGULAR",
    PAUSE_SCREEN: "PAUSE_SCREEN",
    TIME_OVER_CUTSCENE: "TIME_OVER_CUTSCENE",
    BOSS_DEATH_CUTSCENE: "BOSS_DEATH_CUTSCENE",
    GAMEPLAY_ENRAGED: "GAME_ENRAGED",
    CHALLENGER_DEATH: "CHALLENGER_DEATH",
    SWITCHING_SIDES_CUTSCENE: "SWITCHING_SIDES_CUTSCENE",
    ROUNDOVER_CUTSCENE: "ROUNDOVER_CUTSCENE",
    GAMEOVER_CUTSCENE: "GAMEOVER_CUTSCENE",
    RESULT_SCREEN: "STATS_GAMEOVER",
}
const STATE_TRANSITION_MAP = new Map();
STATE_TRANSITION_MAP.set(GAMESTATE.MAIN_MENU + GAMESTATE.SETTINGS, mainMenuToSettings);
STATE_TRANSITION_MAP.set(GAMESTATE.MAIN_MENU + GAMESTATE.CHARACTER_SELECTION, mainMenuToCharacterSelection);
STATE_TRANSITION_MAP.set(GAMESTATE.SETTINGS + GAMESTATE.MAIN_MENU, settingsToMainMenu);
STATE_TRANSITION_MAP.set(GAMESTATE.CHARACTER_SELECTION + GAMESTATE.MAIN_MENU, characterSelectionToMainMenu);
STATE_TRANSITION_MAP.set(GAMESTATE.CHARACTER_SELECTION + GAMESTATE.GAMESTART_CUTSCENE, characterSelectionToGameStartCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMESTART_CUTSCENE + GAMESTATE.GAMEPLAY_REGULAR, gameStartCutsceneToGameplayRegular);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.TIME_OVER_CUTSCENE, gameplayRegularToTimeOverCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.BOSS_DEATH_CUTSCENE, gameplayRegularToBossDeathCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.PAUSE_SCREEN, gameplayToPauseScreen);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.CHALLENGER_DEATH, gameplayToChallengerDeath);
STATE_TRANSITION_MAP.set(GAMESTATE.TIME_OVER_CUTSCENE + GAMESTATE.GAMEPLAY_ENRAGED, timeOverCutsceneToGameplayEnraged);
STATE_TRANSITION_MAP.set(GAMESTATE.BOSS_DEATH_CUTSCENE + GAMESTATE.GAMEPLAY_ENRAGED, bossDeathCutsceneToGameplayEnraged);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_ENRAGED + GAMESTATE.CHALLENGER_DEATH, gameplayToChallengerDeath);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_ENRAGED + GAMESTATE.PAUSE_SCREEN, gameplayToPauseScreen);
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.GAMEPLAY_REGULAR, pauseScreenToGameplay);
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.GAMEPLAY_ENRAGED, pauseScreenToGameplay);
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.MAIN_MENU, pauseScreenToMainMenu);
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.SWITCHING_SIDES_CUTSCENE, challengerDeathToSwitchingSidesCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.ROUNDOVER_CUTSCENE, challengerDeathToRoundOverCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.GAMEOVER_CUTSCENE, challengerDeathToGameOverCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.SWITCHING_SIDES_CUTSCENE + GAMESTATE.GAMESTART_CUTSCENE, switchingSidesCutsceneToGameStartCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.ROUNDOVER_CUTSCENE + GAMESTATE.GAMESTART_CUTSCENE, roundOverCutsceneToGameStartCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEOVER_CUTSCENE + GAMESTATE.RESULT_SCREEN, gameOverCutsceneToResultScreen);
STATE_TRANSITION_MAP.set(GAMESTATE.RESULT_SCREEN + GAMESTATE.CHARACTER_SELECTION, resultScreenToCharacterSelection);


currentGameState = GAMESTATE.MAIN_MENU;
export function goToState(GAMESTATE) {
    // Helps with finding where the spaghetti began :)
    try { throw Error(); }
    catch (e) {
        console.debug("Function callstack:\n", e.stack);
    }
    let transitionMethod = STATE_TRANSITION_MAP.get(currentGameState + GAMESTATE);
    if (transitionMethod == null) {
        console.error(`Illegal GameStateTransition. CurrentGameState: ${currentGameState}, desired next GameState: ${GAMESTATE}. 
        \nNo transition-method found for ${currentGameState} -> ${GAMESTATE}.`);
    } else {
        console.debug(`${currentGameState} -> ${GAMESTATE}`);
        currentGameState = GAMESTATE;
        transitionMethod();
    }
}
function mainMenuToSettings() {
    frontend_showPage(PAGES.CONFIG);
}
function mainMenuToCharacterSelection() {
    frontend_resetRdyUps();
    frontend_showPage(PAGES.CHARACTER_SELECTION);
}
function settingsToMainMenu() {
    frontend_showPage(PAGES.MAIN_MENU);
}
function characterSelectionToMainMenu() {
    frontend_showPage(PAGES.MAIN_MENU);
}
function characterSelectionToGameStartCutscene() {
    frontend_showPage(PAGES.GAMEPLAY);
    main_loadGame(frontend_getSelectedCharacters());
    frontend_setupGameUI();

    //TODO isch nur temporär
    //showGameStartCutscene()
    goToState(GAMESTATE.GAMEPLAY_REGULAR);
}
function gameStartCutsceneToGameplayRegular() {
    main_resumeGameLogic();
    main_setGameStateRegular();
}
function gameplayRegularToTimeOverCutscene() {
    //TODO
    goToState(GAMEPLAY_ENRAGED);
}
function gameplayRegularToBossDeathCutscene() {
    //TODO
    goToState(GAMEPLAY_ENRAGED);
}
function gameplayToPauseScreen() {
    main_pauseGameLogic();
    frontend_showPauseScreen();
}
function gameplayToChallengerDeath() {
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
function timeOverCutsceneToGameplayEnraged() {
    //TODO
}
function bossDeathCutsceneToGameplayEnraged() {
    //TODO
}
function pauseScreenToGameplay() {
    frontend_closePauseScreen();
    main_resumeGameLogic();
}
function pauseScreenToMainMenu() {
    frontend_closePauseScreen();
    main_closeGameLoop();
    frontend_showPage("titleScreen");
}
function challengerDeathToSwitchingSidesCutscene() {
    main_pauseGameLogic();
    frontend_switchSidesAnimations();
    setTimeout(() => {
        main_switchSides();
    }, 900);
}
function challengerDeathToRoundOverCutscene() {
    frontend_showRoundEndScreen(match.scoreP1, match.scoreP2, match.matchSettings.firstTo);
}
function challengerDeathToGameOverCutscene() {
    //TODO
}
function switchingSidesCutsceneToGameStartCutscene() {
    //TODO isch nur temporär
    goToState(GAMESTATE.GAMEPLAY_REGULAR);
}
function roundOverCutsceneToGameStartCutscene() {
    //TODO
}
function gameOverCutsceneToResultScreen() {
    //TODO
}
function resultScreenToCharacterSelection() {
    //TODO
}