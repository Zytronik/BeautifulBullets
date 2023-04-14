import { SPRITE_STATES } from "./spriteLoader.js";

export class SpriteAnimator {
    constructor(spriteArray){
        this.currentFrame = 0;
        this.prevState = SPRITE_STATES.IDLE;
        this.spriteArray = spriteArray;
        this.stateSpirtes = spriteArray[this.prevState]["textures"]
        this.spriteIndex = 0;
        this.framerate = spriteArray[this.prevState]["framerate"];
    }
    getNextFrame(state){
        if(state !== this.prevState){
            this.framerate = this.spriteArray[state]["framerate"];
            this.stateSpirtes = this.spriteArray[state]["textures"];
        }
        if(this.currentFrame >= this.framerate){
            if(this.spriteIndex >= this.stateSpirtes.length - 1){
                this.spriteIndex = 0;
            }else{
                this.spriteIndex++;
            }
            this.currentFrame = 0;
        }else{
            this.currentFrame++;
        }
        this.prevState = state;
        return this.stateSpirtes[this.spriteIndex];
    }
}