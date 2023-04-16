import { frontend_showPage, PAGES } from "./view/frontend.js";
import { frontend_closeGameOverScreen, frontend_gameOverAnimation, frontend_gameOverScreen, challengerDeathCutsceneToBlack, challengerDeathCutscene, fadeInUI, frontend_setupGameUI, frontend_showPauseScreen, frontend_closePauseScreen, frontend_showRoundEndScreen, frontend_switchSidesAnimations } from "./view/gamePage.js";
import { frontend_resetRdyUps, frontend_getSelectedCharacters, } from "./view/characterSelectionPage.js";
import { main_swapSides, main_closeGameLoop, main_loadGame, match, main_pauseGameLogic, main_unpauseGameLogic, main_setGameStateEnraged, main_clearAllBullets, main_startGame } from "./main.js";
import { playGameStartCutscene } from "./view/cutScenes.js";

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
STATE_TRANSITION_MAP.set(GAMESTATE.TIME_OVER_CUTSCENE + GAMESTATE.GAMEPLAY_ENRAGED, cutsceneToGameplayEnraged);
STATE_TRANSITION_MAP.set(GAMESTATE.BOSS_DEATH_CUTSCENE + GAMESTATE.GAMEPLAY_ENRAGED, cutsceneToGameplayEnraged);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.PAUSE_SCREEN, gameplayToPauseScreen);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_ENRAGED + GAMESTATE.PAUSE_SCREEN, gameplayToPauseScreen);
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.GAMEPLAY_REGULAR, pauseScreenToGameplay);
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.GAMEPLAY_ENRAGED, pauseScreenToGameplay);
STATE_TRANSITION_MAP.set(GAMESTATE.PAUSE_SCREEN + GAMESTATE.MAIN_MENU, pauseScreenToMainMenu);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_REGULAR + GAMESTATE.CHALLENGER_DEATH, gameplayToChallengerDeath);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEPLAY_ENRAGED + GAMESTATE.CHALLENGER_DEATH, gameplayToChallengerDeath);
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.SWITCHING_SIDES_CUTSCENE, challengerDeathToSwitchingSidesCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.ROUNDOVER_CUTSCENE, challengerDeathToRoundOverCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.CHALLENGER_DEATH + GAMESTATE.GAMEOVER_CUTSCENE, challengerDeathToGameOverCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.SWITCHING_SIDES_CUTSCENE + GAMESTATE.GAMESTART_CUTSCENE, switchingSidesCutsceneToGameStartCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.ROUNDOVER_CUTSCENE + GAMESTATE.GAMESTART_CUTSCENE, roundOverCutsceneToGameStartCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.GAMEOVER_CUTSCENE + GAMESTATE.RESULT_SCREEN, gameOverCutsceneToResultScreen);
STATE_TRANSITION_MAP.set(GAMESTATE.RESULT_SCREEN + GAMESTATE.GAMESTART_CUTSCENE, resultScreenToGameStartCutscene);
STATE_TRANSITION_MAP.set(GAMESTATE.RESULT_SCREEN + GAMESTATE.CHARACTER_SELECTION, resultScreenToCharacterSelection);
STATE_TRANSITION_MAP.set(GAMESTATE.RESULT_SCREEN + GAMESTATE.MAIN_MENU, resultScreenToMainMenu);


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
    /* CURRENT STATE: SETTINGS
        Backend:
            - load current settings
        Frontend:
            - close main menu screen
            - show settings screen
    */
    frontend_showPage(PAGES.CONFIG);
}

function mainMenuToCharacterSelection() {
    /* CURRENT STATE: CHARACTER_SELECTION
        Backend:
            - load characters
        Frontend:
            - close main menu
            - display character selection
            - reset ready buttons
    */
    frontend_resetRdyUps();
    frontend_showPage(PAGES.CHARACTER_SELECTION);
}

function settingsToMainMenu() {
    /* CURRENT STATE: MAIN_MENU
        Backend:
            - save & apply settings
        Frontend:
            - close settings screen
            - show main menu screen
    */
    frontend_showPage(PAGES.MAIN_MENU);
}

function characterSelectionToMainMenu() {
    /* CURRENT STATE: MAIN_MENU
        Backend:
            - 
        Frontend:
            - close character selection screen
            - show main menu screen
    */
    frontend_showPage(PAGES.MAIN_MENU);
}

