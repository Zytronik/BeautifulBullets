export const CHALLENGER_SPRITE = {
    url: "./img/challenger.png",
    radius: "30",
};

export const BOSS_SPRITE = {
    url: "./img/boss.png",
    radius: "50",
};

export const BULLET_SHAPE = {
    CIRCLE: "circle",
    RECTANGLE: "rectangle",
}

export let BULLET_SPRITESHEET = new Image();
BULLET_SPRITESHEET.src = "./img/bullets.png";

export const BULLET_SPRITES = {
    "testBullet": {
        "x": 6,
        "y": 466,
        "sizeX": 62,
        "sizeY": 62,
        "shape": BULLET_SHAPE.CIRCLE,
    },
    "testBullet2": {
        "x": 123,
        "y": 456,
        "sizeX": 200,
        "sizeY": 200,
        "shape": BULLET_SHAPE.CIRCLE,
    },
};