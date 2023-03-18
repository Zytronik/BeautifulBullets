import { FPS } from "./gameSettings";
import { Round } from "./round"

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

const MATCH_DECIDING_FACTORS = {
    DAMAGE_DEALT: 0,
    TIME_SURVIVED: 1,
    GRACE_GAINED: 2,
}
