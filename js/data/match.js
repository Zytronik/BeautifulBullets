import { DEFAULT_MATCH_SETTINGS, FPS } from "../settings/gameSettings.js";
import { boss, challenger } from "../main.js";
import { GAMESTATE, goToState } from "../gameStateManager.js";

export class Match {
    constructor(player1Character, player2Character, matchSettings = DEFAULT_MATCH_SETTINGS) {
        this.player1Character = player1Character;
        this.player2Character = player2Character;
        this.challenger = PLAYER.ONE;
        this.boss = PLAYER.TWO;
        this.currentRound = new Round();
        this.previousRounds = []
        this.elapsedTimeInFrames = 0;
        this.scoreP1 = 0;
        this.scoreP2 = 0;
        this.matchWinner;
        this.firstHalf = true;
        this.matchSettings = {
            timeLimitInFrames: matchSettings.timeLimitInFrames,
            firstTo: matchSettings.firstTo,
            matchDecider: matchSettings.matchDecider,
        }
    }
    updateTime() {
        this.elapsedTimeInFrames++;
        if (this.elapsedTimeInFrames > this.matchSettings.timeLimitInFrames) {
            goToState(GAMESTATE.TIME_OVER_CUTSCENE);
        }
    }
    updateStats() {
        if (this.challenger === PLAYER.ONE) {
            this.currentRound.player1Stats.damageDealt = 1 - (boss.currentHealth / boss.maxHealth);
            this.currentRound.player1Stats.timeSurvivedInFrames = this.elapsedTimeInFrames;
            this.currentRound.player1Stats.timeInGraceInFrames = challenger.timeInGraceInFrames;
        } else {
            this.currentRound.player2Stats.damageDealt = 1 - (boss.currentHealth / boss.maxHealth);
            this.currentRound.player2Stats.timeSurvivedInFrames = this.elapsedTimeInFrames;
            this.currentRound.player2Stats.timeInGraceInFrames = challenger.timeInGraceInFrames;
        }
    }
    swapSides() {
        /* console.log("match: swap sides")
        console.log("match: challenger before swap: ", this.challenger) */

        this.firstHalf = !this.firstHalf;
        if (this.firstHalf) {
            this.challenger = PLAYER.ONE;
            this.boss = PLAYER.TWO;
        } else {
            this.challenger = PLAYER.TWO;
            this.boss = PLAYER.ONE;
        }
        this.elapsedTimeInFrames = 0;
        //console.log("match: challenger after swap: ", this.challenger)
    }
    getChallenger() {
        return this.challenger === PLAYER.ONE ? this.player1Character.challenger : this.player2Character.challenger
    }
    getBoss() {
        return this.boss === PLAYER.ONE ? this.player1Character.boss : this.player2Character.boss
    }
    decideRoundWinner() {
        if (this.matchSettings.matchDecider === MATCH_DECIDING_FACTORS.DAMAGE_DEALT) {
            let dmgP1 = this.currentRound.player1Stats.damageDealt;
            let dmgP2 = this.currentRound.player2Stats.damageDealt;
            let timeP1 = this.currentRound.player1Stats.timeSurvivedInFrames;
            let timeP2 = this.currentRound.player2Stats.timeSurvivedInFrames;
            if (dmgP1.toFixed(2) === dmgP2.toFixed(2)) {
                if (timeP1 === timeP2) {
                    this.currentRound.roundWinner = DRAW;
                } else if (timeP1 < timeP2) {
                    this.scoreP1++;
                    this.currentRound.roundWinner = PLAYER.ONE;
                } else {
                    this.scoreP2++;
                    this.currentRound.roundWinner = PLAYER.TWO;
                }
            } else if (dmgP1 > dmgP2) {
                this.scoreP1++;
                this.currentRound.roundWinner = PLAYER.ONE;
            } else {
                this.scoreP2++;
                this.currentRound.roundWinner = PLAYER.TWO;
            }
        } else if (this.matchSettings.matchDecider === MATCH_DECIDING_FACTORS.TIME_SURVIVED) {
            let timeP1 = this.currentRound.player1Stats.timeSurvivedInFrames;
            let timeP2 = this.currentRound.player2Stats.timeSurvivedInFrames;
            if (timeP1 === timeP2) {
                this.currentRound.roundWinner = DRAW;
            } else {
                if (timeP1 > timeP2) {
                    this.scoreP1++;
                    this.currentRound.roundWinner = PLAYER.ONE;
                } else {
                    this.scoreP2++;
                    this.currentRound.roundWinner = PLAYER.TWO;
                }
            }
        } else if (this.matchSettings.matchDecider === MATCH_DECIDING_FACTORS.GRACE_GAINED) {
            let timeP1 = this.currentRound.player1Stats.timeInGraceInFrames;
            let timeP2 = this.currentRound.player2Stats.timeInGraceInFrames;
            if (timeP1 === timeP2) {
                this.currentRound.roundWinner = DRAW;
            } else {
                if (timeP1 > timeP2) {
                    this.scoreP1++;
                    this.currentRound.roundWinner = PLAYER.ONE;
                } else {
                    this.scoreP2++;
                    this.currentRound.roundWinner = PLAYER.TWO;
                }
            }
        }
    }
    isRoundInFirstHalf() {
        return this.firstHalf;
    }
    startNextRound() {
        this.previousRounds.push(this.currentRound);
        this.currentRound = new Round();
        this.elapsedTimeInFrames = 0;
    }
    hasMatchFinished() {
        if (this.scoreP1 === this.matchSettings.firstTo) {
            this.matchWinner = PLAYER.ONE;
            this.previousRounds.push(this.currentRound);
            return true;
        }
        if (this.scoreP2 === this.matchSettings.firstTo) {
            this.matchWinner = PLAYER.TWO;
            this.previousRounds.push(this.currentRound);
            return true;
        }
        return false;
    }
}

class Round {
    constructor() {
        this.player1Stats = {
            damageDealt: 0,
            timeSurvivedInFrames: 0,
            timeInGraceInFrames: 0,
        }
        this.player2Stats = {
            damageDealt: 0,
            timeSurvivedInFrames: 0,
            timeInGraceInFrames: 0,
        }
        this.roundWinner;
    }
}

const PLAYER = {
    ONE: 1,
    TWO: 2,
}
const DRAW = "DRAW";

export const MATCH_DECIDING_FACTORS = {
    DAMAGE_DEALT: 0,
    TIME_SURVIVED: 1,
    GRACE_GAINED: 2,
}

export function convertFramecountIntoMinutesSeconds(timeInFrames) {
    let totalSeconds = timeInFrames / FPS;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return [minutes, pad(seconds, 2)];
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}