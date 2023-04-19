export class SpriteAnimator {
    constructor(spriteArray, framerate){ //state TODO
        this.currentFrame = 0;
        this.spriteArray = spriteArray;
        this.framerate = framerate;
        this.spriteIndex = 0;
    }
    getNextFrame(){
        console.log(this.spriteArray);
        if(this.currentFrame >= this.framerate){
            if(this.spriteIndex >= this.spriteArray.length - 1){
                this.spriteIndex = 0;
            }else{
                this.spriteIndex++;
            }
            this.currentFrame = 0;
        }else{
            this.currentFrame++;
        }
        console.log(this.currentFrame);
        console.log(this.spriteIndex);
        return this.spriteArray[this.spriteIndex];
    }
}