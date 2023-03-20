import { FPS } from "./gameSettings.js";
import { Round } from "./round.js"

export class Match {
    constructor() {
        this.isFirstHalfOfRound = true;
        this.currentRound = new Round(isFirstHalfOfRound);
        this.previousRounds = []
        this.elapsedTimeInFrames = 0;
        this.scoreP1 = 0;
        this.scoreP2 = 0;
    }
}

const MATCH_DECIDING_FACTORS = {
    DAMAGE_DEALT: 0,
    TIME_SURVIVED: 1,
    GRACE_GAINED: 2,
}

export const MATCH_SETTINGS = {
    TIME_LIMIT: 120 * FPS,
    FIRST_TO: 3,
    DRAW_DECIDER: MATCH_DECIDING_FACTORS.DAMAGE_DEALT
}

export const PLAYER = {
    ONE: 1,
    TWO: 2,
}

export function convertFramecountIntoMinutesSeconds(timeInFrames) {
    let totalSeconds = timeInFrames / FPS;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return [minutes, seconds];
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

let currentGameState;
const GAMESTATE = {
    MAIN_MENU: "Main Menu",
    SETTINGS: "Settings",
    CHARACTER_SELECTION: "Character Selection",
    GAMESTART_CUTSCENE: "Gamestart Cutscene",
    GAME_REGULAR: "Regular Gameplay",
    GAME_ENRAGE: "Boss Enraged Gameplay",
    CHALLENGER_DEATH: "Challenger died cutscene",
    SWITCHING_SIDES_CUTSCENE: "Switching sides cutscene",
    GAMEOVER_CUTSCENE: "Gameover Cutscene",
    STATS_GAMEOVER: "Stats after gameover",
}

const STATE_TRANSITION_MAP = new Map();
STATE_TRANSITION_MAP.set(GAMESTATE.MAIN_MENU + GAMESTATE.SETTINGS, openSettings)
STATE_TRANSITION_MAP.set(GAMESTATE.SETTINGS + GAMESTATE.MAIN_MENU, closeSettings)

currentGameState = GAMESTATE.MAIN_MENU;
STATE_TRANSITION_MAP.get(currentGameState + GAMESTATE.SETTINGS)();

function openSettings() {
    console.log("open settings")
}
function closeSettings() {
    console.log("open settings")
}