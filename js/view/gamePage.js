import { challenger, boss, currentFPS, gamePaused, match, canvasRenderTime, gameLogicTime, totalJSTime, nonJSTime, player1Canvas, player2Canvas, main_clearAllBullets } from "../main.js";
import { CHARACTER_DATA } from "../data/characters.js";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../settings/gameSettings.js";
import { CANVAS_UNIT } from "./canvas.js";
import { goToState, GAMESTATE } from "../gameStateManager.js";
import { player1SelectedCharacter, player2SelectedCharacter } from "./characterSelectionPage.js";
import { convertFramecountIntoMinutesSeconds } from "../gameElements/match.js";
import {convertMouseCoordinatesToCanvasCoordinates} from "./canvas.js";
import { mouseCoordinates } from "./windowOnLoad.js";
import { allBullets } from "../gameElements/bullet.js";

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

export function updateBossCursor(){
    let coords = convertMouseCoordinatesToCanvasCoordinates();
    let cursor = document.querySelector("#bossCursor");
    let body = document.querySelector("body");
    if(coords[0] >= 0 && coords[0] <= BOARD_WIDTH && coords[1] >= 0 && coords[1] <= BOARD_HEIGHT && !gamePaused){
        cursor.classList.add("active");
        body.classList.add("hideCursor");
    }else{
        cursor.classList.remove("active");
        body.classList.remove("hideCursor");
    }
    cursor.style.left = mouseCoordinates[0]+"px";
    cursor.style.top = mouseCoordinates[1]+"px";
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
    setTimeout(() => {
        Array.prototype.forEach.call(players, function (player) {
            player.querySelector("article.game .characterCanvas").classList.remove("deadAnimation");
            player.querySelector("article.game .bulletCanvas").classList.remove("deadAnimation");
        });
    }, 2000);
}

function hideCanvasContent(){
    document.querySelector("article.game").classList.add("hideContent");
}

function showCanvasContent(){
    document.querySelector("article.game").classList.remove("hideContent");
}

function moveBossAndChallengOutsideOfCanvas(){
    challenger.x = BOARD_WIDTH / 2;
    challenger.y = BOARD_HEIGHT * 7 / 6;
    boss.y = -BOARD_HEIGHT / 6;
    boss.x = BOARD_WIDTH / 2;
    player1Canvas.updateCanvas();
    player2Canvas.updateCanvas();
}

function fadeInChallengerBossHealthbar(){
    document.querySelector("article.game .boss .challenger-healthbar").classList.remove("fadeOut");
}

export function challengerDeathCutsceneToBlack(){
    fadeOutUI();
    showCutSceneBars();
    setTimeout(() => {
        deadAnimation();
        setTimeout(() => {
            zoomToChallenger();
            setTimeout(() => {
                hideCanvasContent();
                setTimeout(() => {
                    main_clearAllBullets();
                    moveBossAndChallengOutsideOfCanvas();
                    resetZoomChallenger();
                }, 600);
            }, 1000);
        }, 500);
    }, 700);
}

export function challengerDeathCutscene(){
    fadeOutUI();
    showCutSceneBars();
    setTimeout(() => {
        deadAnimation();
        setTimeout(() => {
            zoomToChallenger();
            setTimeout(() => {
                setTimeout(() => {
                    main_clearAllBullets();
                    moveBossAndChallengOutsideOfCanvas();
                    resetZoomChallenger();
                }, 600);
            }, 1000);
        }, 500);
    }, 700);
}

export function frontend_switchSidesAnimations() {
    switchUI();
    fadeInUI();
    document.querySelector("article.game .infoScreen").classList.add("switchingSidesActive");
    setTimeout(() => {
        document.querySelector("article.game .infoScreen").classList.remove("switchingSidesActive");
        setTimeout(() => {
            showCanvasContent();
            goToState(GAMESTATE.GAMESTART_CUTSCENE);
        }, 600);
    }, 1200);
}

export function frontend_gameOverAnimation(){
    document.querySelector("article.game .infoScreen").classList.add("matchOverActive");
    setTimeout(() => {
        document.querySelector("article.game .infoScreen").classList.remove("matchOverActive");
        setTimeout(() => {
            //showCanvasContent();
            goToState(GAMESTATE.RESULT_SCREEN);
        }, 600);
    }, 1200);
}

