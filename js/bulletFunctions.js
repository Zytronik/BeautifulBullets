import { BULLET_SPRITES } from "./spriteSettings.js";
import { boss, challengerCanvas } from "./main.js";
import {Bullet} from "./bullet.js";

export function setupBulletFunction() {
    //document.getElementById("attack").addEventListener("click", () => {
        let bullet = new Bullet(300, 400, 0, BULLET_SPRITES["testBullet"], 1, 600)
        challengerCanvas.drawBullet(bullet);
    //});
}