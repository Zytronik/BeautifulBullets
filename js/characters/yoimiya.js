import { challenger, boss, bulletTexture } from "../main.js";
import { allBullets, Bullet } from "../gameElements/bullet.js";
import { BOARD_HEIGHT, BOARD_WIDTH, FPS } from "../settings/gameSettings.js";
import { convertMouseCoordinatesToCanvasCoordinates } from "../view/canvas.js";
import { sounds } from "../sound/sound.js";
import { EXAMPLE_BULLET_PROPERTIES } from "../data/bulletPresets.js";

export const yoimiya = {
    "name": "Yoimiya Naganohara",
    "spriteUrl": "./img/yoimiya/portrait.png",

    // C H A L L E N G E R
    "challenger": {

        // V I S U A L S
        "sprites": {
            "idle": {
                "urls": [
                    "./img/yoimiya/challenger.png"
                ],
                "framerate": 20,
            },
            "left": {
                "urls": [
                    "./img/yoimiya/challenger_left.png"
                ],
                "framerate": 20,
            },
            "right": {
                "urls": [
                    "./img/yoimiya/challenger_right.png"
                ],
                "framerate": 20,
            }
        },
        "spriteScaling": 110,
        "radius": 8,
        "hitboxColor": "black",
        "bulletVisuals": {
            "radius": 5,
            "color": "blue"
        },

        // S T A T S 
        "stats": {
            "health": 3,
            "homing": 1.1,
            "fireRate": 12, // Bullets per Second
            "bulletDamage": 4.1,
            "moveSpeed": 9,
        },
        "shiftSpeed": 1.2,
        "bulletSpeed": 1.3,

        // S P E C I A L
        "special": {
            "use": function () {
                challenger.bullets = 4;
            },
            "deactivate": function () {
                challenger.bullets = 1;
            },
            "chargeRequired": 25,
            "graceChargeSpeed": 30, // Charge per second in grace
            "passiveChargeSpeed": 2, // Charge per second
            "duration": 3,
            "coolDown": 1, // cooldown after duration in seconds

            "abilityName": "Machine Gun Bow",
            "description": "Shoots more Bullets at once for a limited Time.",
            "iconUrl": "img/yoimiya/Machine_Gun_Bow.png",
        },
    },

    // B O S S
    "boss": {
        // V I S U A L S
        "sprites": {
            "idle": {
                "urls": [
                    "./img/yoimiya/boss.png"
                ],
                "framerate": 20,
            },
            "left": {
                "urls": [
                    "./img/yoimiya/boss_left.png"
                ],
                "framerate": 20,
            },
            "right": {
                "urls": [
                    "./img/yoimiya/boss_right.png"
                ],
                "framerate": 20,
            }
        },
        "spriteScaling": 110,
        "healthBarSpriteUrl": "./img/yoimiya/portrait.png",
        "healthBarName": "Yoimiya Naganohara",

        // S T A T S 
        "stats": {
            "radius": 10,
            "moveSpeed": 6,
            "maxHealth": 4000,
        },

        // A B I L I T I E S
        "abilities": {
            "ability1": {
                "use": function () {
                    if (!this.secondCast) {
                        let bulletAmount = 30,
                            lifetime = 20,
                            random1 = Math.random();
                        for (let i = 0; i < bulletAmount; i++) {
                            let attributes = [i, bulletAmount, random1, 0, Math.random() * 15 + 1, bulletAmount],
                                customBulletVisuals = { radius: 10, color: "yellow" },
                                bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectoryBeforeSecondCast, attributes, lifetime);
                            this.mybullets.push(bullet);
                            allBullets.push(bullet);
                        }
                        for (let i = 0; i < Math.round(bulletAmount / 1.5); i++) {
                            let attributes = [i, Math.round(bulletAmount / 1.5), random1, 0, Math.random() * 15 + 1, bulletAmount],
                                customBulletVisuals = { radius: 10, color: "yellow" },
                                bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectoryBeforeSecondCast, attributes, lifetime);
                            this.mybullets.push(bullet);
                            allBullets.push(bullet);
                        }

                        this.secondCast = !this.secondCast;
                    }
                    else if (this.secondCast) {
                        this.mybullets.forEach(bullet => {
                            bullet.trajectoryFunction = trajectoryAfterSecondCast;
                            bullet.radius = 4;
                            bullet.color = "rgb(" + (Math.random() * 100 + 155) + ", 0, 0)";
                        })
                        this.secondCast = !this.secondCast;
                        this.mybullets = []
                    }

                    function trajectoryBeforeSecondCast() {
                        let randomNumber1 = this.trajectoryAttributes[2],
                            x = randomNumber1 * 5 - 2.5,
                            y = 1;
                        return [x, y];
                    }

                    function trajectoryAfterSecondCast() {
                        let x = 0,
                            y = 0,
                            bulletNumber = this.trajectoryAttributes[0],
                            bulletAmount1 = this.trajectoryAttributes[1],
                            accelerator = this.trajectoryAttributes[3],
                            randomNumber2 = this.trajectoryAttributes[4],
                            bulletAmount2 = this.trajectoryAttributes[5];

                        if (bulletAmount1 == bulletAmount2) {
                            x = Math.sin((2 * Math.PI) / bulletAmount1 * bulletNumber) * randomNumber2,
                                y = Math.cos((2 * Math.PI) / bulletAmount1 * bulletNumber) * randomNumber2 + accelerator;
                        } else {
                            x = Math.sin((2 * Math.PI) / bulletAmount1 * bulletNumber) * randomNumber2 * 0.5,
                                y = Math.cos((2 * Math.PI) / bulletAmount1 * bulletNumber) * randomNumber2 * 0.5 + accelerator;
                        }
                        if (y >= 2) {
                            y = 2;
                        }
                        if (accelerator <= 5) {
                            this.trajectoryAttributes[3] += 0.01;
                        }
                        this.trajectoryAttributes[4] = randomNumber2 ** 0.96;
                        return [x, y];
                    }
                },
                "deactivate": function () {

                },
                "bulletVisuals": {
                    "radius": 4,
                    "color": "white"
                },
                "coolDown": 1, //in seconds
                "duration": 0, //in seconds
                "abilityName": "Fireworks",
                "description": "One Bullet explodes into a lot of Bullets, what did you expect?",
                "iconUrl": "img/yoimiya/Firework.png",

                //optional attributes for ability
                "secondCast": false,
                "mybullets": [],
            },
            "ability2": {
                "use": function () {
                    let bulletAmount = 8,
                        lifetime = 20;
                    for (let i = 0; i < bulletAmount; i++) {
                        let attributes = [i, bulletAmount, 0, lifetime, boss.x, boss.y,],
                            x = boss.x + Math.sin(Math.PI * 2 / bulletAmount * i) * 100,
                            y = boss.y + Math.cos(Math.PI * 2 / bulletAmount * i) * 100,
                            bullet = new Bullet(x, y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, attributes, lifetime);
                        this.mybullets.push(bullet)
                        allBullets.push(bullet);
                    }

                    function trajectory() {
                        let x = 0,
                            y = 1,
                            bulletNumber = this.trajectoryAttributes[0],
                            bulletAmount = this.trajectoryAttributes[1],
                            shiftCounter = this.trajectoryAttributes[2],
                            lifetime = this.trajectoryAttributes[3],
                            bossX = this.trajectoryAttributes[4],
                            bossY = this.trajectoryAttributes[5],
                            shiftMovement = shiftCounter / lifetime;

                        if (this.framesAlive <= 60) {
                            x = Math.sin(Math.PI * 2 / bulletAmount * bulletNumber + Math.PI) + boss.xSpeedNormalized;
                            y = Math.cos(Math.PI * 2 / bulletAmount * bulletNumber + Math.PI) + boss.ySpeedNormalized;
                            let lengthX = convertMouseCoordinatesToCanvasCoordinates()[0] - boss.x,
                                lengthY = convertMouseCoordinatesToCanvasCoordinates()[1] - boss.y,
                                length = Math.sqrt(lengthX ** 2 + lengthY ** 2);
                            this.trajectoryAttributes[4] = lengthX / length;
                            this.trajectoryAttributes[5] = lengthY / length;
                        } else {
                            x = Math.sin(Math.PI * 2 / bulletAmount * bulletNumber + shiftMovement + Math.PI / 2) + bossX * 3;
                            y = Math.cos(Math.PI * 2 / bulletAmount * bulletNumber + shiftMovement + Math.PI / 2) + bossY * 3;
                            this.trajectoryAttributes[2] += 0.6;
                        }
                        return [x, y];
                    }
                },
                "deactivate": function () {

                },
                "bulletVisuals": {
                    "radius": 5,
                    "color": "red"
                },
                "coolDown": 0.5, //in seconds
                "duration": 0, //in seconds
                "abilityName": "Blazing Chakram",
                "description": "An aimed shot of bullets with the form of a spinning Chakram",
                "iconUrl": "img/yoimiya/Blazing_Chakram.svg",

                //optional attributes for ability
                "mybullets": [],
            },
            "ability3": {
                "use": function () {
                    let coords = convertMouseCoordinatesToCanvasCoordinates();
                    if (!this.hasDuration) {
                        if (!this.secondCast) {
                            let x = coords[0],
                                y = coords[1];
                            if (x < 0) {
                                coords[0] = 0;
                            } else if (x > BOARD_WIDTH) {
                                coords[0] = BOARD_WIDTH;
                            }
                            if (y < 0) {
                                coords[1] = 0;
                            } else if (y > boss.yBarrier) {
                                coords[1] = boss.yBarrier;
                            }
                            this.secondCast = true;

                        } else {
                            let x = coords[0],
                                y = coords[1];
                            if (x < 0) {
                                coords[0] = 0;
                            } else if (x > BOARD_WIDTH) {
                                coords[0] = BOARD_WIDTH;
                            }
                            if (y < 0) {
                                coords[1] = 0;
                            } else if (y > BOARD_HEIGHT) {
                                coords[1] = BOARD_HEIGHT;
                            }
                            this.secondCast = false;
                            this.hasDuration = true;
                            this.originalBossCoords.push(boss.x, boss.y);
                        }
                        this.path.push(coords);
                    } else {
                        let firstSegment = 1 * FPS, // in seconds
                            thirdSegment = 1.5 * FPS, // in seconds
                            secondSegment = boss.ability3Duration - firstSegment - thirdSegment, // rest of duration
                            firstMouseX = this.path[0][0],
                            firstMouseY = this.path[0][1],
                            secondMouseX = this.path[1][0],
                            secondMouseY = this.path[1][1],
                            bossOriginalX = this.originalBossCoords[0],
                            bossOriginalY = this.originalBossCoords[1];
                        boss.canBeControlled = false;

                        if (boss.ability3ActiveFor <= firstSegment) {

                            let x = (firstMouseX - bossOriginalX) / firstSegment,
                                y = (firstMouseY - bossOriginalY) / firstSegment;
                            boss.x += x;
                            boss.y += y;
                            boss.xSpeedNormalized = x;
                            boss.ySpeedNormalized = y;

                        } else if (boss.ability3ActiveFor >= firstSegment && boss.ability3ActiveFor <= secondSegment + firstSegment) {

                            let x = (secondMouseX - firstMouseX) / secondSegment,
                                y = (secondMouseY - firstMouseY) / secondSegment;
                            boss.x += x;
                            boss.y += y;
                            boss.xSpeedNormalized = x;
                            boss.ySpeedNormalized = y;

                            if (Math.random() <= 0.15) {
                                let angle = Math.atan2((secondMouseY - firstMouseY), (secondMouseX - firstMouseX));
                                for (let i = 0; i <= 1; i++) {
                                    let lifetime = 15,
                                        length = Math.sqrt((secondMouseX - firstMouseX) ** 2 + (secondMouseY - firstMouseY) ** 2),
                                        random = Math.random() * 1 + 0.5,
                                        attributes = [i, firstMouseX, firstMouseY, secondMouseX, secondMouseY, length, angle, random, 0],
                                        bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, attributes, lifetime);
                                    allBullets.push(bullet);
                                }
                            }
                        } else if (boss.ability3ActiveFor >= secondSegment + firstSegment && boss.ability3ActiveFor <= boss.ability3Duration) {

                            let x = (bossOriginalX - secondMouseX) / thirdSegment,
                                y = (bossOriginalY - secondMouseY) / thirdSegment;
                            boss.x += x;
                            boss.y += y;
                            boss.xSpeedNormalized = x;
                            boss.ySpeedNormalized = y;
                        }
                    }

                    function trajectory() {
                        let bulletNumber = this.trajectoryAttributes[0],
                            firstMouseX = this.trajectoryAttributes[1],
                            firstMouseY = this.trajectoryAttributes[2],
                            secondMouseX = this.trajectoryAttributes[3],
                            secondMouseY = this.trajectoryAttributes[4],
                            length = this.trajectoryAttributes[5],
                            angle = this.trajectoryAttributes[6],
                            random = this.trajectoryAttributes[7],
                            accelerator = this.trajectoryAttributes[8],
                            multiplier = 2,
                            divider = 4,
                            x = 0,
                            y = 0;
                        if (angle >= Math.PI / 2 || (angle >= -Math.PI / 2 && angle <= 0)) {
                            // /v /^
                            if (bulletNumber % 2 == 1) {
                                y = -(secondMouseX - firstMouseX) / length * multiplier * random + accelerator,
                                    x = (secondMouseY - firstMouseY) / length * multiplier * random / divider;
                            } else {
                                y = (secondMouseX - firstMouseX) / length * multiplier * random + accelerator,
                                    x = -(secondMouseY - firstMouseY) / length * multiplier * random / divider;
                            }
                        } else {
                            // \v \^
                            if (bulletNumber % 2 == 1) {
                                y = (secondMouseX - firstMouseX) / length * multiplier * random + accelerator,
                                    x = -(secondMouseY - firstMouseY) / length * multiplier * random / divider;
                            } else {
                                y = -(secondMouseX - firstMouseX) / length * multiplier * random + accelerator,
                                    x = (secondMouseY - firstMouseY) / length * multiplier * random / divider;
                            }
                        }

                        if (accelerator <= 5) {
                            this.trajectoryAttributes[8] += 0.006;
                        }

                        let maxSpeed = 3;
                        if (y >= maxSpeed) {
                            y = maxSpeed;
                        }
                        return [x, y];
                    }
                },
                "deactivate": function () {
                    if (this.secondCast) {
                        let cd = 0.5, // in seconds
                            duration = 8 // in seconds
                        boss.ability3CoolDownRequired = cd * FPS;
                        boss.ability3Duration = duration * FPS + 1;
                    } else {
                        this.path = [];
                        this.originalBossCoords = [];
                        this.hasDuration = false;
                        boss.ability3CoolDownRequired = this.coolDown * FPS;
                        boss.ability3Duration = 0;
                        boss.canBeControlled = true;
                    }
                },
                "bulletVisuals": {
                    "radius": 5,
                    "color": "red"
                },
                "coolDown": 5, //in seconds
                "duration": 0, //in seconds
                "abilityName": "Path of Destruction",
                "description": "Mark two points in your playfield and watch your enemies stumble",
                "iconUrl": "img/yoimiya/Path_of_Destruction.png",

                //optional attributes for ability
                "secondCast": false,
                "hasDuration": false,
                "path": [],
                "originalBossCoords": [],
            },
        },
        "passive": {
            "use": function () {
                let bulletAmount = 40,
                    lifetime = 20,
                    bool = false;
                sounds["bossShotSound"].play();
                for (let i = 0; i < bulletAmount; i++) {
                    let spawnBulletX = boss.x + Math.sin(Math.PI * 2 / bulletAmount * i) * 100,
                        spawnBulletY = boss.y + Math.cos(Math.PI * 2 / bulletAmount * i) * 100,
                        attributes = [i, bulletAmount, 0, lifetime, bool, boss.x, boss.y, spawnBulletX, spawnBulletY, 0],
                        bullet = new Bullet(spawnBulletX, spawnBulletY, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, attributes, lifetime);
                    allBullets.push(bullet);
                }

                function trajectory() {
                    let currentBulletID = this.trajectoryAttributes[0],
                        totalBullets = this.trajectoryAttributes[1],
                        shiftCounter = this.trajectoryAttributes[2],
                        lifetime = this.trajectoryAttributes[3],
                        bool = this.trajectoryAttributes[4],
                        bossX = this.trajectoryAttributes[5],
                        bossY = this.trajectoryAttributes[6],
                        bulletPosX = this.trajectoryAttributes[7],
                        bulletPosY = this.trajectoryAttributes[8],
                        accelerator = this.trajectoryAttributes[9],
                        shiftMovement = shiftCounter / lifetime,
                        x = 0,
                        y = 0;

                    if (Math.random() <= 0.997 && bool == false) {
                        x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement + Math.PI / 2) * 2 + boss.xSpeedNormalized;
                        y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement + Math.PI / 2) * 2 + boss.ySpeedNormalized;
                        this.trajectoryAttributes[7] = this.logicX;
                        this.trajectoryAttributes[8] = this.logicY;
                        this.trajectoryAttributes[2] += 0.4;
                    } else {
                        x = Math.cos(Math.atan2(bossY - bulletPosY, bossX - bulletPosX) + Math.PI);
                        if (y >= 1.5) {
                            y = 1.5;
                        } else {
                            y = Math.sin(Math.atan2(bossY - bulletPosY, bossX - bulletPosX) + Math.PI) * 2 + accelerator;
                        }
                        this.trajectoryAttributes[4] = true;
                        if (accelerator <= 6) {
                            this.trajectoryAttributes[9] += 0.03
                        }
                    }
                    return [x, y];
                }
            },
            "bulletVisuals": {
                "radius": 5,
                "color": "orange"
            },
            "frequency": 2, //in seconds

            "abilityName": "Catherine Wheel (Passive)",
            "description": "Around your Boss-Character spawns a halo of bullets that occasionally sprinkle outwards and fall down",
            "iconUrl": "img/yoimiya/Catherine_Wheel_Passive.png",
        },
        "enrage": {
            "use": function () {
                let bulletAmount = 75,
                    lifetime = 20,
                    bool = false;

                for (let i = 0; i < bulletAmount; i++) {
                    let spawnBulletX = boss.x + Math.sin(Math.PI * 2 / bulletAmount * i) * 100,
                        spawnBulletY = boss.y + Math.cos(Math.PI * 2 / bulletAmount * i) * 100,
                        attributes = [i, bulletAmount, 0, lifetime, bool, boss.x, boss.y, spawnBulletX, spawnBulletY, 0],
                        bullet = new Bullet(spawnBulletX, spawnBulletY, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, attributes, lifetime);
                    allBullets.push(bullet);
                }

                function trajectory() {
                    let currentBulletID = this.trajectoryAttributes[0],
                        totalBullets = this.trajectoryAttributes[1],
                        shiftCounter = this.trajectoryAttributes[2],
                        lifetime = this.trajectoryAttributes[3],
                        bool = this.trajectoryAttributes[4],
                        bossX = this.trajectoryAttributes[5],
                        bossY = this.trajectoryAttributes[6],
                        bulletPosX = this.trajectoryAttributes[7],
                        bulletPosY = this.trajectoryAttributes[8],
                        accelerator = this.trajectoryAttributes[9],
                        shiftMovement = shiftCounter / lifetime,
                        x = 0,
                        y = 0;

                    if (Math.random() <= 0.995 && bool == false) {
                        x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement + Math.PI / 2) * 2 + boss.xSpeedNormalized;
                        y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement + Math.PI / 2) * 2 + boss.ySpeedNormalized;
                        this.trajectoryAttributes[7] = this.logicX;
                        this.trajectoryAttributes[8] = this.logicY;
                        this.trajectoryAttributes[2] += 0.4;
                    } else {
                        x = Math.cos(Math.atan2(bossY - bulletPosY, bossX - bulletPosX) + Math.PI);
                        if (y >= 1.5) {
                            y = 1.5;
                        } else {
                            y = Math.sin(Math.atan2(bossY - bulletPosY, bossX - bulletPosX) + Math.PI) * 2 + accelerator;
                        }
                        this.trajectoryAttributes[4] = true;
                        if (accelerator <= 6) {
                            this.trajectoryAttributes[9] += 0.03
                        }
                    }
                    return [x, y];
                }
            },
            "bulletVisuals": {
                "radius": 10,
                "color": "red"
            },
            "frequency": 0.3, //trigger once every [] seconds

            "abilityName": "Catherine Wheel (Passive)",
            "description": "Around your Boss-Character spawns a halo of bullets that occasionally sprinkle outwards and fall down",
            "iconUrl": "img/yoimiya/Catherine_Wheel_Passive.png",
        },
    }
}