let currentGameState;
const GAMESTATE = {
    MAIN_MENU: "MAIN_MENU",
    SETTINGS: "SETTINGS",
    CHARACTER_SELECTION: "CHARACTER_SELECTION",
    GAMESTART_CUTSCENE: "GAMESTART_CUTSCENE",
    GAME_REGULAR: "GAME_REGULAR",
    GAME_ENRAGE: "GAME_ENRAGE",
    CHALLENGER_DEATH: "CHALLENGER_DEATH",
    SWITCHING_SIDES_CUTSCENE: "SWITCHING_SIDES_CUTSCENE",
    GAMEOVER_CUTSCENE: "GAMEOVER_CUTSCENE",
    STATS_GAMEOVER: "STATS_GAMEOVER",
}

const STATE_TRANSITION_MAP = new Map();
STATE_TRANSITION_MAP.set(GAMESTATE.MAIN_MENU + GAMESTATE.SETTINGS, openSettings)
STATE_TRANSITION_MAP.set(GAMESTATE.SETTINGS + GAMESTATE.MAIN_MENU, closeSettings)

currentGameState = GAMESTATE.MAIN_MENU;

function openSettings() {
    console.log("open settings")
}
function closeSettings() {
    console.log("open main")
}

export function goToState(GAMESTATE) {
    let transitionMethod = STATE_TRANSITION_MAP.get(currentGameState + GAMESTATE);
    if (transitionMethod == null) {
        console.error(`Illegal GamestateTransition. CurrentGameState: ${currentGameState}, expected next GameState: ${GAMESTATE}. \nNo transition-method found.`)
    } else {
        transitionMethod();
    }
}

goToState(GAMESTATE.SETTINGS);
goToState(GAMESTATE.STATS_GAMEOVER);


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