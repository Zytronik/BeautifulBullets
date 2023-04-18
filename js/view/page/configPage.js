import {CHALLENGER_BUTTONS, BOSS_BUTTONS,updateSetting} from "../../settings/inputSettings.js";

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

let selectedKey = "";

function selectingKey(setting){
    selectedKey = setting;
    document.querySelector("article.config .choosingKey").classList.toggle("active");
} 

export function setupConfigPage(){
    let player = document.querySelector("article.config .player");
    let settings = "";
    settings += '<div class="settings challengerSettings">';
    settings += '<h3>Challenger</h3>';
    for (var key in CHALLENGER_BUTTONS) {
        settings +=
            '<div class="setting"><div>' + CHALLENGER_SETTINGS[key] + '</div><div data-key="' + key + '">' + CHALLENGER_BUTTONS[key] + '</div></div>';
    }
    settings += '</div>';
    settings += '<div class="settings bossSettings">';
    settings += '<h3>Boss</h3>';
    for (var key in BOSS_BUTTONS) {
        settings +=
            '<div class="setting"><div>' + BOSS_SETTINGS[key] + '</div><div data-key="' + key + '">' + BOSS_BUTTONS[key] + '</div></div>';
    }
    settings += '</div>';
    player.querySelector(".playerSettings-wrapper").innerHTML += settings;

    bindEventListenersToKeys();

    window.addEventListener("keypress", (e) => {
        if (document.querySelector("article.config .choosingKey").classList.contains("active")) {
            if(selectedKey.closest(".bossSettings")){
                updateSetting(selectedKey.dataset.key, e.code, true);
            }else{
                updateSetting(selectedKey.dataset.key, e.code, false);
            }
            document.querySelector("article.config .choosingKey").classList.remove("active");
        }
    });
}

function bindEventListenersToKeys(){
    let settingsDOM = document.querySelectorAll("article.config .player .setting > div:last-of-type");
    Array.prototype.forEach.call(settingsDOM, function (settingDOM) {
        settingDOM.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("test");
            selectingKey(e.target);
        });
    });
}

export function updateConfigPage(){
    let player = document.querySelector("article.config .player");
    player.querySelector(".bossSettings").innerHTML = "<h3>Boss</h3>";
    let settings = "";
    for (var key in BOSS_BUTTONS) {
        settings +=
            '<div class="setting"><div>' + BOSS_SETTINGS[key] + '</div><div data-key="' + key + '">' + BOSS_BUTTONS[key] + '</div></div>';
    }
    player.querySelector(".bossSettings").innerHTML += settings;
    player.querySelector(".challengerSettings").innerHTML = "<h3>Challenger</h3>";
    settings = "";
    for (var key in CHALLENGER_BUTTONS) {
        settings +=
            '<div class="setting"><div>' + CHALLENGER_SETTINGS[key] + '</div><div data-key="' + key + '">' + CHALLENGER_BUTTONS[key] + '</div></div>';
    }
    player.querySelector(".challengerSettings").innerHTML += settings;
    bindEventListenersToKeys();
}