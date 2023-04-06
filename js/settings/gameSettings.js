import { MATCH_DECIDING_FACTORS } from "../gameElements/match.js";

export const FPS = 60;
export const BOARD_WIDTH = 666;
export const BOARD_HEIGHT = 1000;
export const GRACE_RANGE_SQUARED = Math.pow(10,2);
export const CHALLENGER_I_FRAMES = 60;
export const BULLET_SPAWN_PROTECTION_FRAMES = 60;

export const DEFAULT_MATCH_SETTINGS = {
    timeLimitInFrames: 120 * FPS,
    firstTo: 1,
    matchDecider: MATCH_DECIDING_FACTORS.DAMAGE_DEALT,
}