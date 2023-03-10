import { CHARACTER_DATA } from "./main.js"

export function loadUI() {
    //https://stackoverflow.com/questions/1223764/how-to-trap-double-key-press-in-javascript in game leave

    document.querySelector("#play").addEventListener("click", function (e) {
        e.preventDefault();
        showPage("characterSelection");
    });

    document.querySelector("#config").addEventListener("click", function (e) {
        e.preventDefault();
        showPage("config");
    });

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            showPage("titleScreen")
        }
    };

    function showPage(pageClass) {
        var pages = document.querySelectorAll("main > article");
        Array.prototype.forEach.call(pages, function (page) {
            page.classList.add("hidePage");
        });
        document.querySelector("article." + pageClass).classList.remove("hidePage");
    }

    loadCharacterSelectionScreen();

    function loadCharacterSelectionScreen() {
        var players = document.querySelectorAll("article.characterSelection .player");
        Array.prototype.forEach.call(players, function (player) {
            loadCharacters(player);
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
                moveLeft()
            });
            player.querySelector("a.control_next").addEventListener("click", function (e) {
                e.preventDefault();
                moveRight()
            });
        });
    }

    function getHighestStats(){
        let stats = {
            "speed" : 0,
            "health" : 0,
            "homing" : 0,
            "fireRate" : 0,
            "bulletDamage" : 0,
        };
        for (var key in CHARACTER_DATA) {
            for (const [k,v] of Object.entries(stats)) {
                if(CHARACTER_DATA[key]["challenger"][k] !== undefined){
                    if(CHARACTER_DATA[key]["challenger"][k] > stats[k]){
                        stats[k] = CHARACTER_DATA[key]["challenger"][k];
                    }
                }
            }
        }
        return stats;
    }

    function calculateStat(stat, value){
        var highest = getHighestStats();
        return 100 / highest[stat] * value;
    }

    function loadCharacters(player) {
        let characters = "";
        getHighestStats();
        for (var key in CHARACTER_DATA) {
            //console.log(CHARACTER_DATA[key]);
            characters +=
            '<div class="character">'+
				'<div class="character-wrapper">'+
					'<h3>'+CHARACTER_DATA[key]["name"]+'</h3>'+
					'<div class="img-wrapper">'+
						'<img src="'+CHARACTER_DATA[key]["spriteUrl"]+'">'+
					'</div>'+
					'<div class="character-desc">'+
						'<div class="challanger">'+
							'<h4>Challenger</h4>'+
							'<div class="stat speed">'+
                                '<p>Speed | '+CHARACTER_DATA[key]["challenger"]["speed"]+'</p>'+
                                '<div class="stat-bar">'+
                                '<div style="width: '+calculateStat("speed", CHARACTER_DATA[key]["challenger"]["speed"])+'%"></div>'+
                                '<span></span><span></span><span></span><span></span><span></span>'+
                            '</div>'+
                            '</div>'+
                            '<div class="stat health">'+
                                '<p>Health | '+CHARACTER_DATA[key]["challenger"]["health"]+'</p>'+
                                '<div class="stat-bar">'+
                                '<div style="width: '+calculateStat("health", CHARACTER_DATA[key]["challenger"]["health"])+'%"></div>'+
                                '<span></span><span></span><span></span><span></span><span></span>'+
                            '</div>'+
                            '</div>'+
                            '<div class="stat homing">'+
                                '<p>Homing | '+CHARACTER_DATA[key]["challenger"]["homing"]+'</p>'+
                                '<div class="stat-bar">'+
                                '<div style="width: '+calculateStat("homing", CHARACTER_DATA[key]["challenger"]["homing"])+'%"></div>'+
                                '<span></span><span></span><span></span><span></span><span></span>'+
                            '</div>'+
                            '</div>'+
                            '<div class="stat fireRate">'+
                                '<p>Fire-Rate | '+CHARACTER_DATA[key]["challenger"]["fireRate"]+'</p>'+
                                '<div class="stat-bar">'+
                                '<div style="width: '+calculateStat("fireRate", CHARACTER_DATA[key]["challenger"]["fireRate"])+'%"></div>'+
                                '<span></span><span></span><span></span><span></span><span></span>'+
                            '</div>'+
                            '</div>'+
                            '<div class="stat bulletDamage">'+
                                '<p>Damage | '+CHARACTER_DATA[key]["challenger"]["bulletDamage"]+'</p>'+
                                '<div class="stat-bar">'+
                                '<div style="width: '+calculateStat("bulletDamage", CHARACTER_DATA[key]["challenger"]["bulletDamage"])+'%"></div>'+
                                '<span></span><span></span><span></span><span></span><span></span>'+
                            '</div>'+
                            '</div>'+
							'<p>A:<span>Bullet Shield</span></p>'+
						'</div>'+
						'<div class="boss">'+
							'<h4>Boss</h4>'+
							'<p>A1:<span>Speed Up Time</span></p>'+
							'<p>A2:<span>Spawn Familiars</span></p>'+
							'<p>A3:<span>4 Wide Hell</span></p>'+
							'<p>Special Move:<span>Reverse Hell</span></p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
            '</div>';
        }
        player.querySelector(".characters").innerHTML = characters;
    }
};