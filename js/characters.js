import { boss, bossBullets, challenger, challengerBullets } from "./main.js";
import { Bullet } from "./bullet.js";

export const CHARACTER_DATA = {
    "johnCena": {
        "name": "Nabil",
        "spriteUrl": "./img/nabil.jpg",
        "challenger": {
            "spriteUrl": "./img/nabil.jpg",
            "spriteScaling": 30,
            "radius": 2,
            "hitboxColor": "red",

            "health": 2,
            "homing": 1.3,
            "fireRate": 0.7,
            "bulletDamage": 2.8,
            "bulletSpeed": 1,
            "speed": 8,
            "shiftSpeed": 1,

            "specialChargeRequired": 50,
            "specialChargeSpeed": 1,
            "specialPassiveChargeSpeed": 0.1,
            "specialDuration": 0,
            "bullet": {
                "radius": 2,
                "color": "red"
            },
        },
        "boss": {
            "spriteUrl": "./img/nabil.jpg",
            "spriteScaling": 0.05,
            "radius": 2,
            "speed": 8,
            "maxHealth": 1000,
            "ability1": {
                "use": function () {
                    let bulletAmount = 100;
                    for (let i = 0; i < bulletAmount; i++) {
                        bossBullets.push(new Bullet(boss.x, boss.y, trajectory, 500, i, false));
                    }
                    this.currentCoolDown = 0;

                    function trajectory(bulletNumba, bulletAmount, spiral) {
                        let x = Math.sin(Math.PI * 2 / (bulletAmount) * bulletNumba + spiral) * 2;
                        let y = Math.cos(Math.PI * 2 / (bulletAmount) * bulletNumba + spiral) * 2;
                        return [x, y];
                    }
                },
                "bulletProperties": {
                    "radius": 2,
                    "color": "white"
                },
                "coolDown": 2, //in seconds

                "abilityName": "Ability 1",
                "description": "This is a description DEAL WITH IT",
                "iconUrl": "",
            },
            "passive": {
                "use": function () {
                    let bulletAmount = 10;
                    for (let i = 0; i < bulletAmount; i++) {
                        bossBullets.push(new Bullet(boss.x, boss.y, trajectory, 500, i, false));
                    }
                    this.currentCoolDown = 0;

                    function trajectory(bulletNumba, bulletAmount, spiral) {
                        let x = Math.sin(Math.PI * 2 / (bulletAmount) * bulletNumba + spiral) * 2;
                        let y = Math.cos(Math.PI * 2 / (bulletAmount) * bulletNumba + spiral) * 2;
                        return [x, y];
                    }
                },
                "bulletProperties": {
                    "radius": 2,
                    "color": "white"
                },
                "frequency": 0.3, //in seconds

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