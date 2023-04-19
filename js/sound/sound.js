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
        src: ['sounds/challengerShotSound.mp3'],
        volume: 0.2
    });
    sounds["fireworkBoom"] = new Howl({
        src: ['sounds/fireworkBoom.mp3'],
        volume: 0.3
    });
    sounds["pop"] = new Howl({
        src: ['sounds/pop.mp3'],
        volume: 0.2
    });
    sounds["firecracker"] = new Howl({
        src: ['sounds/firecracker.mp3'],
        volume: 0.5
    });
    sounds["fireworkFuse"] = new Howl({
        src: ['sounds/fireworkFuse.mp3'],
        volume: 0.6
    });
    sounds["soundtrack"] = new Howl({
        src: ['sounds/soundtrack.mp3'],
        volume: 1
    });
    sounds["chakramWoosh"] = new Howl({
        src: ['sounds/chakramWoosh.mp3']
    });
}