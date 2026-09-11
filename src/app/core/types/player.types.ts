export interface PlayerPosition {
    x: number;
    y: number;
}

export interface PlayerMovement {
    x: number;
    y: number;
}

export interface PlayerConfig {
    radiusRatio: number;
    speed: number;
    heightRatio: number;
}

export type PlayerDirection = 'idle' | 'left' | 'right';