import { boss, bossBullets, challenger, challengerBullets } from "./main.js";
import { Bullet } from "./bullet.js";
import { FPS } from "./gameSettings.js";

export const CHARACTER_DATA = {
    "johnCena": {
        "name": "Nabil",
        "spriteUrl": "./img/nabil.jpg",

        // C H A L L E N G E R
        "challenger": {

            // V I S U A L S
            "spriteUrl": "./img/nabil.jpg",
            "spriteScaling": 30,
            "radius": 5,
            "hitboxColor": "red",
            "bulletVisuals": {
                "radius": 5,
                "color": "blue"
            },

            // S T A T S 
            "health": 2,

            "homing": 1.3,
            "fireRate": 12, // Bullets per Second
            "bulletDamage": 2.8,
            "bulletSpeed": 1,
            "moveSpeed": 8,
            "shiftSpeed": 1,

            // S P E C I A L
            "special": {
                "use": function () {
                    bossBullets.length = 0;
                    challengerBullets.length = 0;
                },
                "chargeRequired": 50,
                "graceChargeSpeed": 30, // Charge per second in grace
                "passiveChargeSpeed": 2, // Charge per second
                "duration": 0,

                "abilityName": "Blankbomb",
                "description": "Destroys all bullets on the screen.",
                "iconUrl": "",
            },
        },

        // B O S S
        "boss": {
            // V I S U A L S
            "spriteUrl": "./img/nabil.jpg",
            "spriteScaling": 0.01,

            // S T A T S 
            "radius": 5,
            "moveSpeed": 8,
            "maxHealth": 1000,
            
            // A B I L I T I E S
            "ability1": {
                "use": function () {
                    if (this.fancyStuff) {
                        let bulletAmount = 70;
                        let lifetime = 10
                        for (let i = 0; i < bulletAmount; i++) {
                            let attributes = [i, bulletAmount, 0, lifetime * FPS]
                            let bullet = new Bullet(boss.x, boss.y, this.bulletVisuals, trajectory1, lifetime, attributes);
                            this.mybullets.push(bullet)
                            bossBullets.push(bullet);
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
                "bulletVisuals": {
                    "radius": 4,
                    "color": "white"
                },
                "coolDown": 2, //in seconds
                "fancyStuff": true,
                "mybullets": [],

                "abilityName": "Ability 1",
                "description": "This is a description DEAL WITH IT",
                "iconUrl": "",
            },
            "passive": {
                "use": function () {
                    let bulletAmount = 10;
                    let lifetime = 10
                    for (let i = 0; i < bulletAmount; i++) {
                        let attributes = [i, bulletAmount, 0, lifetime * FPS]
                        let bullet = new Bullet(boss.x, boss.y, this.bulletVisuals, trajectory, lifetime, attributes);
                        bossBullets.push(bullet);
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
                "frequency": 2, //in seconds

                "abilityName": "Passive",
                "description": "This is a description for a P A S S I V E   A B I L I T Y",
                "iconUrl": "",
            },
        }
    },
    "maxMuster": {
        "name": "Dirt-chan",
        "spriteUrl": "./img/bg.png",
        "challenger": {
            "spriteUrl": "./img/bg.png",
            "spriteScaling": 30,
            "radius": 2,
            "hitboxColor": "red",
            "health": 4,
            "homing": 2,
            "fireRate": 2.1,
            "bulletDamage": 1,
            "bulletSpeed": 0.8,
            "speed": 2,
            "shiftSpeed": 1,
            "specialChargeRequired": 50,
            "specialChargeSpeed": 1,
            "specialPassiveChargeSpeed": 0.1,
            "specialDuration": 0,
            "bullet": {
                "radius": 2,
                "color": "red"
            }
        },
        "boss": {
            "spriteUrl": "./img/bg.png",
            "spriteScaling": 0.05,
            "radius": 30,
            "bullet": {
                "radius": 2,
                "color": "white"
            }
        }
    },
    "aliceSecurity": {
        "name": "Alice Security",
        "spriteUrl": "./img/challenger.png",
        "challenger": {
            "spriteUrl": "./img/challenger.png",
            "spriteScaling": 30,
            "radius": 2,
            "hitboxColor": "red",
            "health": 6,
            "homing": 0.7,
            "fireRate": 1.2,
            "bulletDamage": 2,
            "bulletSpeed": 1,
            "speed": 3,
            "shiftSpeed": 1,
            "specialChargeRequired": 50,
            "specialChargeSpeed": 1,
            "specialPassiveChargeSpeed": 0.1,
            "specialDuration": 0,
            "bullet": {
                "radius": 2,
                "color": "red"
            }
        },
        "boss": {
            "spriteUrl": "./img/challenger.png",
            "spriteScaling": 0.05,
            "radius": 300,
            "bullet": {
                "radius": 2,
                "color": "white"
            }
        }
    },
    "simuu": {
        "name": "Simu",
        "spriteUrl": "./img/simu.jpg",
        "challenger": {
            "spriteUrl": "./img/simu.jpg",
            "spriteScaling": 30,
            "radius": 2,
            "hitboxColor": "red",
            "health": 5,
            "homing": 1,
            "fireRate": 1.6,
            "bulletDamage": 1.2,
            "bulletSpeed": 1,
            "speed": 6,
            "shiftSpeed": 1,
            "specialChargeRequired": 50,
            "specialChargeSpeed": 1,
            "specialPassiveChargeSpeed": 0.1,
            "specialDuration": 0,
            "bullet": {
                "radius": 2,
                "color": "red"
            }
        },
        "boss": {
            "spriteUrl": "./img/simu.jpg",
            "spriteScaling": 0.05,
            "radius": 300,
            "bullet": {
                "radius": 2,
                "color": "white"
            }
        }
    }
}