import { Graphics } from "pixi.js";
import { BulletPosition } from "../types/bullet.types";

export class Bullet {
    readonly graphics: Graphics;

    private age = 0;

    constructor(
        size: number,
        position: BulletPosition,
    ) {
        this.graphics = new Graphics()
            .circle(
                0,
                0,
                size,
            )
            .fill(0xffffff);

        this.setPosition(
            position.x,
            position.y,
        );
    }

    updateAge(
        deltaSeconds: number,
    ): void {
        this.age += deltaSeconds;
    }

    getAge(): number {
        return this.age;
    }

    setPosition(
        x: number,
        y: number,
    ): void {
        this.graphics.position.set(
            x,
            y,
        );
    }

    destroy(): void {
        this.graphics.destroy();
    }
}