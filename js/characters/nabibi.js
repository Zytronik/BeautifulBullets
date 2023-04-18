import { boss, bulletTexture } from "../main.js";
import { allBullets, Bullet } from "../gameElements/bullet.js";
import { FPS } from "../settings/gameSettings.js";
import { sounds } from "../sound/sound.js";
import { EXAMPLE_BULLET_PROPERTIES } from "../data/bulletPresets.js";

export const nabibi = {
    "name": "Nabil de Tester",
    "spriteUrl": "./img/nabil.jpg",

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
                    "./img/nabil/nabil_left.png"
                ],
                "framerate": 20,
            },
            "right": {
                "urls": [
                    "./img/nabil/nabil_right.png"
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
            "health": -2,
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
                    "./img/nabil/nabil.png",
                    "./img/nabil/nabil2.png",
                    "./img/nabil/nabil3.png",
                    "./img/nabil/nabil4.png",
                ],
                "framerate": 50,
            },
            "left": {
                "urls": [
                    "./img/nabil/nabil_left.png"
                ],
                "framerate": 20,
            },
            "right": {
                "urls": [
                    "./img/nabil/nabil_right.png"
                ],
                "framerate": 20,
            }
        },
        "spriteScaling": 30,
        "healthBarSpriteUrl": "./img/nabil.jpg",
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
                            let bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory1, attributes, lifetime);
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
                            let bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory1, attributes, lifetime);
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
                            let attributes = [i, bulletAmount, 0, lifetime * FPS]
                            let bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory1, attributes, lifetime);
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
                let bulletAmount = 20;
                let lifetime = 10
                for (let i = 0; i < bulletAmount; i++) {
                    let attributes = [i, bulletAmount, 0, lifetime * FPS]
                    let bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, attributes, lifetime);
                    allBullets.push(bullet);
                }

                function trajectory() {
                    let currentBulletID = this.trajectoryAttributes[0];
                    let totalBullets = this.trajectoryAttributes[1];
                    let shiftMovement = this.trajectoryAttributes[2] / this.trajectoryAttributes[3];
                    let x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                    let y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                    this.trajectoryAttributes[2]++;
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
                let bulletAmount = 40;
                let lifetime = 10
                for (let i = 0; i < bulletAmount; i++) {
                    let attributes = [i, bulletAmount, 0, lifetime * FPS]
                    let bullet = new Bullet(boss.x, boss.y, bulletTexture, EXAMPLE_BULLET_PROPERTIES, trajectory, attributes, lifetime);
                    allBullets.push(bullet);
                }

                function trajectory() {
                    let currentBulletID = this.trajectoryAttributes[0];
                    let totalBullets = this.trajectoryAttributes[1];
                    let shiftMovement = this.trajectoryAttributes[2] / this.trajectoryAttributes[3];
                    let x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                    let y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement) * 2;
                    this.trajectoryAttributes[2]++;
                    return [x, y];
                }
            },
            "bulletVisuals": {
                "radius": 10,
                "color": "white"
            },
            "frequency": 0.15, //in seconds

            "abilityName": "Passive",
            "description": "This is a description for a Passive Ability.",
            "iconUrl": "img/passive.png",
        },
    }
};