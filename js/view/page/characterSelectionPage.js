import { CHARACTER_DATA } from "../../data/characters.js";
import { goToState, GAMESTATE } from "../../gameStateManager.js";
import { highestStats } from "../windowOnLoad.js";
import { sounds } from "../../sound/sound.js";

let rdyUpd = [false, false];
export let player1SelectedCharacter;
export let player2SelectedCharacter;

export function frontend_resetRdyUps() {
    rdyUpd = [false, false];
    document.querySelector("#rdyButton1").classList.remove("ready");
    document.querySelector("#rdyButton2").classList.remove("ready");
}

export function frontend_getSelectedCharacters() {
    return [player1SelectedCharacter, player2SelectedCharacter];
}

export function rdyUpPlayer1(rdyButton) {
    rdyUpd[0] = !rdyUpd[0];
    rdyButton.classList.toggle("ready");
    checkRdyButton();
}

export function rdyUpPlayer2(rdyButton) {
    rdyUpd[1] = !rdyUpd[1];
    rdyButton.classList.toggle("ready");
    checkRdyButton();
}

function checkRdyButton() {
    if (rdyUpd[0] && rdyUpd[1]) {
        player1SelectedCharacter = document.querySelector("article.characterSelection #player1 .characters").children[1].dataset.character;
        player2SelectedCharacter = document.querySelector("article.characterSelection #player2 .characters").children[1].dataset.character;
        goToState(GAMESTATE.GAMESTART_CUTSCENE);
    }
}

export function loadCharacterSelectionScreen() {
    var players = document.querySelectorAll("article.characterSelection .player");
    Array.prototype.forEach.call(players, function (player, index) {
        loadCharactersUI(player);
        let slides = player.querySelector(".characters .character");
        let slidesContainer = player.querySelector(".characters");
        let playerContainer = player;
        let slideCount = slidesContainer.children.length;
        let slideWidth = slides.offsetWidth;
        let slideHeight = slides.offsetHeight;
        let sliderUlWidth = slideCount * slideWidth;

        playerContainer.style.width = slideWidth + "px";
        playerContainer.style.height = slideHeight + "px";

        slidesContainer.style.width = sliderUlWidth + "px";
        slidesContainer.style.marginLeft = -slideWidth + "px";

        slidesContainer.prepend(slidesContainer.children[slideCount - 1]);

        function moveLeft() {
            slidesContainer.animate(
                { left: [slidesContainer.style.left + "px", slideWidth + "px"] },
                { duration: 200, iterations: 1, easing: "ease-out" }
            ).onfinish = (e) => {
                e.target.effect.target.style.left = slideWidth + "px";
                slidesContainer.prepend(slidesContainer.children[slideCount - 1]);
                slidesContainer.style.left = "0px";
            };
        };

        function moveRight() {
            slidesContainer.animate(
                { left: [slidesContainer.style.left + "px", -slideWidth + "px"] },
                { duration: 200, iterations: 1, easing: "ease-out" }
            ).onfinish = (e) => {
                e.target.effect.target.style.left = -slideWidth + "px";
                slidesContainer.append(slidesContainer.children[0]);
                slidesContainer.style.left = "0px";
            };
        };

        player.querySelector("a.control_prev").addEventListener("click", function (e) {
            e.preventDefault();
            sounds["clickSound"].play();
            if (!rdyUpd[index]) {
                moveLeft()
            }
        });
        player.querySelector("a.control_next").addEventListener("click", function (e) {
            e.preventDefault();
            sounds["clickSound"].play();
            if (!rdyUpd[index]) {
                moveRight()
            }
        });
    });
}

