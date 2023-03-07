import { BULLET_SPRITE } from "./spriteSettings.js";
import { boss } from "./main.js";

export function setupBulletFunction() {
    document.getElementById("attack").addEventListener("click", () => {
        let bullet = new Bullet(boss.getPosition().x, boss.getPosition().y, 0, BULLET_SPRITE.url, trajectory[1,1], 600)
    });
}