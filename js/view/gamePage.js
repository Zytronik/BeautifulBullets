import { challenger, boss, currentFPS, match, canvasRenderTime, gameLogicTime, totalFrameCalculationTime } from "../main.js";
import { CHARACTER_DATA } from "../data/characters.js";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../settings/gameSettings.js";
import { CANVAS_UNIT } from "./canvas.js";
import { goToState, GAMESTATE } from "../gameStateManager.js";
import { player1SelectedCharacter, player2SelectedCharacter } from "./characterSelectionPage.js";
import { convertFramecountIntoMinutesSeconds } from "../data/match.js";

export function frontend_closePauseScreen() {
    document.querySelector("article.game .pauseScreen").classList.remove("paused");
}

export function frontend_showPauseScreen() {
    document.querySelector("article.game .pauseScreen").classList.add("paused");
}

export function frontend_setupGameUI() {
    setupChallengerSpecialChargeBar();
    setupBossHealthBar();
    setupBossAbilities();
}

export function updateGameUI() {
    updateBossChallengerHealthbarPosition();
    updateChallengerSpecialCharge();
    updateDebugUI();
    updateChallengerHealthbar();
    updateBossHealthbar();
    updateBossAbilities();
    updateTimer();
}

function zoomToChallenger(){
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        let scale = 2;
        let centerX = (BOARD_WIDTH / 2 - challenger.x) * scale;
        let centerY = (BOARD_HEIGHT / 2 -challenger.y) * scale;
        player.querySelector("article.game .characterCanvas").style.transform = "translate("+centerX+"px, "+centerY+"px) scale("+scale+")";
        player.querySelector("article.game .bulletCanvas").style.transform = "translate("+centerX+"px, "+centerY+"px) scale("+scale+")";
    });
}

function resetZoomChallenger(){
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        player.querySelector("article.game .characterCanvas").style.transform = "";
        player.querySelector("article.game .bulletCanvas").style.transform = "";
    });
}

function deadAnimation(){
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        player.querySelector("article.game .characterCanvas").classList.add("deadAnimation");
        player.querySelector("article.game .bulletCanvas").classList.add("deadAnimation");
    });
}

function hideCanvasContent(){
    document.querySelector("article.game").classList.add("hideContent");
}

function showCanvasContent(){
    document.querySelector("article.game").classList.remove("hideContent");
}

export function frontend_switchSidesAnimations() {
    fadeOutUI();
    showCutSceneBars();
    setTimeout(() => {
        deadAnimation();
        setTimeout(() => {
            zoomToChallenger();
            switchUI();
            setTimeout(() => {
                hideCanvasContent();
                setTimeout(() => {
                    fadeInUI();
                    resetZoomChallenger();
                    hideCutSceneBars();
                    document.querySelector("article.game .switchingSides").classList.add("active");
                    setTimeout(() => {
                        document.querySelector("article.game .switchingSides").classList.remove("active");
                        setTimeout(() => {
                            showCanvasContent();
                            goToState(GAMESTATE.GAMESTART_CUTSCENE);
                        }, 200);
                    }, 1100);
                }, 600);
            }, 1000);
        }, 500);
    }, 700);
}

export function frontend_showRoundEndScreen(scoreP1, scoreP2, firstTo) {
    document.querySelector("article.game .roundEndScreen .generalStats span").innerHTML = "FT"+firstTo;
    document.querySelector("article.game .roundEndScreen .roundStatsPlayer1 .score").innerHTML = scoreP1;
    document.querySelector("article.game .roundEndScreen .roundStatsPlayer2 .score").innerHTML = scoreP2;
    document.querySelector("article.game .roundEndScreen .roundStatsPlayer1 h4").innerHTML = CHARACTER_DATA[player1SelectedCharacter].name;
    document.querySelector("article.game .roundEndScreen .roundStatsPlayer2 h4").innerHTML = CHARACTER_DATA[player2SelectedCharacter].name;
    fadeOutUI();
    setTimeout(() => {
        document.querySelector("article.game .roundEndScreen").classList.add("active");
        setTimeout(() => {
            document.querySelector("article.game .roundEndScreen").classList.remove("active");
            setTimeout(() => {
                switchUI();
                fadeInUI();
                setTimeout(() => {
                    //goToState(GAMESTATE.GAMESTART_CUTSCENE);
                }, 900);
            }, 500);
        }, 5000);
    }, 900);
}

