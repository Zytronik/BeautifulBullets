export class Round {
    constructor() {
        this.player1.stats = {
            selectedCharacter: "",
            damageDealt: 0,
            timeSurvivedInFrames: 0,
            timeInGraceInFrames: 0,
            challengerBulletsFired: 0,
            bossBulletsFired: 0,
        }
        this.player2.stats = {
            selectedCharacter: "",
            damageDealt: 0,
            timeSurvivedInFrames: 0,
            timeInGraceInFrames: 0,
            challengerBulletsFired: 0,
            bossBulletsFired: 0,
        }
    }
}