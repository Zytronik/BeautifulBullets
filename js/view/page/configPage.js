import { PLAYER_ONE_BUTTONS, PLAYER_TWO_BUTTONS, updateSetting, getAndOverrideByCookies } from "../../settings/inputSettings.js";

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

function selectingKey(setting) {
    selectedKey = setting;
    document.querySelector("article.config .choosingKey").classList.toggle("active");
}

export function setupConfigPage() {
    getAndOverrideByCookies()
    setupUI();
    bindEventListenersToKeys();

    window.addEventListener("keypress", (e) => {
        handleKeyInputListeners(e.code);
    });

    window.addEventListener("mousedown", (e)=>{
        handleKeyInputListeners(e.buttons);
    });
}

function checkIfKeyIsValid(keyCode, type, isPlayerOne){
    let isValid = true;
    let currentPlayer = PLAYER_TWO_BUTTONS;
    let otherPlayer = PLAYER_ONE_BUTTONS;
    if(isPlayerOne){
        currentPlayer = PLAYER_ONE_BUTTONS;
        otherPlayer = PLAYER_TWO_BUTTONS;
    }
    if(type === "movement"){
        for(let t in currentPlayer){ // check complete current Player
            for(let k in currentPlayer[t]){
                if(keyCode === currentPlayer[t][k]){
                    isValid = false;
                }
            }
        }
        for(let t in otherPlayer){ // check complete other Player
            for(let k in otherPlayer[t]){
                if(keyCode === otherPlayer[t][k]){
                    isValid = false;
                }
            }
        }
    }else if(type === "challenger"){
        for(let t in currentPlayer){ // check current Player Movement and Challenger
            if(t === "movement" || t === "challenger"){
                for(let k in currentPlayer[t]){
                    if(keyCode === currentPlayer[t][k]){
                        isValid = false;
                    }
                }
            }
        }
        for(let t in otherPlayer){ // check other Player Movement and Boss
            if(t === "movement" || t === "boss"){
                for(let k in otherPlayer[t]){
                    if(keyCode === otherPlayer[t][k]){
                        isValid = false;
                    }
                }
            }
        }
    }else{
        for(let t in currentPlayer){ // check current Player Movement and Boss
            if(t === "movement" || t === "boss"){
                for(let k in currentPlayer[t]){
                    if(keyCode === currentPlayer[t][k]){
                        isValid = false;
                    }
                }
            }
        }
        for(let t in otherPlayer){ // check other Player Movement and Challenger
            if(t === "movement" || t === "challenger"){
                for(let k in otherPlayer[t]){
                    if(keyCode === otherPlayer[t][k]){
                        isValid = false;
                    }
                }
            }
        }
    }
    return isValid;
}

function handleKeyInputListeners(keyCode) {
    if (document.querySelector("article.config .choosingKey").classList.contains("active")) {
        let isPlayerOne = false;
        if (selectedKey.closest(".player1")) {
            isPlayerOne = true;
        }
        let type = "challenger";
        if (selectedKey.closest(".movementSettings")) {
            type = "movement";
        }
        if (selectedKey.closest(".bossSettings")) {
            type = "boss";
        }
        if (checkIfKeyIsValid(keyCode, type, isPlayerOne)) {
            updateSetting(selectedKey.dataset.key, keyCode, type, isPlayerOne);
            document.querySelector("article.config .choosingKey").classList.remove("active");
        }else{
            document.querySelector("article.config .choosingKey span").classList.add("shake");
            setTimeout(() => {
                document.querySelector("article.config .choosingKey span").classList.remove("shake");
            }, 300);
        }
    }
}

function bindEventListenersToKeys() {
    let settingsDOM = document.querySelectorAll("article.config .player .setting > div:last-of-type");
    Array.prototype.forEach.call(settingsDOM, function (settingDOM) {
        settingDOM.addEventListener("click", function (e) {
            e.preventDefault();
            selectingKey(e.target);
        });
    });
}

export function updateConfigPage() {
    setInputsCookie("player1Inputs", JSON.stringify(PLAYER_ONE_BUTTONS), 2100);
    setInputsCookie("player2Inputs", JSON.stringify(PLAYER_TWO_BUTTONS), 2100);
    setupUI();
    bindEventListenersToKeys();
}

function setInputsCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getInputsCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

function setupUI(){
    let playerButtons;
    let players = document.querySelectorAll("article.config .players > div");
    Array.prototype.forEach.call(players, function (player, index) {
        player.querySelector(".playerSettings-wrapper").innerHTML = "";
        if (index == 0) {
            playerButtons = PLAYER_ONE_BUTTONS;
        } else {
            playerButtons = PLAYER_TWO_BUTTONS;
        }
        let settings = "";
        settings += "<h2>Player " + (index + 1) + "</h2>";
        settings += '<div class="settings movementSettings">';
        settings += '<h3>Movement</h3>';
        for (var key in playerButtons.movement) {
            settings +=
                '<div class="setting"><div>' + CHALLENGER_SETTINGS[key] + '</div><div data-key="' + key + '">' + playerButtons.movement[key] + '</div></div>';
        }
        settings += '</div>';
        settings += '<div class="settings challengerSettings">';
        settings += '<h3>Challenger</h3>';
        for (var key in playerButtons.challenger) {
            settings +=
                '<div class="setting"><div>' + CHALLENGER_SETTINGS[key] + '</div><div data-key="' + key + '">' + playerButtons.challenger[key] + '</div></div>';
        }
        settings += '</div>';
        settings += '<div class="settings bossSettings">';
        settings += '<h3>Boss</h3>';
        for (var key in playerButtons.boss) {
            settings +=
                '<div class="setting"><div>' + BOSS_SETTINGS[key] + '</div><div data-key="' + key + '">' + playerButtons.boss[key] + '</div></div>';
        }
        settings += '</div>';
        player.querySelector(".playerSettings-wrapper").innerHTML += settings;
    });
}