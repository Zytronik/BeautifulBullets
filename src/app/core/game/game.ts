import { Application, Graphics } from 'pixi.js';

import { KeyboardInput } from '../input/keyboard-input';
import { PLAYER_CONFIG } from '../player/player.config';
import { Player } from '../player/player';

export class Game {
    private readonly keyboardInput = new KeyboardInput();
    private readonly player: Player;
    private readonly playerGraphics: Graphics;

    constructor(private readonly app: Application) {
        this.player = new Player({
            x: app.screen.width / 2,
            y: app.screen.height / 2,
        });

        this.playerGraphics = new Graphics()
            .circle(0, 0, PLAYER_CONFIG.radius)
            .fill(0xffffff);

        this.app.stage.addChild(this.playerGraphics);
    }

    start(): void {
        this.keyboardInput.start();
        this.app.ticker.add(this.update);
    }

    stop(): void {
        this.app.ticker.remove(this.update);
        this.keyboardInput.stop();
    }

    private readonly update = (): void => {
        const deltaSeconds = this.app.ticker.deltaMS / 1000;

        const movement = this.keyboardInput.getMovement();

        this.player.update(
            movement,
            deltaSeconds,
            {
                width: this.app.screen.width,
                height: this.app.screen.height,
            },
        );

        this.syncPlayerGraphics();
    };

    private syncPlayerGraphics(): void {
        const position = this.player.getPosition();

        this.playerGraphics.position.set(
            position.x,
            position.y,
        );
    }
}