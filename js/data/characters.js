import { boss, bossBullets } from "../main.js";
import { Bullet } from "../gameElements/bullet.js";
import { BOARD_HEIGHT, BOARD_WIDTH, FPS } from "../settings/gameSettings.js";
import { convertMouseCoordinatesToCanvasCoordinates } from "../view/canvas.js";

export const CHARACTER_DATA = {
    "nabibi": {
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
                    bossBullets.length = 0;
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
            "spriteUrl": "./img/nabil.jpg",
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
                    "deactivate": function () {
                        
                    },
                    "bulletVisuals": {
                        "radius": 4,
                        "color": "white"
                    },
                    "coolDown": 2, //in seconds
                    "duration" : 0, //in seconds
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
                    "deactivate": function () {
                        
                    },
                    "bulletVisuals": {
                        "radius": 4,
                        "color": "white"
                    },
                    "coolDown": 2, //in seconds
                    "duration" : 0, //in seconds
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
                    "deactivate": function () {
                        
                    },
                    "bulletVisuals": {
                        "radius": 4,
                        "color": "white"
                    },
                    "coolDown": 2, //in seconds
                    "duration" : 0, //in seconds
                    "fancyStuff": true,
                    "mybullets": [],

                    "abilityName": "Ability 3",
                    "description": "This is a description DEAL WITH IT",
                    "iconUrl": "img/bg.png",
                },
            },
            "passive": {
                "use": function () {
                    let bulletAmount = 20;
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
                "description": "This is a description for a Passive Ability.",
                "iconUrl": "img/passive.png",
            },
            "enrage": {
                "use": function () {
                    let bulletAmount = 50;
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
                    "radius": 10,
                    "color": "white"
                },
                "frequency": 0.1, //in seconds

                "abilityName": "Passive",
                "description": "This is a description for a Passive Ability.",
                "iconUrl": "img/passive.png",
            },
        }
    },

    "yoimiya": {
        "name": "Yoimiya Naganohara",
        "spriteUrl": "./img/yoimiya/portrait.png",

        // C H A L L E N G E R
        "challenger": {

            // V I S U A L S
            "spriteUrl": "./img/yoimiya/challenger.png",
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
                    this.bullets = 4;
                },
                "deactivate": function () {
                    this.bullets = 1;
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
            "spriteUrl": "./img/yoimiya/boss.png",
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
                                    bullet = new Bullet(boss.x, boss.y, customBulletVisuals, trajectoryBeforeSecondCast, lifetime, attributes);
                                this.mybullets.push(bullet);
                                bossBullets.push(bullet);
                            }
                            for (let i = 0; i < Math.round(bulletAmount / 1.5); i++) {
                                let attributes = [i, Math.round(bulletAmount / 1.5), random1, 0, Math.random() * 15 + 1, bulletAmount],
                                    customBulletVisuals = { radius: 10, color: "yellow" },
                                    bullet = new Bullet(boss.x, boss.y, customBulletVisuals, trajectoryBeforeSecondCast, lifetime, attributes);
                                this.mybullets.push(bullet);
                                bossBullets.push(bullet);
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
                            let randomNumber1 = this.attributes[2],
                                x = randomNumber1 * 5 - 2.5,
                                y = 1;
                            return [x, y];
                        }

                        function trajectoryAfterSecondCast() {
                            let x = 0,
                                y = 0,
                                bulletNumber = this.attributes[0],
                                bulletAmount1 = this.attributes[1],
                                accelerator = this.attributes[3],
                                randomNumber2 = this.attributes[4],
                                bulletAmount2 = this.attributes[5];

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
                                this.attributes[3] += 0.01;
                            }
                            this.attributes[4] = randomNumber2 ** 0.96;
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
                    "iconUrl": "img/ability1.png",
                    
                    //optional attributes for ability
                    "secondCast" : false,
                    "mybullets": [],
                },
                "ability2": {
                    "use": function () {
                        let bulletAmount = 8,
                            lifetime = 20;
                        for (let i = 0; i < bulletAmount; i++) {
                            let attributes = [i, bulletAmount, 0, lifetime, boss.x, boss.y,],
                                x = boss.x + Math.sin(Math.PI * 2 / bulletAmount * i) * 100,
                                y = boss.y + Math.cos(Math.PI * 2 / bulletAmount * i) * 100;
                            let bullet = new Bullet(x, y, this.bulletVisuals, trajectory, lifetime, attributes);
                            this.mybullets.push(bullet)
                            bossBullets.push(bullet);
                        }

                        function trajectory() {
                            let x = 0,
                                y = 1,
                                bulletNumber = this.attributes[0],
                                bulletAmount = this.attributes[1],
                                shiftCounter = this.attributes[2],
                                lifetime = this.attributes[3],
                                bossX = this.attributes[4],
                                bossY = this.attributes[5],
                                shiftMovement = shiftCounter / lifetime;

                            if (this.framesAlive <= 60) {
                                x = Math.sin(Math.PI * 2 / bulletAmount * bulletNumber + Math.PI) + boss.xSpeedNormalized;
                                y = Math.cos(Math.PI * 2 / bulletAmount * bulletNumber + Math.PI) + boss.ySpeedNormalized;
                                let lengthX = convertMouseCoordinatesToCanvasCoordinates()[0] - boss.x,
                                    lengthY = convertMouseCoordinatesToCanvasCoordinates()[1] - boss.y,
                                    length = Math.sqrt(lengthX ** 2 + lengthY ** 2);
                                this.attributes[4] = lengthX / length;
                                this.attributes[5] = lengthY / length;
                            } else {
                                x = Math.sin(Math.PI * 2 / bulletAmount * bulletNumber + shiftMovement + Math.PI / 2) + bossX * 3;
                                y = Math.cos(Math.PI * 2 / bulletAmount * bulletNumber + shiftMovement + Math.PI / 2) + bossY * 3;
                                this.attributes[2] += 0.6;
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
                    "duration" : 0, //in seconds
                    "abilityName": "Blazing Chakram",
                    "description": "An aimed shot of bullets with the form of a spinning Chakram",
                    "iconUrl": "img/yoimiya/Blazing_Chakram.svg",
                    
                    //optional attributes for ability
                    "mybullets": [],
                },
                "ability3": {
                    "use": function () {
                        let coords = convertMouseCoordinatesToCanvasCoordinates();
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
                            // boss.ability3CoolDown = 0.5 * FPS;
                            console.log("1 "+coords, this.secondCast, boss.ability3CoolDown)
                        } else if (this.secondCast) {
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
                            // boss.ability3CoolDown = 5 * FPS;
                            console.log("2 "+coords, this.secondCast, boss.ability3CoolDown)
                        }
                    },
                    "deactivate": function () {
                        // if (!this.secondCast) {
                        //     boss.ability3CoolDown = 0.5 * FPS;
                        //     this.coolDown = 0.5;
                        // } else {
                        //     boss.ability3CoolDown = 5 * FPS;
                        //     this.coolDown = 5;
                        // }
                        
                    },
                    "bulletVisuals": {
                        "radius": 5,
                        "color": "red"
                    },
                    "coolDown": 5, //in seconds
                    "duration" : 0, //in seconds
                    "abilityName": "Blazing Chakram",
                    "description": "An aimed shot of bullets with the form of a spinning Chakram",
                    "iconUrl": "img/yoimiya/Blazing_Chakram.svg",
                    
                    //optional attributes for ability
                    "mybullets": [],
                    "secondCast": false,
                },
            },
            "passive": {
                "use": function () {
                    let bulletAmount = 40,
                        lifetime = 20,
                        bool = false;

                    for (let i = 0; i < bulletAmount; i++) {
                        let spawnBulletX = boss.x + Math.sin(Math.PI * 2 / bulletAmount * i) * 100,
                            spawnBulletY = boss.y + Math.cos(Math.PI * 2 / bulletAmount * i) * 100,
                            attributes = [i, bulletAmount, 0, lifetime, bool, boss.x, boss.y, spawnBulletX, spawnBulletY, 0],
                            bullet = new Bullet(spawnBulletX, spawnBulletY, this.bulletVisuals, trajectory, lifetime, attributes);
                        bossBullets.push(bullet);
                    }

                    function trajectory() {
                        let currentBulletID = this.attributes[0],
                            totalBullets = this.attributes[1],
                            shiftCounter = this.attributes[2],
                            lifetime = this.attributes[3],
                            bool = this.attributes[4],
                            bossX = this.attributes[5],
                            bossY = this.attributes[6],
                            bulletPosX = this.attributes[7],
                            bulletPosY = this.attributes[8],
                            accelerator = this.attributes[9],
                            shiftMovement = shiftCounter / lifetime,
                            x = 0,
                            y = 0;

                        if (Math.random() <= 0.997 && bool == false) {
                            x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement + Math.PI / 2) * 2 + boss.xSpeedNormalized;
                            y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement + Math.PI / 2) * 2 + boss.ySpeedNormalized;
                            this.attributes[7] = this.x;
                            this.attributes[8] = this.y;
                            this.attributes[2] += 0.4;
                        } else {
                            x = Math.cos(Math.atan2(bossY - bulletPosY, bossX - bulletPosX) + Math.PI);
                            if (y >= 1.5) {
                                y = 1.5;
                            } else {
                                y = Math.sin(Math.atan2(bossY - bulletPosY, bossX - bulletPosX) + Math.PI) * 2 + accelerator;
                            }
                            this.attributes[4] = true;
                            if (accelerator <= 6) {
                                this.attributes[9] += 0.03
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
                        bullet = new Bullet(spawnBulletX, spawnBulletY, this.bulletVisuals, trajectory, lifetime, attributes);
                    bossBullets.push(bullet);
                }

                function trajectory() {
                    let currentBulletID = this.attributes[0],
                        totalBullets = this.attributes[1],
                        shiftCounter = this.attributes[2],
                        lifetime = this.attributes[3],
                        bool = this.attributes[4],
                        bossX = this.attributes[5],
                        bossY = this.attributes[6],
                        bulletPosX = this.attributes[7],
                        bulletPosY = this.attributes[8],
                        accelerator = this.attributes[9],
                        shiftMovement = shiftCounter / lifetime,
                        x = 0,
                        y = 0;

                    if (Math.random() <= 0.995 && bool == false) {
                        x = Math.sin(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement + Math.PI / 2) * 2 + boss.xSpeedNormalized;
                        y = Math.cos(Math.PI * 2 / (totalBullets) * currentBulletID + shiftMovement + Math.PI / 2) * 2 + boss.ySpeedNormalized;
                        this.attributes[7] = this.x;
                        this.attributes[8] = this.y;
                        this.attributes[2] += 0.4;
                    } else {
                        x = Math.cos(Math.atan2(bossY - bulletPosY, bossX - bulletPosX) + Math.PI);
                        if (y >= 1.5) {
                            y = 1.5;
                        } else {
                            y = Math.sin(Math.atan2(bossY - bulletPosY, bossX - bulletPosX) + Math.PI) * 2 + accelerator;
                        }
                        this.attributes[4] = true;
                        if (accelerator <= 6) {
                            this.attributes[9] += 0.03
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
    },
}