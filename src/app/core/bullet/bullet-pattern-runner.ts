import { Container, Rectangle, Texture } from "pixi.js";
import { Bullet } from "./bullet";
import { BulletState, BulletPattern, BulletPatternContext, BulletPosition } from "../types/bullet.types";

export class BulletPatternRunner {
    readonly origin: BulletPosition

    private readonly bullets: {
        bullet: Bullet;
        state: BulletState;
    }[] = [];

    constructor(
        private readonly pattern: BulletPattern,
        private readonly container: Container,
        private readonly bulletTexture: Texture,
        origin: BulletPosition,
    ) {
        this.origin = {
            ...origin,
        };

        this.spawn();
    }

    getBulletCount(): number {
        return this.bullets.length;
    }

    update(
        deltaSeconds: number,
    ): void {
        for (
            let index =
                this.bullets.length - 1;
            index >= 0;
            index--
        ) {
            const entry =
                this.bullets[index];

            entry.state.age +=
                deltaSeconds;

            if (
                entry.state.age >=
                this.pattern.lifetime
            ) {
                entry.bullet.destroy();

                this.bullets.splice(
                    index,
                    1,
                );

                continue;
            }

            const context:
                BulletPatternContext = {
                origin: this.origin,
                elapsedTime:
                    entry.state.age,
                deltaSeconds,
            };

            const movement =
                this.pattern.trajectory(
                    entry.state,
                    context,
                );

            entry.state.position.x +=
                movement.x *
                deltaSeconds;

            entry.state.position.y +=
                movement.y *
                deltaSeconds;

            entry.bullet.setPosition(
                entry.state.position.x,
                entry.state.position.y,
            );
        }
    }

    isFinished(): boolean {
        return this.bullets.length === 0;
    }

    destroy(): void {
        for (
            const entry of
            this.bullets
        ) {
            entry.bullet.destroy();
        }

        this.bullets.length = 0;
    }

    private spawn(): void {
        const amount =
            this.pattern.bulletAmount;

        for (
            let index = 0;
            index < amount;
            index++
        ) {
            const state: BulletState = {
                index,
                amount,
                age: 0,

                position: {
                    x: this.origin.x,
                    y: this.origin.y,
                },

                trajectoryState:
                    this.pattern
                        .createTrajectoryState?.(
                            index,
                            amount,
                        ) ?? {},
            };

            const spriteConfig =
                this.pattern.sprites?.[
                index %
                this.pattern.sprites.length
                ];

            const texture = spriteConfig
                ? new Texture({
                    source: this.bulletTexture.source,
                    frame: new Rectangle(
                        spriteConfig.x,
                        spriteConfig.y,
                        spriteConfig.width,
                        spriteConfig.height,
                    ),
                })
                : undefined;

            const bullet =
                new Bullet(
                    this.pattern.bulletSize,
                    state.position,
                    texture,
                );

            this.container.addChild(
                bullet.displayObject,
            );

            this.bullets.push({
                bullet,
                state,
            });
        }
    }
}