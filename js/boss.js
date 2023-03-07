import { BOSS_SPRITE } from "./spriteSettings.js";

export class Boss {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = new Image()
        this.sprite.src = BOSS_SPRITE.url;
        this.size = BOSS_SPRITE.radius;
        this.speed = 0.2;
    }

    getPosition() {
        return {x: this.x, y: this.y};
    }
}