function switchUI() {
    let oldChallenger = document.querySelector("article.game .challenger");
    let oldBoss = document.querySelector("article.game .boss");
    oldChallenger.classList.remove("challenger");
    oldBoss.classList.remove("boss");
    oldChallenger.classList.add("boss");
    oldBoss.classList.add("challenger");
    updateChallengerHealthbar();
    frontend_setupGameUI();
    updateBossChallengerHealthbarPosition();
}

export function showCutSceneBars(){
    document.querySelector("article.game .cutSceneBars").classList.add("active");
}

export function hideCutSceneBars(){
    document.querySelector("article.game .cutSceneBars").classList.remove("active");
}

function updateTimer(){
    let time = convertFramecountIntoMinutesSeconds(match.elapsedTimeInFrames);
    document.querySelector("#gameTimer span").innerHTML = time[0] +":"+pad(time[1], 2);
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function fadeOutUI() {
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        player.querySelector("article.game .challenger-healthbar").classList.add("fadeOut");
        player.querySelector("article.game .boss-healthbar").classList.add("fadeOut");
        player.querySelector("article.game .challenger-abilitie").classList.add("fadeOut");
        player.querySelector("article.game .boss-abilities").classList.add("fadeOut");
    });
}

export function fadeInUI() {
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        player.querySelector("article.game .challenger-healthbar").classList.remove("fadeOut");
        player.querySelector("article.game .boss-healthbar").classList.remove("fadeOut");
        player.querySelector("article.game .challenger-abilitie").classList.remove("fadeOut");
        player.querySelector("article.game .boss-abilities").classList.remove("fadeOut");
    });
}

function updateChallengerHealthbar() {
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        let hBar = player.querySelector(".challenger-healthbar");
        hBar.innerHTML = "";
        var hearts = "";
        for (let i = 0; i < challenger.maxHealth; i++) {
            hearts += '<div class="heart"></div>';
        }
        hBar.innerHTML = hearts;
        for (let i = 0; i < challenger.currentHealth; i++) {
            hBar.children[i].classList.add("life");
        }
    });
}

function updateBossHealthbar() {
    var colors = getHealthbarColors('rgb(255, 0, 0)', 'rgb(0, 128, 0)', 100);
    let playersHealthBars = document.querySelectorAll("article.game .player .boss-healthbar");
    Array.prototype.forEach.call(playersHealthBars, function (hBar) {
        var life = 100 / boss.maxHealth * boss.currentHealth;
        if (life >= 0) {
            hBar.querySelector(".life-bar > div").style.width = life + "%";
            hBar.querySelector(".boss-desc > span").innerHTML = Math.round(life) + "%";
            hBar.querySelector(".life-bar > div").style.backgroundColor = Object.keys(colors)[Math.floor(life)]
        }
    });
}

function setupBossHealthBar() {
    let playersHealthBar = document.querySelectorAll("article.game .player .boss-healthbar");
    Array.prototype.forEach.call(playersHealthBar, function (hBar) {
        hBar.innerHTML = '<div class="boss-desc">' +
            '<div>' +
            '<img src="' + boss.healthBarSpriteUrl + '">' +
            '<p>' + boss.healthBarName + '</p>' +
            '</div>' +
            '<span>0%</span>' +
            '</div>' +
            '<div class="life-bar">' +
            '<div></div>' +
            '</div>';
    });
}

function updateChallengerSpecialCharge() {
    let ChargeBarWidth = 100 / challenger.specialMaxCharge * challenger.specialCharge
    if (ChargeBarWidth <= 100) {
        document.querySelector("article.game .challenger .challenger-abilitie .grace-bar > div").style.height = ChargeBarWidth + "%";
    }
}

function setupChallengerSpecialChargeBar() {
    document.querySelector("article.game .challenger .challenger-abilitie .grace-bar").innerHTML = "<div></div>";
    let barCount = Math.floor(challenger.specialMaxCharge / challenger.specialChargeRequired);
    for (let i = 0; i < barCount; i++) {
        document.querySelector("article.game .challenger .challenger-abilitie .grace-bar").innerHTML += '<span style="height:' + 100 / barCount + '%"></span>';
    }
}