function loadCharactersUI(player) {
    let characters = "";
    for (const key in CHARACTER_DATA) {
        characters +=
            '<div class="character" data-character="' + key + '">' +
            '<div class="character-wrapper">' +
            '<h3>' + CHARACTER_DATA[key]["name"] + '</h3>' +
            '<div class="img-wrapper">' +
            '<img src="' + CHARACTER_DATA[key]["spriteUrl"] + '">' +
            '</div>' +
            '<div class="character-desc">' +
            '<div class="challanger">' +
            '<h4>Challenger</h4>';

        for (const i in CHARACTER_DATA[key]["challenger"]["stats"]) {
            let challengerStat = CHARACTER_DATA[key]["challenger"]["stats"][i];
            characters +=
                //stats challenger
                '<div class="stat ' + i + '">' +
                '<p>' + i + ' | ' + challengerStat + '</p>' +
                '<div class="stat-bar">' +
                '<div style="width: ' + calculateStat(i, challengerStat, "challenger") + '%"></div>' +
                '<span></span><span></span><span></span><span></span><span></span>' +
                '</div>' +
                '</div>';
        }
        characters +=
            //special challenger
            '<div class="challengerSpecial">' +
            '<h5>' + CHARACTER_DATA[key]["challenger"]["special"]["abilityName"] + '</h5>' +
            '<p>' + CHARACTER_DATA[key]["challenger"]["special"]["description"] + '</p>' +
            '</div>';
        characters +=
            '</div>' +
            '<div class="boss">' +
            '<h4>Boss</h4>';
        for (const i in CHARACTER_DATA[key]["boss"]["stats"]) {
            let bossStat = CHARACTER_DATA[key]["boss"]["stats"][i];
            characters +=
                //stats boss
                '<div class="stat ' + i + '">' +
                '<p>' + i + ' | ' + bossStat + '</p>' +
                '<div class="stat-bar">' +
                '<div style="width: ' + calculateStat(i, bossStat, "boss") + '%"></div>' +
                '<span></span><span></span><span></span><span></span><span></span>' +
                '</div>' +
                '</div>';
        }
        characters +=
            '<div class="icon-wrapper">';
        characters +=
            //passive boss
            '<div class="abilty-wrapper">' +
            '<img class="icon" src="' + CHARACTER_DATA[key]["boss"]["passive"]["iconUrl"] + '" alt="' + CHARACTER_DATA[key]["boss"]["passive"]["abilityName"] + '">' +
            '<div class="passive">' +
            '<h5>' + CHARACTER_DATA[key]["boss"]["passive"]["abilityName"] + '</h5>' +
            '<p>' + CHARACTER_DATA[key]["boss"]["passive"]["description"] + '</p>' +
            '</div>' +
            '</div>';
        for (const i in CHARACTER_DATA[key]["boss"]["abilities"]) {
            let ability = CHARACTER_DATA[key]["boss"]["abilities"][i];
            characters +=
                //abilities boss
                '<div class="abilty-wrapper">' +
                '<img class="icon" src="' + ability["iconUrl"] + '" alt="' + ability["abilityName"] + '">' +
                '<div class="ability">' +
                '<h5>' + ability["abilityName"] + '</h5>' +
                '<p>' + ability["description"] + '</p>' +
                '</div>' +
                '</div>';
        }
        characters +=
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    player.querySelector(".characters").innerHTML = characters;
}

function calculateStat(stat, value, player) {
    return 100 / highestStats[player][stat] * value;
}

export function getHighestStats() {
    let stats = {
        "challenger": [],
        "boss": [],
    };
    for (var key in CHARACTER_DATA) {
        for (const k in CHARACTER_DATA[key]["challenger"]["stats"]) {
            if (stats["challenger"][k] !== undefined) {
                if (CHARACTER_DATA[key]["challenger"]["stats"][k] >= stats["challenger"][k]) {
                    stats["challenger"][k] = CHARACTER_DATA[key]["challenger"]["stats"][k];
                }
            } else {
                stats["challenger"][k] = CHARACTER_DATA[key]["challenger"]["stats"][k];
            }
        }
        for (const k in CHARACTER_DATA[key]["boss"]["stats"]) {
            if (stats["boss"][k] !== undefined) {
                if (CHARACTER_DATA[key]["boss"]["stats"][k] >= stats["boss"][k]) {
                    stats["boss"][k] = CHARACTER_DATA[key]["boss"]["stats"][k];
                }
            } else {
                stats["boss"][k] = CHARACTER_DATA[key]["boss"]["stats"][k];
            }
        }
    }
    return stats;
}