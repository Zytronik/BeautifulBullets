import { boss, bullets } from "./main.js";
import { Bullet } from "./bullet.js";

export const BULLET_SPAWNER_MAP = new Map();
BULLET_SPAWNER_MAP.set();

export class BulletSpawner {
    constructor() {

    }

    pattern1(bulletAmount) {
        for (let i = 0; i < bulletAmount; i++) {
            bullets.push(new Bullet(boss.x, boss.y, BULLET_SPRITE1, this.#trajectory, 500, i, false));
        }
    }

    #trajectory(bulletNumba, bulletAmount, spiral) {
        let x = Math.sin(Math.PI * 2 / (bulletAmount) * bulletNumba + spiral) * 2;
        let y = Math.cos(Math.PI * 2 / (bulletAmount) * bulletNumba + spiral) * 2;
        return [x, y];
    }
}

