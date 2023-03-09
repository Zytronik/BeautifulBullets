import {boss, bullets} from "./main.js";
import { Bullet } from "./bullet.js";
import { BULLET_SPRITE1 } from "./spriteSettings.js";


export class BulletFunctions {
    constructor(){
        
    }

    pattern1(bulletAmount) {
        for(let i = 0; i < bulletAmount; i++) {
            bullets.push(new Bullet(boss.x, boss.y, BULLET_SPRITE1, this.#trajectory, 500, i, false));
          }
    }

    #trajectory(bulletNumba, bulletAmount, spiral) {
        // console.log(bulletNumba, bulletAmount)

        return [Math.sin(Math.PI*2/(bulletAmount)*bulletNumba+spiral)*2, Math.cos(Math.PI*2/(bulletAmount)*bulletNumba+spiral)*2]
    }
}