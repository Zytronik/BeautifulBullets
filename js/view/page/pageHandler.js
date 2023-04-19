export const PAGES = {
    CONFIG: "config",
    CHARACTER_SELECTION: "characterSelection",
    MAIN_MENU: "titleScreen",
    GAMEPLAY: "game",
}

export function view_showPage(PAGE) {
    var pages = document.querySelectorAll("main > article");
    Array.prototype.forEach.call(pages, function (page) {
        page.classList.add("hidePage");
    });
    document.querySelector("article." + PAGE).classList.remove("hidePage");
}

export function frontend_mainScreenTransition(){
    setTimeout(() => {
        frontend_showPage(PAGES.CHARACTER_SELECTION);
    }, 400);
    document.querySelector("article.titleScreen .whiteOverlay").animate(
        { opacity: [document.querySelector("article.titleScreen .whiteOverlay").style.opacity, 1] },
        { duration: 1000, iterations: 1, easing: "ease" }
    ).onfinish = (e) => {
        e.target.effect.target.opacity = 1;
    };
    document.querySelector("article.titleScreen").animate(
        { transform: [document.querySelector("article.titleScreen").style.transform, "scale(10) translateY(10%)"] },
        { duration: 1000, iterations: 1, easing: "ease" }
    ).onfinish = (e) => {
        e.target.effect.target.transform = "scale(0) translateY(0)";
    };
}