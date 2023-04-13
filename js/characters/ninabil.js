import { boss, bulletTexture } from "../main.js";
import { allBullets, Bullet } from "../gameElements/bullet.js";
import { FPS } from "../settings/gameSettings.js";
import { sounds } from "../sound/sound.js";
import { EXAMPLE_BULLET_PROPERTIES } from "../data/bulletPresets.js";
import { convertMouseCoordinatesToCanvasCoordinates } from "../view/canvas.js";

export const ninabil = {
    "name": "Ninja Boy",
    "spriteUrl": "./img/ninabil/portrait.png",

    // C H A L L E N G E R
    "challenger": {

        // V I S U A L S
        "sprites": {
            "idle": {
                "urls": [
                    "./img/ninabil/challenger.png",
                ],
                "framerate": 50,
            },
            "left": {
                "urls": [
                    "./img/ninabil/challenger_left.png"
                ],
                "framerate": 20,
            },
            "right": {
                "urls": [
                    "./img/ninabil/challenger_right.png"
                ],
                "framerate": 20,
            }
        },
        "spriteScaling": 95,
        "radius": 5,
        "hitboxColor": "red",
        "bulletVisuals": {
            "radius": 5,
            "color": "white"
        },

        // S T A T S 
        "stats": {
            "health": 2,
            "homing": 1.3,
            "fireRate": 12, // Bullets per Second
            "bulletDamage": 2.8,
            "moveSpeed": 8,
        },
        "bulletSpeed": 1,
        "shiftSpeed": 1,

        // S P E C I A L
        "special": {
            "use": function () {
                allBullets.length = 0;
            },
            "deactivate": function () {

            },
            "chargeRequired": 50,
            "graceChargeSpeed": 30, // Charge per second in grace
            "passiveChargeSpeed": 2, // Charge per second
            "duration": 0,
            "coolDown": 1,

            "abilityName": "Blankbomb",
            "description": "Destroys all bullets on the screen.",
            "iconUrl": "img/special.png",
        },
    },

    // B O S S
    "boss": {
        // V I S U A L S
        "sprites": {
            "idle": {
                "urls": [
                    "./img/ninabil/boss.png"
                ],
                "framerate": 20,
            },
            "left": {
                "urls": [
                    "./img/ninabil/boss_left.png"
                ],
                "framerate": 20,
            },
            "right": {
                "urls": [
                    "./img/ninabil/boss_right.png"
                ],
                "framerate": 20,
            }
        },
        "spriteScaling": 110,
        "healthBarSpriteUrl": "./img/ninabil/portrait.png",
        "healthBarName": "Nabil",

        // S T A T S 
        "stats": {
            "radius": 70,
            "moveSpeed": 3,
            "maxHealth": 1000,
        },

        // A B I L I T I E S
        "abilities": {
            "ability1": {
                "use": function () {
                    let bulletAmount = 2;
                    let lifetime = 6;
                    let mouseCoords = convertMouseCoordinatesToCanvasCoordinates();
                    let amplitude = 0.001 * Math.sqrt((boss.x - mouseCoords[0]) ** 2 + (boss.y - mouseCoords[1]) ** 2) + 0.75;
                    let length = Math.sqrt((boss.x - mouseCoords[0]) ** 2 + (boss.y - mouseCoords[1]) ** 2) / 5;
                    for (let i = 0; i < bulletAmount; i++) {
                        let trajectoryAttributes = [i, mouseCoords[0], mouseCoords[1], amplitude, boss.x, boss.y, length, 0, 0]
                        let bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, trajectoryAttributes, lifetime);
                        allBullets.push(bullet);
                    }

                    function trajectory() {
                        let bulletID = this.trajectoryAttributes[0];
                        let lengthX = this.trajectoryAttributes[1] - this.trajectoryAttributes[4];
                        let lengthY = this.trajectoryAttributes[2] - this.trajectoryAttributes[5];
                        let length = this.trajectoryAttributes[6];
                        let amplitude = this.trajectoryAttributes[3];
                        let angle = Math.PI / 2 +  Math.atan2(lengthY, lengthX);
                        let x = 0;
                        let y = 0;
                        let stretchFactor = amplitude * Math.cos(Math.PI / length * this.framesAlive);
                        let mouseX = this.trajectoryAttributes[1];
                        let mouseY = this.trajectoryAttributes[2];

                        if (bulletID % 2 == 0) {
                            x = stretchFactor * Math.cos(angle) + lengthX / length;
                            y = stretchFactor * Math.sin(angle) + lengthY / length;
                        } else {
                            x = -stretchFactor * Math.cos(angle) + lengthX / length;
                            y = -stretchFactor * Math.sin(angle) + lengthY / length;
                        }

                        if (mouseX - 10 <= this.logicX && mouseX + 10 >= this.logicX && mouseY - 10 <= this.logicY && mouseY + 10 >= this.logicY && !this.arrived) {
                            this.arrived = true;
                            this.trajectoryFunction = trajectory2;
                            this.trajectoryAttributes[7] = x;
                            this.trajectoryAttributes[8] = y;
                        }
                        return [x, y];
                    }
                    
                    function trajectory2() {
                        return[this.trajectoryAttributes[7], this.trajectoryAttributes[8]];
                    }
                },
                "deactivate": function () {

                },
                "bulletVisuals": {
                    "radius": 4,
                    "color": "white"
                },
                "coolDown": 2, //in seconds
                "duration": 0, //in seconds
                "arrived": false,

                "abilityName": "Ability 1",
                "description": "This is a description DEAL WITH IT",
                "iconUrl": "img/bg.png",
            },
            "ability2": {
                "use": function () {
                    if (this.fancyStuff) {
                        let bulletAmount = 70;
                        let lifetime = 10
                        for (let i = 0; i < bulletAmount; i++) {
                            let trajectoryAttributes = [i, bulletAmount, 0, lifetime * FPS]
                            let bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory1, trajectoryAttributes, lifetime);
                            this.mybullets.push(bullet)
                            allBullets.push(bullet);
                        }
                        this.fancyStuff = !this.fancyStuff;
                    }
                    else if (!this.fancyStuff) {
                        this.mybullets.forEach(bullet => {
                            bullet.trajectoryFunction = trajectory2;
                        })
                        this.fancyStuff = !this.fancyStuff;
                        this.mybullets = []
                    }

                    function trajectory1() {
                        let currentBulletID = this.trajectoryAttributes[0];
                        let totalBullets = this.trajectoryAttributes[1];
                        let shiftMovement = this.trajectoryAttributes[2] / this.trajectoryAttributes[3];
                        let x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        let y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        this.trajectoryAttributes[2]++;
                        return [x, y];
                    }

                    function trajectory2() {
                        return [0, 6];
                    }
                },
                "deactivate": function () {

                },
                "bulletVisuals": {
                    "radius": 4,
                    "color": "white"
                },
                "coolDown": 2, //in seconds
                "duration": 0, //in seconds
                "fancyStuff": true,
                "mybullets": [],

                "abilityName": "Ability 2",
                "description": "This is a description DEAL WITH IT",
                "iconUrl": "img/bg.png",
            },
            "ability3": {
                "use": function () {
                    if (this.fancyStuff) {
                        let bulletAmount = 70;
                        let lifetime = 10
                        for (let i = 0; i < bulletAmount; i++) {
                            let trajectoryAttributes = [i, bulletAmount, 0, lifetime * FPS]
                            let bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory1, trajectoryAttributes, lifetime);
                            this.mybullets.push(bullet)
                            allBullets.push(bullet);
                        }
                        this.fancyStuff = !this.fancyStuff;
                    }
                    else if (!this.fancyStuff) {
                        this.mybullets.forEach(bullet => {
                            bullet.trajectoryFunction = trajectory2;
                        })
                        this.fancyStuff = !this.fancyStuff;
                        this.mybullets = []
                    }

                    function trajectory1() {
                        let currentBulletID = this.trajectoryAttributes[0];
                        let totalBullets = this.trajectoryAttributes[1];
                        let shiftMovement = this.trajectoryAttributes[2] / this.trajectoryAttributes[3];
                        let x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        let y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        this.trajectoryAttributes[2]++;
                        return [x, y];
                    }

                    function trajectory2() {
                        return [0, 6];
                    }
                },
                "deactivate": function () {

                },
                "bulletVisuals": {
                    "radius": 4,
                    "color": "white"
                },
                "coolDown": 2, //in seconds
                "duration": 0, //in seconds
                "fancyStuff": true,
                "mybullets": [],

                "abilityName": "Ability 3",
                "description": "This is a description DEAL WITH IT",
                "iconUrl": "img/bg.png",
            },
        },
        "passive": {
            "use": function () {
                sounds["bossShotSound"].play();
                let bulletAmount = 65;
                let lifetime = 25;

                if ((bulletAmount % 5) != 0) {
                    bulletAmount += 5 - (bulletAmount % 5);
                }

                let distributor = bulletAmount / 5,
                    adder = -1,
                    amplitude = 2;

                for (let i = 0; i < bulletAmount; i++) {
                    let angle = i * 2 * Math.PI / bulletAmount;
                    if ((i % distributor) == 0 && i != bulletAmount) {
                        adder++;
                    }
                    let lastVertex = (36 + adder * 72) * Math.PI / 180,
                        stretchFactor = (Math.cos(angle - lastVertex) * Math.sqrt(Math.sin(lastVertex) ** 2 + Math.cos(lastVertex) ** 2)),
                        x = boss.x - Math.sin(angle) / stretchFactor,
                        y = boss.y - Math.cos(angle) / stretchFactor,
                        trajectoryAttributes = [i, bulletAmount, angle, lastVertex, 1, 0, amplitude, 0],
                        bullet = new Bullet(x, y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, trajectoryAttributes, lifetime);
                    allBullets.push(bullet);
                }

                function trajectory() {
                    let angle = this.trajectoryAttributes[2],
                        lastVertex = this.trajectoryAttributes[3],
                        stretchFactor = (Math.cos(angle - lastVertex) * Math.sqrt(Math.sin(lastVertex) ** 2 + Math.cos(lastVertex) ** 2)),
                        x = 0,
                        y = 0;

                    if (this.framesAlive <= 180) {

                        let shiftAngle = 1 * Math.PI / 180;
                        this.trajectoryAttributes[2] += shiftAngle;
                        this.trajectoryAttributes[3] += shiftAngle;
                        this.trajectoryAttributes[4] += 0.25;
                        x = (this.trajectoryAttributes[4] * Math.sin(angle) / stretchFactor + boss.x) - this.logicX + boss.xSpeedNormalized;
                        y = (this.trajectoryAttributes[4] * Math.cos(angle) / stretchFactor + boss.y) - this.logicY + boss.ySpeedNormalized;
                        this.trajectoryAttributes[5] = Math.sqrt((this.x - boss.x) ** 2 + (this.y - boss.y) ** 2);

                    } else if (this.framesAlive >= 180 && this.framesAlive <= 420) {

                        let i = this.trajectoryAttributes[0];
                        let bulletAmount = this.trajectoryAttributes[1];

                        if (i % (bulletAmount / 5) >= (bulletAmount / 5) / 2) {
                            this.trajectoryAttributes[6] = amplitude / (bulletAmount / 5) * (i % (bulletAmount / 5) / 2)
                        } else {
                            this.trajectoryAttributes[6] = amplitude / (bulletAmount / 5) * (((bulletAmount / 5) / 2) - (i % (bulletAmount / 5) / 2))
                        }

                        x = Math.sin(angle) / stretchFactor * this.trajectoryAttributes[6];
                        y = Math.cos(angle) / stretchFactor * this.trajectoryAttributes[6];

                    } else {

                        if (this.trajectoryAttributes[7] <= 5) {
                            this.trajectoryAttributes[7] += 0.001;
                        }

                        if (this.trajectoryAttributes[0] % 2 == 0) {
                            x = (Math.sin(angle + this.trajectoryAttributes[7]) / stretchFactor);
                            y = (Math.cos(angle + this.trajectoryAttributes[7]) / stretchFactor);
                        } else {
                            x = (Math.sin(angle - this.trajectoryAttributes[7]) / stretchFactor);
                            y = (Math.cos(angle - this.trajectoryAttributes[7]) / stretchFactor);
                        }

                    }
                    return [x, y];
                }
            },
            "bulletVisuals": {
                "radius": 7,
                "color": "white"
            },
            "frequency": 2, //in seconds

            "abilityName": "Passive",
            "description": "This is a description for a Passive Ability.",
            "iconUrl": "img/passive.png",
        },
        "enrage": {
            "use": function () {
                sounds["bossShotSound"].play();
                let bulletAmount = 90;
                let lifetime = 25;

                if ((bulletAmount % 5) != 0) {
                    bulletAmount += 5 - (bulletAmount % 5);
                }

                let distributor = bulletAmount / 5,
                    adder = -1,
                    amplitude = 2;

                for (let i = 0; i < bulletAmount; i++) {
                    let angle = i * 2 * Math.PI / bulletAmount;
                    if ((i % distributor) == 0 && i != bulletAmount) {
                        adder++;
                    }
                    let lastVertex = (36 + adder * 72) * Math.PI / 180,
                        stretchFactor = (Math.cos(angle - lastVertex) * Math.sqrt(Math.sin(lastVertex) ** 2 + Math.cos(lastVertex) ** 2)),
                        x = Math.sin(angle) / stretchFactor + boss.x,
                        y = Math.cos(angle) / stretchFactor + boss.y,
                        trajectoryAttributes = [i, bulletAmount, angle, lastVertex, 1, 0, amplitude, 0, 0],
                        bullet = new Bullet(x, y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, trajectoryAttributes, lifetime);
                    allBullets.push(bullet);
                }

                function trajectory() {
                    let angle = this.trajectoryAttributes[2],
                        lastVertex = this.trajectoryAttributes[3],
                        stretchFactor = (Math.cos(angle - lastVertex) * Math.sqrt(Math.sin(lastVertex) ** 2 + Math.cos(lastVertex) ** 2)),
                        x = 0,
                        y = 0;

                    if (this.framesAlive <= 180) {

                        let shiftAngle = 1 * Math.PI / 180;
                        this.trajectoryAttributes[2] += shiftAngle;
                        this.trajectoryAttributes[3] += shiftAngle;
                        this.trajectoryAttributes[4] += 0.25;
                        x = (this.trajectoryAttributes[4] * Math.sin(angle) / stretchFactor + boss.x) - this.logicX + boss.xSpeedNormalized;
                        y = (this.trajectoryAttributes[4] * Math.cos(angle) / stretchFactor + boss.y) - this.logicY + boss.ySpeedNormalized;
                        this.trajectoryAttributes[5] = Math.sqrt((this.x - boss.x) ** 2 + (this.y - boss.y) ** 2);

                    } else if (this.framesAlive >= 180 && this.framesAlive <= 300) {

                        let i = this.trajectoryAttributes[0];
                        let bulletAmount = this.trajectoryAttributes[1];

                        if (i % (bulletAmount / 5) >= (bulletAmount / 5) / 2) {
                            this.trajectoryAttributes[6] = amplitude / (bulletAmount / 5) * (i % (bulletAmount / 5) / 2)
                        } else {
                            this.trajectoryAttributes[6] = amplitude / (bulletAmount / 5) * (((bulletAmount / 5) / 2) - (i % (bulletAmount / 5) / 2))
                        }

                        x = Math.sin(angle) / stretchFactor * this.trajectoryAttributes[6];
                        y = Math.cos(angle) / stretchFactor * this.trajectoryAttributes[6];

                    } else {
                        if (this.trajectoryAttributes[8] <= 5) {
                            this.trajectoryAttributes[8] += 0.009;
                        }
                        if (this.trajectoryAttributes[7] <= 5) {
                            this.trajectoryAttributes[7] += 0.001;
                        }

                        if (this.trajectoryAttributes[0] % 2 == 0) {
                            x = (Math.sin(angle + this.trajectoryAttributes[7]) / stretchFactor);
                            y = (Math.cos(angle + this.trajectoryAttributes[7]) / stretchFactor) + this.trajectoryAttributes[8];
                        } else {
                            x = (Math.sin(angle - this.trajectoryAttributes[7]) / stretchFactor);
                            y = (Math.cos(angle - this.trajectoryAttributes[7]) / stretchFactor) + this.trajectoryAttributes[8];
                        }

                        if (y >= 2) {
                            y = 2;
                        }

                    }

                    return [x, y];
                }
            },
            "bulletVisuals": {
                "radius": 10,
                "color": "white"
            },
            "frequency": 1, //in seconds

            "abilityName": "Passive",
            "description": "This is a description for a Passive Ability.",
            "iconUrl": "img/passive.png",
        },
    }
};