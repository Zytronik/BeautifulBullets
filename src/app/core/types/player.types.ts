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
    precisionSpeed: number;
    heightRatio: number;
    inputEnabled: boolean;
}

export type PlayerDirection = 'idle' | 'left' | 'right';