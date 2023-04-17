export class SpriteAnimator {
    constructor(spriteArray = []){
        this.currentFrame = 0;
        this.prevState;
        this.spriteArray = spriteArray;
        this.stateSprites;
        this.spriteIndex = 0;
        this.framerate;
    }
    getNextFrame(state){
        if(state !== this.prevState){
            this.framerate = this.spriteArray[state]["framerate"];
            this.stateSprites = this.spriteArray[state]["textures"];
        }
        if(this.currentFrame >= this.framerate){
            if(this.spriteIndex >= this.stateSprites.length - 1){
                this.spriteIndex = 0;
            }else{
                this.spriteIndex++;
            }
            this.currentFrame = 0;
        }else{
            this.currentFrame++;
        }
        this.prevState = state;
        return this.stateSprites[this.spriteIndex];
    }
}