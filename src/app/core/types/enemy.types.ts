export type EnemyDirection =
    | 'idle'
    | 'left'
    | 'right';

export interface EnemyPosition {
    x: number;
    y: number;
}

export interface EnemyConfig {
    radiusRatio: number;
    heightRatio: number;
    speed: number;
    inputEnabled: boolean;
}