function loadGameOverScreen(){
    document.querySelector("article.game .resultScreen .matchOverInfo span").innerHTML = "FT"+ match.matchSettings.firstTo;
    document.querySelector("article.game .resultScreen .matchStatsPlayer1 .score").innerHTML = match.scoreP1;
    document.querySelector("article.game .resultScreen .matchStatsPlayer2 .score").innerHTML = match.scoreP2;
    let rounds = match.previousRounds;
    let players = document.querySelectorAll("article.game .resultScreen .matchStatsPlayer");
    let ts, dd ,tg;
    Array.prototype.forEach.call(players, function (player) {
        let content = "";
        for (var i in rounds) {
            content += '<div class="roundWrapper">';
            if(player.classList.contains("matchStatsPlayer1")){
                ts = convertFramecountIntoMinutesSeconds(rounds[i]["player1Stats"]["timeSurvivedInFrames"]);
                tg = convertFramecountIntoMinutesSeconds(rounds[i]["player1Stats"]["timeInGraceInFrames"]);
                dd = Math.round(100 * rounds[i]["player1Stats"]["damageDealt"]) + "%";
            }else{
                ts = convertFramecountIntoMinutesSeconds(rounds[i]["player2Stats"]["timeSurvivedInFrames"]);
                tg = convertFramecountIntoMinutesSeconds(rounds[i]["player2Stats"]["timeInGraceInFrames"]);
                dd = Math.round(100 * rounds[i]["player2Stats"]["damageDealt"]) + "%";
            }
            content += '<p class="damageDealt">Damage: <span>'+dd+'</span></p>'+
            '<p class="time">Time: <span>'+ts[0]+':'+ts[1]+'</span></p>'+
            '<p class="timeGrace">Grace: <span>'+tg[0]+':'+tg[1]+'</span></p>';
            content += "</div>";
        }
        player.querySelector(".matchStatsRounds").innerHTML = content;
    });

    let classPlayer1 = "";
    let classPlayer2 = "";
    if(match.matchWinner === 2){
        classPlayer2 = "winner";
        classPlayer1 = "loser";
    }else{
        classPlayer1 = "winner";
        classPlayer2 = "loser";
    }

    document.querySelector("article.game .resultScreen .matchStatsPlayer1").innerHTML += 
    '<div class="characterWrapper '+classPlayer1+'">'+
    '<img src="'+CHARACTER_DATA[player1SelectedCharacter].spriteUrl+'">'+
    '<div class="dialogText">'+
    '<p class="name">'+CHARACTER_DATA[player1SelectedCharacter].name+'</p>'+
    '<p class="text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam!!!</p>'+
    '</div>'+
    '</div>';
    
    document.querySelector("article.game .resultScreen .matchStatsPlayer2").innerHTML += 
    '<div class="characterWrapper '+classPlayer2+'">'+
    '<img src="'+CHARACTER_DATA[player2SelectedCharacter].spriteUrl+'">'+
    '<div class="dialogText">'+
    '<p class="name">'+CHARACTER_DATA[player2SelectedCharacter].name+'</p>'+
    '<p class="text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr!!</p>'+
    '</div>'+
    '</div>';

}

export function frontend_gameOverScreen(){
    loadGameOverScreen();
    setTimeout(() => {
        document.querySelector("article.game .resultScreen").classList.add("active");
        document.querySelector("article.game .resultScreen .matchOverInfo").classList.add("fadeIn");
    }, 200);
    setTimeout(() => {
        let matchStatsPlayers =  document.querySelectorAll("article.game .resultScreen .matchStatsPlayer");
        Array.prototype.forEach.call(matchStatsPlayers, function (matchStatsPlayer) {
            matchStatsPlayer.querySelector(".score").classList.add("fadeIn");
            matchStatsPlayer.querySelector(".roundsInfo").classList.add("fadeIn");
            matchStatsPlayer.querySelector(".matchStatsRounds").classList.add("fadeIn");
        });
    }, 200 * 2);
    setTimeout(() => {
        let rounds = document.querySelectorAll("article.game .resultScreen .matchStatsPlayer1 .matchStatsRounds >  div");
        Array.prototype.forEach.call(rounds, function (round, index) {
            setTimeout(() => {
                round.classList.add("fadeIn");
                document.querySelectorAll("article.game .resultScreen .matchStatsPlayer2 .matchStatsRounds >  div")[index].classList.add("fadeIn");
            }, 100 * index);  
        });
    }, 200 * 3);
    setTimeout(() => {
        document.querySelector("article.game .resultScreen .matchStatsPlayer .characterWrapper.winner img").classList.add("fadeIn");
    }, 200 * 5);
    setTimeout(() => {
        document.querySelector("article.game .resultScreen .matchStatsPlayer .characterWrapper.winner .dialogText").classList.add("fadeIn");
        document.body.addEventListener('keypress', openGameOverMenu);
    }, 200 * 6);
}

