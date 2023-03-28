export let sounds = {};

export function loadSounds(){
    sounds["bossShotSound"] = new Howl({
        src: ['sounds/bossShotSound.mp3']
    });
    sounds["clickSound"] = new Howl({
        src: ['sounds/clickSound.mp3']
    });
    sounds["backSound"] = new Howl({
        src: ['sounds/backSound.mp3']
    });
    sounds["challengerShotSound"] = new Howl({
        src: ['sounds/challengerShotSound.mp3']
    });
}