function characterSelectionToGameStartCutscene() {
    /* CURRENT STATE: GAMESTART_CUTSCENE
        Backend:
            - load data:
                - player1 & player2 from character selection
                - challenger
                - boss
                - create match
            - pause gameplay
            - clear bullets
        Frontend:
            - close character selection screen
            - show gameplay screen
            - play intro cutscene
            - go to GAMEPLAY_REGULAR after cutscene
    */
    frontend_showPage(PAGES.GAMEPLAY);
    main_loadGame(frontend_getSelectedCharacters(), ()=>{
        playGameStartCutscene();
        frontend_setupGameUI();
    });
}

function gameStartCutsceneToGameplayRegular() {
    /* CURRENT STATE: GAMEPLAY_REGULAR
        Backend:
            - start/resume game logic:
                - challenger based on match
                - boss based on match
                - clear bullets
                - set game state to regular
                - unpause gameplay
        Frontend:
            - hide cutscene
            - show ingame UI
    */
    fadeInUI();
    main_startGame();
}

function gameplayRegularToTimeOverCutscene() {
    /* CURRENT STATE: TIME_OVER_CUTSCENE
        Backend:
            - pause gameplay
            - clear bullets
        Frontend:
            - hide game ui
            - play time over cutscene
            - go to GAMEPLAY_ENRAGED after cutscene
    */
    main_pauseGameLogic();
    main_clearAllBullets();
    goToState(GAMESTATE.GAMEPLAY_ENRAGED); //TODO do it in cutscene
}

function gameplayRegularToBossDeathCutscene() {
    /* CURRENT STATE: BOSS_DEATH_CUTSCENE
        Backend:
            - pause gameplay
            - clear bullets
        Frontend:
            - hide game ui
            - play boss death cutscene
            - go to GAMEPLAY_ENRAGED after cutscene
    */
    main_pauseGameLogic();
    main_clearAllBullets();
    goToState(GAMESTATE.GAMEPLAY_ENRAGED); //TODO do it in cutscene
}

function cutsceneToGameplayEnraged() {
    /* CURRENT STATE: GAMEPLAY_ENRAGE
        Backend:
            - unpause gameplay
            - set game state to enraged

                Enraged State:
                    Boss:
                        - Can't take any damage
                        - Passive is replaced with enrage ability
                        - Abilities potentially have lower CD (needs testing)
                        - Rest stays the same as in regular gameplay
                    Challenger:
                        - Can't shoot anymore
                        - Can't gain special charge
                        - Has to try and survive as long as possible
                        - One hit kills? 
                            - Maybe if BOSS_DEATH was the trigger
                            - On TIME_OVER challenger keeps its health

        Frontend:
            - hide cutscene
            - show (enrage?) ingame UI
    */
    main_unpauseGameLogic();
    main_setGameStateEnraged();
}

function gameplayToPauseScreen() {
    /* CURRENT STATE: PAUSE_SCREEN
        Backend:
            - pause gameplay
        Frontend:
            - show pause screen
    */
    main_pauseGameLogic();
    frontend_showPauseScreen();
}

function pauseScreenToGameplay() {
    /* CURRENT STATE: GAMEPLAY_REGULAR / GAMEPLAY_ENRAGE
        Backend:
            - unpause gameplay
        Frontend:
            - hide pause screen
    */
    frontend_closePauseScreen();
    main_unpauseGameLogic();
}

function pauseScreenToMainMenu() {
    /* CURRENT STATE: MAIN_MENU
        Backend:
            - close gameloop and clear data
        Frontend:
            - hide game ui
            - hide pause screen
            - show main menu
    */
    frontend_closePauseScreen();
    main_closeGameLoop();
    frontend_showPage("titleScreen");
}

function gameplayToChallengerDeath() {
    /* CURRENT STATE: CHALLENGER_DEATH
        Backend:
            - pause gameplay
            - keep bullets to show how player died
            - update match stats
        Frontend:
            - hide game ui
            - play challenger death cutscene
            - decide based on match status what state to go to
    */
    main_pauseGameLogic();
    match.updateStats();
    if (match.isRoundInFirstHalf()) {
        challengerDeathCutsceneToBlack();
        setTimeout(() => {
            goToState(GAMESTATE.SWITCHING_SIDES_CUTSCENE);
        }, 2900);
    } else {
        match.decideRoundWinner();
        if (match.hasMatchFinished()) {
            challengerDeathCutsceneToBlack();
            setTimeout(() => {
                goToState(GAMESTATE.GAMEOVER_CUTSCENE)
            }, 2300);
        } else {
            challengerDeathCutscene();
            setTimeout(() => {
                goToState(GAMESTATE.ROUNDOVER_CUTSCENE);
            }, 2300);
        }
    }
}

