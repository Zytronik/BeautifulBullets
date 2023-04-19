import { BOARD_HEIGHT, BOARD_WIDTH } from "../settings/gameSettings.js";
import { sounds } from "../sound/sound.js";

export let allHitableCircles = [];
export class HitableCircle {
    constructor(x, y, radius, health, lifetimeInFrames, hittableByTags, hittableByOrigins, onDestroy, onDestroyAttributes) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.health = health;
        this.currentHealth = health;
        this.lifetimeInFrames = lifetimeInFrames;
        this.framesAlive = 0;
        this.onDestroy = onDestroy;
        this.onDestroyAttributes = onDestroyAttributes;
        
        if (!Array.isArray(hittableByTags)) {
            this.hitableByTags = []
            this.hitableByTags.push(hittableByTags)
        } else {
            this.hitableByTags = hittableByTags;
        }
        if (!Array.isArray(hittableByOrigins)) {
            this.hitableByOrigin = []
            this.hitableByOrigin.push(hittableByOrigins)
        } else {
            this.hitableByOrigin = hittableByOrigins;
        }

        allHitableCircles.push(this);
    }
    tick(){
        this.framesAlive++;
        if((this.framesAlive >= this.lifetimeInFrames) || this.#isHitboxOutOfFrame()){
            allHitableCircles.splice(allHitableCircles.indexOf(this), 1);
        }
    }
    takeDamageAndCheckDestroyed() {
        this.currentHealth--;
        if (this.currentHealth <= 0) {
            this.onDestroy();
            allHitableCircles.splice(allHitableCircles.indexOf(this), 1);
            return true;
        }
    }
    #isHitboxOutOfFrame() {
        let border = this.radius * 2;
        let outsideX = this.x <= -border || this.x >= BOARD_WIDTH + border;
        let outsideY = this.y <= -border || this.y >= BOARD_HEIGHT + border;
        // sounds["fireworkFuse"].stop();
        return outsideX || outsideY;
    }
}