import { FPS, BOARD_HEIGHT, BOARD_WIDTH } from "../settings/gameSettings.js";
import { playCountDown, showCutSceneBars} from "./gamePage.js";
import { boss, challenger, player1Canvas, player2Canvas } from "../main.js"; 

let createCutSceneLoopOnce = true;

export function playGameStartCutscene(){
    if (!playingCutScene) {
        boss.y = -BOARD_HEIGHT / 6;
        boss.x = BOARD_WIDTH / 2;
        challenger.x = BOARD_WIDTH / 2;
        challenger.y = BOARD_HEIGHT * 7 / 6;
        if(createCutSceneLoopOnce){
            createCutSceneLoop();
        }else{
            player1Canvas.characterApp.ticker.start();
        }
        playingCutScene = true;
        showCutSceneBars();
    }else{
        if(boss.y < BOARD_HEIGHT / 6){
            boss.y += 5;
        }
        if(challenger.y > BOARD_HEIGHT * 5 / 6){
            challenger.y -= 5;
        }
        if(boss.y >= BOARD_HEIGHT / 6 && challenger.y <= BOARD_HEIGHT * 5 / 6){
            player1Canvas.characterApp.ticker.stop();
            playingCutScene = false;
            playCountDown();
        }
    }
}

let playingCutScene = false;

function createCutSceneLoop() {
    createCutSceneLoopOnce = false;
    setTimeout(() => {
        player1Canvas.characterApp.ticker.add(() => {
            console.log("cutscene loop");
            playGameStartCutscene();
            player1Canvas.updateCanvas();
            player2Canvas.updateCanvas();
        });
    }, 100);
}