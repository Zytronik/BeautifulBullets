
export let allHitableCircles = [];
export class HitableCircle {
    constructor(x, y, radius, health, hittableByTags, hittableByOrigins, onhit, onDestroy, onDestroyAttributes = []) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.health = health;
        this.currentHealth = health;
        this.onhit = onhit;
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
    takeDamageAndCheckDestroyed() {
        this.currentHealth--;
        this.onhit();
        if (this.currentHealth <= 0) {
            this.onDestroy();
            return true;
        }
    }
}