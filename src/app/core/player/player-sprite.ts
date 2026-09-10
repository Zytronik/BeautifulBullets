import {
    AnimatedSprite,
    Rectangle,
    Texture,
} from 'pixi.js';

import { PlayerDirection } from '../types/player.types';

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 53;
const FRAME_COUNT = 4;

const FRAME_GAP_X = 0;
const FRAME_GAP_Y = 0;

const ROW_IDLE = 0;
const ROW_LEFT = 1;
const ROW_RIGHT = 2;

const ANIMATION_SPEED = 0.1;

export class PlayerSprite {
    readonly sprite: AnimatedSprite;

    private readonly animations: Record<
        PlayerDirection,
        Texture[]
    >;

    constructor(texture: Texture) {
        this.animations = {
            idle: this.createFrames(texture, ROW_IDLE),
            left: this.createFrames(texture, ROW_LEFT),
            right: this.createFrames(texture, ROW_RIGHT),
        };

        this.sprite = new AnimatedSprite(
            this.animations.idle,
        );
        this.sprite.anchor.set(0.5);
        this.sprite.animationSpeed = ANIMATION_SPEED;
        this.sprite.loop = true;
        this.sprite.play();
    }

    setDirection(direction: PlayerDirection): void {
        const textures = this.animations[direction];

        if (this.sprite.textures === textures) {
            return;
        }

        this.sprite.textures = textures;
        this.sprite.gotoAndPlay(0);
    }

    setHeight(height: number): void {
        const width =
            height * (FRAME_WIDTH / FRAME_HEIGHT);

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
    ): Texture[] {
        return Array.from(
            { length: FRAME_COUNT },
            (_, column) =>
                new Texture({
                    source: texture.source,
                    frame: new Rectangle(
                        column * (FRAME_WIDTH + FRAME_GAP_X),
                        row * (FRAME_HEIGHT + FRAME_GAP_Y),
                        FRAME_WIDTH,
                        FRAME_HEIGHT,
                    ),
                }),
        );
    }
}