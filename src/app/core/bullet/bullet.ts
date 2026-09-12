import { Graphics, Sprite, Texture } from "pixi.js";
import { BulletPosition } from "../types/bullet.types";

export class Bullet {
    readonly displayObject: Sprite | Graphics;

    constructor(
        size: number,
        position: BulletPosition,
        texture?: Texture,
    ) {
        this.displayObject = texture
            ? new Sprite(texture)
            : new Graphics()
                .circle(0, 0, size)
                .fill(0xffffff);

        if (texture) {
            this.displayObject.width = size * 2;
            this.displayObject.height = size * 2;
        }

        this.setPosition(
            position.x,
            position.y,
        );
    }

    setPosition(
        x: number,
        y: number,
    ): void {
        this.displayObject.position.set(x, y);
    }

    destroy(): void {
        this.displayObject.destroy();
    }
}