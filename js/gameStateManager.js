import { frontend_showPage, PAGES } from "./view/frontend.js";
import { frontend_setupGameUI, frontend_showPauseScreen, frontend_closePauseScreen, frontend_showRoundEndScreen, frontend_switchSidesAnimations } from "./view/gamePage.js";
import { frontend_resetRdyUps, frontend_getSelectedCharacters, } from "./view/characterSelectionPage.js";
import { main_closeGameLoop, main_loadGame, match, main_pauseGameLogic, main_resumeGameLogic, main_setGameStateRegular, main_switchSides, main_setGameStateEnraged, clearAllBullets } from "./main.js";

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
STATE_TRANSITION_MAP.set(GAMESTATE.TIME_OVER_CUTSCENE + GAMESTATE.GAMEPLAY_ENRAGED, cutsceneToGameplayEnraged);
STATE_TRANSITION_MAP.set(GAMESTATE.BOSS_DEATH_CUTSCENE + GAMESTATE.GAMEPLAY_ENRAGED, cutsceneToGameplayEnraged);
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
    // try { throw Error() }
    // catch (e) {
    //     console.debug("Function callstack:\n", e.stack);
    // }
    let transitionMethod = STATE_TRANSITION_MAP.get(currentGameState + GAMESTATE);
    if (transitionMethod == null) {
        console.error(`Illegal GameStateTransition. CurrentGameState: ${currentGameState}, desired next GameState: ${GAMESTATE}. 
        \nNo transition-method found for ${currentGameState} -> ${GAMESTATE}.`);
        console.error(Error());
    } else {
        console.debug(`${currentGameState} -> ${GAMESTATE}`);
        currentGameState = GAMESTATE;
        transitionMethod();
    }
}
function mainMenuToSettings() {
    /*
        Backend:
            - Load current settings
        Frontend
            - Close main menu
            - Open settings
    */ 
    frontend_showPage(PAGES.CONFIG);
}
function mainMenuToCharacterSelection() {
    /*
        Backend:
            - Load characters
        Frontend
            - Close main menu
            - Display character selection
            - Reset ready buttons
    */ 
    frontend_resetRdyUps();
    frontend_showPage(PAGES.CHARACTER_SELECTION);
}
function settingsToMainMenu() {
    /*
        Backend:
            - Save & Apply settings
        Frontend
            - Close settings
            - Open main menu
    */ 
    frontend_showPage(PAGES.MAIN_MENU);
}
function characterSelectionToMainMenu() {
    /*
        Backend:
            - 
        Frontend
            - Close character selection
            - Open main menu
    */ 
    frontend_showPage(PAGES.MAIN_MENU);
}
function characterSelectionToGameStartCutscene() {
    /*
        Backend:
            - prepare game for start:
                - player1 & player2 character
                - challenger
                - boss
                - match
                - empty bullets
        Frontend
            - Close character selection
            - Open gameplay screen
            - Play intro cutscene
                - go to GAMEPLAY_REGULAR after cutscene
    */ 
    frontend_showPage(PAGES.GAMEPLAY);
    main_loadGame(frontend_getSelectedCharacters());
    frontend_setupGameUI();

    //TODO isch nur temporär
    //showGameStartCutscene()
    goToState(GAMESTATE.GAMEPLAY_REGULAR);
}
function gameStartCutsceneToGameplayRegular() {
    /*
        Backend:
            - unpause game
        Frontend
            - Close character selection
            - Open gameplay screen
            - Play intro cutscene
                - go to GAMEPLAY_REGULAR after cutscene
    */ 
    main_resumeGameLogic();
    main_setGameStateRegular();
}
function gameplayRegularToTimeOverCutscene() {
    //TODO
    clearAllBullets();
    goToState(GAMESTATE.GAMEPLAY_ENRAGED);
}
function gameplayRegularToBossDeathCutscene() {
    //TODO
    clearAllBullets();
    goToState(GAMESTATE.GAMEPLAY_ENRAGED);
}
function gameplayToPauseScreen() {
    main_pauseGameLogic();
    frontend_showPauseScreen();
}
function gameplayToChallengerDeath() {
    if (match.hasMatchFinished()) {
        goToState(GAMESTATE.GAMEOVER_CUTSCENE)
    } else {
        console.log(match.isRoundInFirstHalf());
        if (match.isRoundInFirstHalf()) {
            goToState(GAMESTATE.SWITCHING_SIDES_CUTSCENE);
        } else {
            match.decideRoundWinner();
            goToState(GAMESTATE.ROUNDOVER_CUTSCENE);
        }
    }
}
function cutsceneToGameplayEnraged() {
    //TODO
    main_setGameStateEnraged();
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
    main_switchSides();
    frontend_switchSidesAnimations();
    goToState(GAMESTATE.GAMESTART_CUTSCENE);
}
function challengerDeathToRoundOverCutscene() {
    main_pauseGameLogic();
    main_switchSides();
    frontend_showRoundEndScreen(match.scoreP1, match.scoreP2, match.matchSettings.firstTo);
    match.startNextRound();
    goToState(GAMESTATE.GAMESTART_CUTSCENE);
}
function challengerDeathToGameOverCutscene() {
    //TODO
}
function switchingSidesCutsceneToGameStartCutscene() {
    //TODO isch nur temporär
    goToState(GAMESTATE.GAMEPLAY_REGULAR);
}
function roundOverCutsceneToGameStartCutscene() {
    main_resumeGameLogic();
    //TODO isch nur temporär
    goToState(GAMESTATE.GAMEPLAY_REGULAR);

}
function gameOverCutsceneToResultScreen() {
    //TODO
}
function resultScreenToCharacterSelection() {
    //TODO
}