export function frontend_closeGameOverScreen(){
    document.body.removeEventListener('keypress', openGameOverMenu);
    switchUI();
    closeGameOverMenu();
    setTimeout(() => {
        document.querySelector("article.game .resultScreen .matchStatsPlayer .characterWrapper.winner .dialogText").classList.remove("fadeIn");
    }, 200);
    setTimeout(() => {
        document.querySelector("article.game .resultScreen .matchStatsPlayer .characterWrapper.winner img").classList.remove("fadeIn");
    }, 200 * 2);
    setTimeout(() => {
        let rounds = document.querySelectorAll("article.game .resultScreen .matchStatsPlayer1 .matchStatsRounds >  div");
        Array.prototype.forEach.call(rounds, function (round, index) {
            setTimeout(() => {
                round.classList.remove("fadeIn");
                document.querySelectorAll("article.game .resultScreen .matchStatsPlayer2 .matchStatsRounds >  div")[index].classList.remove("fadeIn");
            }, 100 * index);  
        });
    }, 200 * 4);
    setTimeout(() => {
        let matchStatsPlayers =  document.querySelectorAll("article.game .resultScreen .matchStatsPlayer");
        Array.prototype.forEach.call(matchStatsPlayers, function (matchStatsPlayer) {
            matchStatsPlayer.querySelector(".score").classList.remove("fadeIn");
            matchStatsPlayer.querySelector(".roundsInfo").classList.remove("fadeIn");
            matchStatsPlayer.querySelector(".matchStatsRounds").classList.remove("fadeIn");
        });
    }, 200 * 5);
    setTimeout(() => {
        document.querySelector("article.game .resultScreen").classList.remove("active");
        document.querySelector("article.game .resultScreen .matchOverInfo").classList.remove("fadeIn");
    }, 200 * 6);
    setTimeout(() => {
        showCanvasContent();
    }, 200 * 7);
}

function closeRoundEndScreen(){
    let elems = document.querySelectorAll("article.game .roundEndScreen .roundStatsPlayer1, article.game .roundEndScreen .roundStatsPlayer2");
    Array.prototype.forEach.call(elems, function (ele) {
        ele.animate(
            { width: ["50%", "0%"] },
            { duration: 500, iterations: 1, easing: "ease-out" }
        ).onfinish = (e) => {
            e.target.effect.target.style.width = "0%";
            e.target.effect.target.style.animation = "none";
        };
        setTimeout(() => {
            ele.style.removeProperty("width");
            ele.style.removeProperty("animation")
        }, 600);
    });
}

function fadeOutRoundScreen(){
    let elems = document.querySelectorAll("article.game .roundEndScreen.active .generalStats > *,article.game .roundEndScreen.active .roundStatsPlayer1 > *,article.game .roundEndScreen.active .roundStatsPlayer2 > *");
    Array.prototype.forEach.call(elems, function (ele) {
        ele.animate(
            { opacity: ["1", "0"] },
            { duration: 500, iterations: 1, easing: "ease-out" }
        ).onfinish = (e) => {
            e.target.effect.target.style.opacity = "0";
            e.target.effect.target.style.animation = "none";
        };
        setTimeout(() => {
            ele.style.removeProperty("opacity");
            ele.style.removeProperty("animation")
        }, 1200);
    });
}

