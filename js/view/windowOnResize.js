import { player1Canvas, player2Canvas } from "../main.js";

window.onresize = function () {
    setTimeout(() => {
        if (player1Canvas !== undefined && player2Canvas !== undefined) {
            player1Canvas.resizeCanvas();
            player2Canvas.resizeCanvas();
        }
    }, 800);
}