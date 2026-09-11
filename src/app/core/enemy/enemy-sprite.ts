import {
    AnimatedSprite,
    Rectangle,
    Texture,
} from 'pixi.js';

import { EnemyDirection } from '../types/enemy.types';

const FRAME_HEIGHT = 88;

const IDLE_FRAME_WIDTH = 64;
const MOVEMENT_FRAME_WIDTH = 71;

const FRAME_GAP_X = 0;
const FRAME_GAP_Y = 0;

const ROW_IDLE = 0;
const ROW_LEFT = 1;
const ROW_RIGHT = 2;

const IDLE_FRAME_COUNT = 8;
const MOVEMENT_FRAME_COUNT = 3;

const ANIMATION_SPEED = 0.1;

export class EnemySprite {
    readonly sprite: AnimatedSprite;

    private readonly animations: Record<
        EnemyDirection,
        Texture[]
    >;

    constructor(texture: Texture) {
        this.animations = {
            idle: this.createFrames(
                texture,
                ROW_IDLE,
                IDLE_FRAME_COUNT,
                IDLE_FRAME_WIDTH,
            ),

            left: this.createFrames(
                texture,
                ROW_LEFT,
                MOVEMENT_FRAME_COUNT,
                MOVEMENT_FRAME_WIDTH,
            ),

            right: this.createFrames(
                texture,
                ROW_RIGHT,
                MOVEMENT_FRAME_COUNT,
                MOVEMENT_FRAME_WIDTH,
            ),
        };
        this.sprite = new AnimatedSprite(
            this.animations.idle,
        );
        this.sprite.anchor.set(0.5);
        this.sprite.animationSpeed =
            ANIMATION_SPEED;
        this.sprite.loop = true;
        this.sprite.play();
    }

    setDirection(direction: EnemyDirection): void {
        const textures =
            this.animations[direction];

        if (this.sprite.textures === textures) {
            return;
        }
        this.sprite.textures = textures;
        this.sprite.loop =
            direction === 'idle';

        this.sprite.gotoAndPlay(0);
    }

    setHeight(height: number): void {
        const width =
            height *
            (this.sprite.texture.width /
                this.sprite.texture.height);

        this.sprite.width = width;
        this.sprite.height = height;
    }

    setPosition(x: number, y: number): void {
        this.sprite.position.set(x, y);
    }

    destroy(): void {
        this.sprite.destroy();
    }

    private createFrames(
        texture: Texture,
        row: number,
        frameCount: number,
        frameWidth: number,
    ): Texture[] {
        return Array.from(
            { length: frameCount },
            (_, column) =>
                new Texture({
                    source: texture.source,
                    frame: new Rectangle(
                        column *
                        (frameWidth + FRAME_GAP_X),
                        row *
                        (FRAME_HEIGHT + FRAME_GAP_Y),
                        frameWidth,
                        FRAME_HEIGHT,
                    ),
                }),
        );
    }
}