export function frontend_showRoundEndScreen(scoreP1, scoreP2, firstTo) {
    document.querySelector("article.game .roundEndScreen .generalStats span").innerHTML = "FT"+firstTo;
    document.querySelector("article.game .roundEndScreen .roundStatsPlayer1 .score").innerHTML = scoreP1;
    document.querySelector("article.game .roundEndScreen .roundStatsPlayer2 .score").innerHTML = scoreP2;
    document.querySelector("article.game .roundEndScreen .roundStatsPlayer1 h4").innerHTML = CHARACTER_DATA[player1SelectedCharacter].name;
    document.querySelector("article.game .roundEndScreen .roundStatsPlayer2 h4").innerHTML = CHARACTER_DATA[player2SelectedCharacter].name;
    fadeOutUI();
    document.querySelector("article.game .roundEndScreen").classList.add("active");
    setTimeout(() => {
        switchUI();
        fadeInUI();
    }, 1000);
    setTimeout(() => {
        fadeOutRoundScreen();
        setTimeout(() => {
            closeRoundEndScreen();
            setTimeout(() => {
                document.querySelector("article.game .roundEndScreen").classList.remove("active");
                goToState(GAMESTATE.GAMESTART_CUTSCENE);
            }, 500);
        }, 500);
    }, 3000);
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
    document.querySelector("#gameTimer span").innerHTML = time[0] +":"+time[1];
}

function fadeOutUI() {
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        player.querySelector(".challenger-healthbar").classList.add("fadeOut");
        player.querySelector(".boss-healthbar").classList.add("fadeOut");
        player.querySelector(".challenger-abilitie").classList.add("fadeOut");
        player.querySelector(".boss-abilities").classList.add("fadeOut");
    });
}

export function fadeInUI() {
    let players = document.querySelectorAll("article.game .player");
    Array.prototype.forEach.call(players, function (player) {
        player.querySelector(".boss-healthbar").classList.remove("fadeOut");
        player.querySelector(".challenger-abilitie").classList.remove("fadeOut");
        player.querySelector(".boss-abilities").classList.remove("fadeOut");
    });
    document.querySelector("article.game .challenger .challenger-healthbar").classList.remove("fadeOut");
}

function updateChallengerHealthbar() {
    if(challenger != undefined){
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
    if(boss != undefined){
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
}

function updateChallengerSpecialCharge() {
    let ChargeBarWidth = 100 / challenger.specialMaxCharge * challenger.specialCharge
    if (ChargeBarWidth <= 100) {
        document.querySelector("article.game .challenger .challenger-abilitie .grace-bar > div").style.height = ChargeBarWidth + "%";
    }
}

function setupChallengerSpecialChargeBar() {
    if(challenger != undefined){
        document.querySelector("article.game .challenger .challenger-abilitie .grace-bar").innerHTML = "<div></div>";
        let barCount = Math.floor(challenger.specialMaxCharge / challenger.specialChargeRequired);
        for (let i = 0; i < barCount; i++) {
            document.querySelector("article.game .challenger .challenger-abilitie .grace-bar").innerHTML += '<span style="height:' + 100 / barCount + '%"></span>';
        }
    }
}

function updateDebugUI() {
    document.querySelector('#currentFPS > span').innerHTML = currentFPS;
    document.querySelector('#canvasRenderTime > span').innerHTML = canvasRenderTime;
    document.querySelector('#gameLogicTime > span').innerHTML = gameLogicTime;
    document.querySelector('#totalJSTime > span').innerHTML = totalJSTime;
    document.querySelector('#nonJSTime > span').innerHTML = nonJSTime;
    document.querySelector('#totalBulletsOnScreen > span').innerHTML = allBullets.length;
}


function updateBossChallengerHealthbarPosition() {
    if(challenger != undefined){
        document.querySelector(':root').style.setProperty('--bossChallengerHealthX', challenger.x * CANVAS_UNIT + 'px');
        document.querySelector(':root').style.setProperty('--bossChallengerHealthY', challenger.y * CANVAS_UNIT + 'px');
    }
}

function updateBossAbilities() {
    let bossAbilities = document.querySelectorAll("article.game .boss .boss-abilities > div");
    Array.prototype.forEach.call(bossAbilities, function (bossAbility, index) {
        let height = 100 - (100 / boss["ability" + (index + 1) + "CoolDownRequired"] * boss["ability" + (index + 1) + "CoolDown"]);
        bossAbility.querySelector(".ability-wrapper .overlay > div").style.height = height + "%"
    });
}

function setupBossAbilities() {
    if(boss != undefined){
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
        fadeInChallengerBossHealthbar();
        goToState(GAMESTATE.GAMEPLAY_REGULAR);
    }, 500);
}

function openGameOverMenu(){
    document.querySelector("article.game .resultScreen .menu-wrapper").classList.add("active");
}

function closeGameOverMenu(){
    document.querySelector("article.game .resultScreen .menu-wrapper").classList.remove("active");
}