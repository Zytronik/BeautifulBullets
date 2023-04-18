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