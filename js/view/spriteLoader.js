import { match, boss, challenger } from "../main.js"; 
import { INPUTS_CHALLENGER, INPUTS_BOSS} from "../settings/inputSettings.js";

export let SPRITE_STATES = {
    IDLE: "idle",
    RIGHT: "right",
    LEFT: "left",
}

export class SpriteLoader {
    constructor(character1, character2){
        this.character1 = character1;
        this.character2 = character2;
        this.loadedTextures = {};
        this.loadedTexturesArray = [];
    }
    preloadAllTextures(allDone) {
        let count = this.#countAllUrls();
        var loadCompleted = () => {
            count--;
            if (0 == count) {
                allDone(this.loadedTextures);
            }
        };
        let allUrls = this.#getAllUrls();
        for (const character in allUrls) {
            for (const role in allUrls[character]) {
                for (const state in allUrls[character][role]) {
                    allUrls[character][role][state]["urls"].forEach((url) => {
                        this.#loadSprite(url, loadCompleted, character, role, state, allUrls[character][role][state]["framerate"]);
                    });
                }
            }
        } 
    }
    #loadSprite(sprite, onComplete, character, player, state, framerate) {
        var onLoad = (e) =>  {
            e.target.removeEventListener("load", onLoad);
            this.loadedTextures[character] = this.loadedTextures[character] || {};
            this.loadedTextures[character][player] = this.loadedTextures[character][player] || {};
            this.loadedTextures[character][player][state] = this.loadedTextures[character][player][state] || {};
            this.loadedTextures[character][player][state]["textures"] = this.loadedTextures[character][player][state]["textures"] || [];
            let texture = PIXI.RenderTexture.from(e.target)
            this.loadedTextures[character][player][state]["textures"].push(texture);
            this.loadedTextures[character][player][state]["framerate"] = framerate;
            this.loadedTexturesArray.push(texture);
            onComplete();
        }
        var img = new Image();
        img.addEventListener("load", onLoad, false);
        img.src = sprite;
    }
    getChallengerTextures(){
        if(!this.loadedTextures || Object.keys(this.loadedTextures).length === 0){
            return this.loadedTextures;
        }
        if(match.challenger === 1){
            return this.loadedTextures["character1"]["challenger"];
        }else{
            return this.loadedTextures["character2"]["challenger"];
        }
    }
    getBossTextures(){
        if(!this.loadedTextures || Object.keys(this.loadedTextures).length === 0){
            return this.loadedTextures;
        }
        if(match.boss === 2){
            return this.loadedTextures["character2"]["boss"];
        }else{
            return this.loadedTextures["character1"]["boss"];
        }
    }
    #countAllUrls(){
        let unloadedTextures = [];
        let allSprites = this.#getAllUrls();
        for(const character in allSprites){
            for(const role in allSprites[character]){
                for(const state in allSprites[character][role]){
                    allSprites[character][role][state]["urls"].forEach((url)=> {
                        unloadedTextures.push(url);
                    });
                }
            }
        }
        return unloadedTextures.length;
    }
    #getAllUrls(){
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