function updateDebugUI() {
    document.querySelector('#currentFPS > span').innerHTML = currentFPS;
    document.querySelector('#canvasRenderTime > span').innerHTML = canvasRenderTime;
    document.querySelector('#gameLogicTime > span').innerHTML = gameLogicTime;
    document.querySelector('#totalFrameCalculationTime > span').innerHTML = totalFrameCalculationTime;
}


function updateBossChallengerHealthbarPosition() {
    document.querySelector(':root').style.setProperty('--bossChallengerHealthX', challenger.x * CANVAS_UNIT + 'px');
    document.querySelector(':root').style.setProperty('--bossChallengerHealthY', challenger.y * CANVAS_UNIT + 'px');
}

function updateBossAbilities() {
    let bossAbilities = document.querySelectorAll("article.game .boss .boss-abilities > div");
    Array.prototype.forEach.call(bossAbilities, function (bossAbility, index) {
        let height = 100 - (100 / boss["ability" + (index + 1) + "CoolDownRequired"] * boss["ability" + (index + 1) + "CoolDown"]);
        bossAbility.querySelector(".ability-wrapper .overlay > div").style.height = height + "%"
    });
}

function setupBossAbilities() {
    document.querySelector("article.game .boss .boss-abilities").innerHTML = "";
    for (var index in boss.abilities) {
        document.querySelector("article.game .boss .boss-abilities").innerHTML +=
            '<div class="ability-wrapper" data-ability="' + index + '">' +
            '<img src="' + boss.abilities[index].iconUrl + '" alt="' + boss.abilities[index].abilityName + '">' +
            '<div class="overlay">' +
            '<span></span>' +
            '<div></div>' +
            '</div>' +
            '</div>';
    }
}

function convert_color(c) {
    var color;
    if (c.indexOf('rgb') == -1) {
        color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
        color = color ? [
            parseInt(color[1], 16),
            parseInt(color[2], 16),
            parseInt(color[3], 16)
        ] : [255, 255, 255];
    } else {
        color = c.split('(')[1].split(')')[0].split(',');
        for (var i = 0; i < color.length; i++) {
            color[i] = parseInt(color[i]);
        }
    }
    return color;
};

function getHealthbarColors(c1, c2, st) {
    c1 = convert_color(c1);
    c2 = convert_color(c2);
    var s_r = Math.floor((c1[0] - c2[0]) / st);
    var s_g = Math.floor((c1[1] - c2[1]) / st);
    var s_b = Math.floor((c1[2] - c2[2]) / st);
    var steps = {};
    var cth = function (c) {
        var h = c.toString(16);
        return h.length == 1 ? "0" + h : h;
    };
    var toHEX = function (v) {
        return "#" + cth(v[0]) + cth(v[1]) + cth(v[2]);
    };
    var toRGB = function (v) {
        return 'rgb(' + v.join(',') + ')';
    };
    steps[toRGB(c1)] = {
        hex: toHEX(c1).toUpperCase(),
        rgb: toRGB(c1)
    };
    for (var i = 0; i < st; i++) {
        if ((c1[0] - s_r) > 0) c1[0] -= s_r;
        if ((c1[1] - s_g) > 0) c1[1] -= s_g;
        if ((c1[2] - s_b) > 0) c1[2] -= s_b;
        c1[0] = (c1[0] > 255) ? 255 : c1[0];
        c1[1] = (c1[1] > 255) ? 255 : c1[1];
        c1[2] = (c1[2] > 255) ? 255 : c1[2];
        if (!steps[toRGB(c1)]) steps[toRGB(c1)] = {
            hex: toHEX(c1).toUpperCase(),
            rgb: toRGB(c1)
        };
    }
    return steps;
};

export function playCountDown(){
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        let playCountDown = player.querySelector(".gameCountDown");
        playCountDown.innerHTML = "FIGHT";
        playCountDown.classList.add("active");
        setTimeout(() => {
            playCountDown.classList.remove("active");
        }, 400);
    });
    setTimeout(() => {
        hideCutSceneBars();
        goToState(GAMESTATE.GAMEPLAY_REGULAR);
    }, 500);
}