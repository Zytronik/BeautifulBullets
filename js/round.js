import { PLAYER } from "./matchData";

export class Round {
    constructor(isFirstHalf) {
        this.challenger = isFirstHalf ? PLAYER.ONE : PLAYER.TWO;
        this.boss = isFirstHalf ? PLAYER.TWO : PLAYER.ONE;
        this.timeSurvivedInFrames = 0;
        this.timeInGraceInFrames = 0;
        this.damageDealtToBoss = 0;
        this.challengerBulletsFired = 0;
        this.bossBulletsFired = 0;
    }
}