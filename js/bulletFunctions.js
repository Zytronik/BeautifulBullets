import { BULLET_SPRITE } from "./spriteSettings.js";

export function setupBulletFunction() {
    document.getElementById("attack").addEventListener("click", () => {
        let bullet = new Bullet(getPositionX(), getPositionY(), 0, BULLET_SPRITE.url, trajectory[1,1], 600)
    });
}