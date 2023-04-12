import { match, boss, challenger } from "../main.js"; 
import { INPUTS_CHALLENGER, INPUTS_BOSS} from "../settings/inputSettings.js";

export class SpriteLoader {
    constructor(character1, character2){
        this.character1 = character1;
        this.character2 = character2;
        this.loadedSprites = {};
    }
    preloadAllSprites(allDone) {
        let count = this.#countAllSprites();
        var loadCompleted = () => {
            count--;
            if (0 == count) {
                allDone(this.loadedSprites);
            }
        };
        let allSprites = this.#getAllSprites();
        for (const character in allSprites) {
            for (const role in allSprites[character]) {
                for (const state in allSprites[character][role]) {
                    allSprites[character][role][state]["urls"].forEach((url) => {
                        this.#loadSprite(url, loadCompleted, character, role, state, allSprites[character][role][state]["framerate"]);
                    });
                }
            }
        } 
    }
    #loadSprite(sprite, onComplete, character, player, state, framerate) {
        var onLoad = (e) =>  {
            e.target.removeEventListener("load", onLoad);
            this.loadedSprites[character] = this.loadedSprites[character] || {};
            this.loadedSprites[character][player] = this.loadedSprites[character][player] || {};
            this.loadedSprites[character][player][state] = this.loadedSprites[character][player][state] || {};
            this.loadedSprites[character][player][state]["urls"] = this.loadedSprites[character][player][state]["urls"] || [];
            this.loadedSprites[character][player][state]["urls"].push(PIXI.Texture.from(e.target));
            this.loadedSprites[character][player][state]["framerate"] = framerate;
            onComplete();
        }
        var img = new Image();
        img.addEventListener("load", onLoad, false);
        img.src = sprite;
    }
    getChallengerSprites(){
        if(!this.loadedSprites || Object.keys(this.loadedSprites).length === 0){
            return this.loadedSprites;
        }
        if(match.challenger === 1){
            return this.loadedSprites["character1"]["challenger"];
        }else{
            return this.loadedSprites["character2"]["challenger"];
        }
    }
    getBossSprites(){
        if(!this.loadedSprites || Object.keys(this.loadedSprites).length === 0){
            return this.loadedSprites;
        }
        if(match.boss === 2){
            return this.loadedSprites["character2"]["boss"];
        }else{
            return this.loadedSprites["character1"]["boss"];
        }
    }
    #getCurrentChallengerState(){
        if(INPUTS_CHALLENGER.left === true && INPUTS_CHALLENGER.right === false){
            return "left";
        }
        if(INPUTS_CHALLENGER.right === true && INPUTS_CHALLENGER.left === false){
            return "right";
        }
        return "idle";
    }
    #getCurrentBossState(){
        if(INPUTS_BOSS.left === true && INPUTS_BOSS.right === false){
            return "left";
        }
        if(INPUTS_BOSS.right === true && INPUTS_BOSS.left === false){
            return "right";
        }
        return "idle";
    }
    getCurrentChallengerSprite(){
        return challenger.sprites[this.#getCurrentChallengerState()];
    }
    getCurrentBossSprite(){
        return boss.sprites[this.#getCurrentBossState()];
    }
    #countAllSprites(){
        let unloadedSprites = [];
        let allSprites = this.#getAllSprites();
        for(const character in allSprites){
            for(const role in allSprites[character]){
                for(const state in allSprites[character][role]){
                    allSprites[character][role][state]["urls"].forEach((url)=> {
                        unloadedSprites.push(url);
                    });
                }
            }
        }
        return unloadedSprites.length;
    }
    #getAllSprites(){
        return {
            "character1" :{
                "challenger" : {
                    ...this.character1.challenger.sprites,
                },
                "boss" : {
                    ...this.character1.boss.sprites
                }
            }, 
            "character2" :{
                "challenger" : {
                    ...this.character2.challenger.sprites,
                },
                "boss" : {
                    ...this.character2.boss.sprites
                }
            }
            
        }
    }
}