function challengerDeathToSwitchingSidesCutscene() {
    /* CURRENT STATE: SWITCHING_SIDES_CUTSCENE
        Backend:
            - pause gameplay
            - clear bullets
            - switch sides
        Frontend:
            - hide previous cutscene
            - hide game ui
            - play switching sides cutscene
            - go to GAMESTART_CUTSCENE after cutscene
    */
    main_pauseGameLogic();
    main_swapSides();
    frontend_switchSidesAnimations();
}

function challengerDeathToRoundOverCutscene() {
    /* CURRENT STATE: ROUND_OVER_CUTSCENE
        Backend:
            - pause gameplay
            - clear bullets
            - switch sides
        Frontend:
            - hide previous cutscene
            - hide game ui
            - play round over cutscene
            - go to GAMESTART_CUTSCENE after cutscene
    */
    main_pauseGameLogic();
    main_clearAllBullets();
    main_swapSides();
    frontend_showRoundEndScreen(match.scoreP1, match.scoreP2, match.matchSettings.firstTo);
}

function challengerDeathToGameOverCutscene() {
    /* CURRENT STATE: GAMEOVER_CUTSCENE
        Backend:
            - pause gameplay
            - keep bullets to show how game ended
        Frontend:
            - hide previous cutscene
            - hide game ui
            - play game over cutscene
            - go to RESULT_SCREEN after cutscene
    */
    main_pauseGameLogic();
    frontend_gameOverAnimation();
}

function switchingSidesCutsceneToGameStartCutscene() {
    /* CURRENT STATE: GAMESTART_CUTSCENE
        Backend:
            -
        Frontend:
            - hide previous cutscene
            - hide game ui
            - play game over cutscene
            - go to GAMEPLAY_REGULAR after cutscene
    */
    playGameStartCutscene();
}

function roundOverCutsceneToGameStartCutscene() {
    /* CURRENT STATE: GAMESTART_CUTSCENE
        Backend:
            - match: start next round
        Frontend:
            - go to GAMEPLAY_REGULAR after cutscene
    */
    match.startNextRound();
    playGameStartCutscene();
}

function gameOverCutsceneToResultScreen() {
    /* CURRENT STATE: RESULT_SCREEN
        Backend:
            - keep data for a rematch
        Frontend:
            - close ingame screen
            - show result screen
    */
    frontend_gameOverScreen();
}

function resultScreenToGameStartCutscene() {
    /* CURRENT STATE: GAMESTART_CUTSCENE
    (similar to CHARACTER_SELECTION, just with previous character selection)
        Backend:
            - clear data but keep character selection
            - load data:
                - player1 & player2 characters from previous match
                - challenger
                - boss
                - create match
            - clear bullets
            - pause gameplay
        Frontend:
            - close result screen
            - show gameplay screen
            - play intro cutscene
            - go to GAMEPLAY_REGULAR after cutscene
    */
    frontend_closeGameOverScreen();
    main_loadGame(frontend_getSelectedCharacters(), ()=>{
        goToState(GAMESTATE.GAMEPLAY_REGULAR); //TODO do it in cutscene
    });
    setTimeout(() => {
        playGameStartCutscene();
    }, 1000);
}

function resultScreenToCharacterSelection() {
    /* CURRENT STATE: CHARACTER_SELECTION
        Backend:
            - close gameloop and clear data
        Frontend:
            - close ingame screen
            - show character select screen
            - reset ready buttons
    */
    main_closeGameLoop();
    frontend_closeGameOverScreen();
    setTimeout(() => {
        frontend_showPage(PAGES.CHARACTER_SELECTION);
    }, 200 * 7);
}

function resultScreenToMainMenu() {
    /* CURRENT STATE: MAIN_MENU
        Backend:
            - close gameloop and clear data
        Frontend:
            - close ingame screen
            - show main menu screen
    */
    main_closeGameLoop();
    frontend_closeGameOverScreen();
    setTimeout(() => {
        frontend_showPage(PAGES.MAIN_MENU);
    }, 200 * 7);
}