import { boss } from "../main.js";
import { allBullets, Bullet } from "../gameElements/bullet.js";
import { FPS } from "../settings/gameSettings.js";
import { sounds } from "../sound/sound.js";

export const ninabil = {
    "name": "Ninja Boy",
    "spriteUrl": "./img/nabil/nabil.png",

    // C H A L L E N G E R
    "challenger": {

        // V I S U A L S
        "sprites": {
            "idle": {
                "urls": [
                    "./img/nabil/nabil.png",
                    "./img/nabil/nabil2.png",
                    "./img/nabil/nabil3.png",
                    "./img/nabil/nabil4.png",
                ],
                "framerate": 50,
            },
            "left": {
                "urls": [
                    "./img/nabil/nabil.png"
                ],
                "framerate": 20,
            },
            "right": {
                "urls": [
                    "./img/nabil/nabil.png"
                ],
                "framerate": 20,
            }
        },
        "spriteScaling": 30,
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
                    "./img/nabil/nabil.png"
                ],
                "framerate": 20,
            },
            "left": {
                "urls": [
                    "./img/nabil/nabil.png"
                ],
                "framerate": 20,
            },
            "right": {
                "urls": [
                    "./img/nabil/nabil.png"
                ],
                "framerate": 20,
            }
        },
        "spriteScaling": 30,
        "healthBarSpriteUrl": "./img/nabil/nabil.png",
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
                    if (this.fancyStuff) {
                        let bulletAmount = 70;
                        let lifetime = 10
                        for (let i = 0; i < bulletAmount; i++) {
                            let attributes = [i, bulletAmount, 0, lifetime * FPS]
                            let bullet = new Bullet(boss.x, boss.y, null, BULLET_ORIGIN.BOSS, null, trajectory1, lifetime, attributes);
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
                        let currentBulletID = this.attributes[0];
                        let totalBullets = this.attributes[1];
                        let shiftMovement = this.attributes[2] / this.attributes[3];
                        let x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        let y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        this.attributes[2]++;
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
                            let attributes = [i, bulletAmount, 0, lifetime * FPS]
                            let bullet = new Bullet(boss.x, boss.y, null, BULLET_ORIGIN.BOSS, null, trajectory1, lifetime, attributes);
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
                        let currentBulletID = this.attributes[0];
                        let totalBullets = this.attributes[1];
                        let shiftMovement = this.attributes[2] / this.attributes[3];
                        let x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        let y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        this.attributes[2]++;
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
                            let attributes = [i, bulletAmount, 0, lifetime * FPS]
                            let bullet = new Bullet(boss.x, boss.y, null, BULLET_ORIGIN.BOSS, null, trajectory1, lifetime, attributes);
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
                        let currentBulletID = this.attributes[0];
                        let totalBullets = this.attributes[1];
                        let shiftMovement = this.attributes[2] / this.attributes[3];
                        let x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        let y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                        this.attributes[2]++;
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
                let bulletAmount = 80;
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
                        attributes = [i, bulletAmount, angle, lastVertex, 1, 0, amplitude, 0],
                        bullet = new Bullet(x, y, null, BULLET_ORIGIN.BOSS, null, trajectory, lifetime, attributes);
                    allBullets.push(bullet);
                }

                // console.log("==================================")
                function trajectory() {
                    let angle = this.attributes[2],
                        lastVertex = this.attributes[3],
                        stretchFactor = (Math.cos(angle - lastVertex) * Math.sqrt(Math.sin(lastVertex) ** 2 + Math.cos(lastVertex) ** 2)),
                        x = 0,
                        y = 0;

                    if (this.framesAlive <= 180) {

                        let shiftAngle = 1 * Math.PI / 180;
                        this.attributes[2] += shiftAngle;
                        this.attributes[3] += shiftAngle;
                        this.attributes[4] += 0.25;
                        x = (this.attributes[4] * Math.sin(angle) / stretchFactor + boss.x) - this.x + boss.xSpeedNormalized;
                        y = (this.attributes[4] * Math.cos(angle) / stretchFactor + boss.y) - this.y + boss.ySpeedNormalized;
                        this.attributes[5] = Math.sqrt((this.x - boss.x) ** 2 + (this.y - boss.y) ** 2);

                    } else if (this.framesAlive >= 180 && this.framesAlive <= 420) {

                        let i = this.attributes[0];
                        let bulletAmount = this.attributes[1];

                        if (i % (bulletAmount / 5) >= (bulletAmount / 5) / 2) {
                            this.attributes[6] = amplitude / (bulletAmount / 5) * (i % (bulletAmount / 5) / 2)
                        } else {
                            this.attributes[6] = amplitude / (bulletAmount / 5) * (((bulletAmount / 5) / 2) - (i % (bulletAmount / 5) / 2))
                        }

                        x = Math.sin(angle) / stretchFactor * this.attributes[6];
                        y = Math.cos(angle) / stretchFactor * this.attributes[6];

                    } else {
                        // if (this.attributes[7] <= 5) {
                        //     this.attributes[7] += 0.005;
                        // }

                        x = (Math.sin(angle) / stretchFactor);
                        y = (Math.cos(angle) / stretchFactor) + this.attributes[7];

                        if (y >= 2) {
                            y = 2;
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
                let bulletAmount = 50;
                let lifetime = 10
                for (let i = 0; i < bulletAmount; i++) {
                    let attributes = [i, bulletAmount, 0, lifetime * FPS]
                    let bullet = new Bullet(boss.x, boss.y, null, BULLET_ORIGIN.BOSS, null, trajectory, lifetime, attributes);
                    allBullets.push(bullet);
                }

                function trajectory() {
                    let currentBulletID = this.attributes[0];
                    let totalBullets = this.attributes[1];
                    let shiftMovement = this.attributes[2] / this.attributes[3];
                    let x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                    let y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                    this.attributes[2]++;
                    return [x, y];
                }
            },
            "bulletVisuals": {
                "radius": 7,
                "color": "white"
            },
            "frequency": 0.2, //in seconds

            "abilityName": "Passive",
            "description": "This is a description for a Passive Ability.",
            "iconUrl": "img/passive.png",
        },
        "enrage": {
            "use": function () {
                sounds["bossShotSound"].play();
                let bulletAmount = 80;
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
                        attributes = [i, bulletAmount, angle, lastVertex, 1, 0, amplitude, 0],
                        bullet = new Bullet(x, y, null, BULLET_ORIGIN.BOSS, null, trajectory, lifetime, attributes);
                    allBullets.push(bullet);
                }

                // console.log("==================================")
                function trajectory() {
                    let angle = this.attributes[2],
                        lastVertex = this.attributes[3],
                        stretchFactor = (Math.cos(angle - lastVertex) * Math.sqrt(Math.sin(lastVertex) ** 2 + Math.cos(lastVertex) ** 2)),
                        x = 0,
                        y = 0;

                    if (this.framesAlive <= 180) {

                        let shiftAngle = 1 * Math.PI / 180;
                        this.attributes[2] += shiftAngle;
                        this.attributes[3] += shiftAngle;
                        this.attributes[4] += 0.25;
                        x = (this.attributes[4] * Math.sin(angle) / stretchFactor + boss.x) - this.x + boss.xSpeedNormalized;
                        y = (this.attributes[4] * Math.cos(angle) / stretchFactor + boss.y) - this.y + boss.ySpeedNormalized;
                        this.attributes[5] = Math.sqrt((this.x - boss.x) ** 2 + (this.y - boss.y) ** 2);

                    } else if (this.framesAlive >= 180 && this.framesAlive <= 300) {

                        let i = this.attributes[0];
                        let bulletAmount = this.attributes[1];

                        if (i % (bulletAmount / 5) >= (bulletAmount / 5) / 2) {
                            this.attributes[6] = amplitude / (bulletAmount / 5) * (i % (bulletAmount / 5) / 2)
                        } else {
                            this.attributes[6] = amplitude / (bulletAmount / 5) * (((bulletAmount / 5) / 2) - (i % (bulletAmount / 5) / 2))
                        }

                        x = Math.sin(angle) / stretchFactor * this.attributes[6];
                        y = Math.cos(angle) / stretchFactor * this.attributes[6];

                    } else {
                        if (this.attributes[7] <= 5) {
                            this.attributes[7] += 0.008;
                        }

                        x = (Math.sin(angle) / stretchFactor);
                        y = (Math.cos(angle) / stretchFactor) + this.attributes[7];

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
            "frequency": 0.1, //in seconds

            "abilityName": "Passive",
            "description": "This is a description for a Passive Ability.",
            "iconUrl": "img/passive.png",
        },
    }
};