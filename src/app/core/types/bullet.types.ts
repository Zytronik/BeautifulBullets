import { BulletPatternRunner } from "../bullet/bullet-pattern-runner";

export interface BulletPosition {
    x: number;
    y: number;
}

export interface BulletMovement {
    x: number;
    y: number;
}

export interface BulletState {
    index: number;
    amount: number;
    age: number;
    position: BulletPosition;
    trajectoryState: Record<
        string,
        number
    >;
}

export interface BulletPatternContext {
    origin: BulletPosition;
    elapsedTime: number;
    deltaSeconds: number;
}

export interface BulletPattern {
    bulletAmount: number;
    bulletSize: number;
    lifetime: number;
    frequency: number;
    loop: boolean;
    repetitions?: number;
    speedMultiplier?: number;
    sprites?: BulletSpriteConfig[];
    createTrajectoryState?: (
        index: number,
        amount: number,
    ) => Record<string, number>;
    trajectory: (
        bullet: BulletState,
        context: BulletPatternContext,
    ) => BulletMovement;
}

export interface ActivePattern {
    pattern: BulletPattern;
    getOrigin: () => BulletPosition;
    elapsedTime: number;
    executions: number;
    runners: BulletPatternRunner[];
}

export interface BulletConfig {
    simulationFps: number;
}

export interface BulletSpriteConfig {
    x: number;
    y: number;
    width: number;
    height: number;
}