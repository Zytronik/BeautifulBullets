import {CHALLENGER_BUTTONS, BOSS_BUTTONS} from "../settings/inputSettings.js";

let CHALLENGER_SETTINGS = {
    left: "Move Left",
    right: "Move Right",
    down: "Move Down",
    up: "Move Up",
    shift: "Focus Movement",
    special: "Special Ability",
}

export let BOSS_SETTINGS = {
    left: "Move Left",
    right: "Move Right",
    down: "Move Down",
    up: "Move Up",
    ability1: "Cast Ability 1",
    ability2: "Cast Ability 2",
    ability3: "Cast Ability 3",
}

function selectingKey(setting){
    console.log(setting);
    document.querySelector("article.config .choosingKey").classList.toggle("active");
} 

export function setupConfigPage(){
    let players = document.querySelectorAll("article.config .player");
    Array.prototype.forEach.call(players, function (player) {
        let settings = "";
        settings += '<div class="settings challengerSettings">';
        settings += '<h3>Challenger</h3>';
        for (var key in CHALLENGER_BUTTONS) {
            settings += 
            '<div class="setting"><div>'+CHALLENGER_SETTINGS[key]+'</div><div>'+CHALLENGER_BUTTONS[key]+'</div></div>';
        }
        settings += '</div>';
        settings += '<div class="settings bossSettings">';
        settings += '<h3>Boss</h3>';
        for (var key in BOSS_BUTTONS) {
            settings += 
            '<div class="setting"><div>'+BOSS_SETTINGS[key]+'</div><div>'+BOSS_BUTTONS[key]+'</div></div>';
        }
        settings += '</div>';
        player.querySelector(".playerSettings-wrapper").innerHTML += settings;
    });

    let settingsDOM = document.querySelectorAll("article.config .player .setting > div:last-of-type");
    Array.prototype.forEach.call(settingsDOM, function (settingDOM) {
        settingDOM.addEventListener("click", function (e) {
            e.preventDefault();
            selectingKey(e.target);
        });
    });

    window.addEventListener("keypress", (e) => {
        if (document.querySelector("article.config .choosingKey").classList.contains("active")) {
            console.log(e.code);
            document.querySelector("article.config .choosingKey").classList.toggle("active");
        }
    });
}