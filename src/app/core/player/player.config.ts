import { PlayerConfig } from "../types/player.types";

export const PLAYER_CONFIG: PlayerConfig = {
    radiusRatio: 0.008,
    speed: 300,
    precisionSpeed: 100,
    heightRatio: 0.1,
    inputEnabled: true,
    health: 10,
} as const;