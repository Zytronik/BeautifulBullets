import { CHALLENGER_SPRITE } from "./spriteSettings.js";

export class Challenger {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = new Image()
        this.sprite.src = CHALLENGER_SPRITE.url;
        this.size = CHALLENGER_SPRITE.radius;
    }
}