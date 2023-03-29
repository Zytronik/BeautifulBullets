import { MATCH_DECIDING_FACTORS } from "../data/match.js";

export const FPS = 60;
export const BOARD_WIDTH = 666;
export const BOARD_HEIGHT = 1000;
export const GRACE_RANGE = 9 ** 2;
export const CHALLENGER_I_FRAMES = 10;

export const DEFAULT_MATCH_SETTINGS = {
    timeLimitInFrames: 120 * FPS,
    firstTo: 1,
    matchDecider: MATCH_DECIDING_FACTORS.DAMAGE_DEALT,
}