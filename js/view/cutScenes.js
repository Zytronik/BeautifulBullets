import { FPS, BOARD_HEIGHT, BOARD_WIDTH } from "../settings/gameSettings.js";
import { playCountDown, showCutSceneBars} from "./gamePage.js";
import { boss, challenger, player1Canvas, player2Canvas } from "../main.js"; 

export function playGameStartCutscene(){
    if (!playingCutScene) {
        boss.y = -BOARD_HEIGHT / 6;
        boss.x = BOARD_WIDTH / 2;
        challenger.x = BOARD_WIDTH / 2;
        challenger.y = BOARD_HEIGHT * 7 / 6;
        setTimeout(() => {
            playingCutScene = true;
            cutSceneLoop();
        }, 100);
        showCutSceneBars();
    }else{
        if(boss.y < BOARD_HEIGHT / 6){
            boss.y += 5;
        }
        if(challenger.y > BOARD_HEIGHT * 5 / 6){
            challenger.y -= 5;
        }
        if(boss.y >= BOARD_HEIGHT / 6 && challenger.y <= BOARD_HEIGHT * 5 / 6){
            playingCutScene = false;
            playCountDown();
        }
    }
}

let currentlyAtCS = 0;
let nextCalculationAtCS = 0;
let playingCutScene = false;

function cutSceneLoop() {
    do {
        currentlyAtCS = performance.now();
    } while (currentlyAtCS < nextCalculationAtCS);
    let amountWaitedTooLong = currentlyAtCS - nextCalculationAtCS;
    if (amountWaitedTooLong > 1000 / FPS) {
        amountWaitedTooLong = 0
    }
    console.log("we looping");
    playGameStartCutscene();
    player1Canvas.updateCanvas();
    player2Canvas.updateCanvas();

    nextCalculationAtCS = currentlyAtCS + 1000 / FPS - amountWaitedTooLong;
    if(playingCutScene){
        requestAnimationFrame(cutSceneLoop);
    }
}