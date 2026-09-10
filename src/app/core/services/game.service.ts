import { inject, Injectable, signal } from '@angular/core';
import { Graphics, Application, Assets } from 'pixi.js';
import { PLAYER_CONFIG } from '../player/player.config';
import { PlayerService } from './player.service';
import { InputService } from './input.service';
import { PlayerSprite } from '../player/player-sprite';

@Injectable()
export class GameService {
  private app?: Application;

  private readonly inputService = inject(InputService);
  private readonly playerService = inject(PlayerService);

  private playerGraphics?: Graphics;
  private playerSprite?: PlayerSprite;

  readonly elapsedTime = signal(0);
  private playing = true;

  async initialize(app: Application): Promise<void> {
    this.app = app;

    this.playerService.initialize({
      x: app.screen.width / 2,
      y: app.screen.height / 2,
    });

    this.playerGraphics = new Graphics()
      .circle(0, 0, PLAYER_CONFIG.radius)
      .fill(0xff0008);

    const texture = await Assets.load('/sprites/player.png');

    this.playerSprite = new PlayerSprite(texture);

    this.playerSprite.setHeight(
      app.screen.height * PLAYER_CONFIG.heightRatio,
    );

    app.stage.addChild(this.playerSprite.sprite);
    app.stage.addChild(this.playerGraphics);
  }

  start(): void {
    if (!this.app) {
      throw new Error('Game has not been initialized.');
    }

    this.inputService.start();
    this.app.ticker.add(this.update);
  }

  stop(): void {
    if (!this.app) {
      return;
    }

    this.app.ticker.remove(this.update);
    this.inputService.stop();
  }

  play(): void {
    this.playing = true;
  }

  pause(): void {
    this.playing = false;
  }

  isPlaying(): boolean {
    return this.playing;
  }

  getElapsedTime(): number {
    return this.elapsedTime();
  }

  getFps(): number {
    return this.app?.ticker.FPS ?? 0;
  }

  private readonly update = (): void => {
    if (!this.app || !this.playerService || !this.playerGraphics || !this.playing) {
      return;
    }

    const deltaSeconds = this.app.ticker.deltaMS / 1000;

    this.elapsedTime.update(
      (time) => time + deltaSeconds,
    );

    const movement = this.inputService.getMovement();

    this.playerService.update(
      movement,
      deltaSeconds,
      {
        width: this.app.screen.width,
        height: this.app.screen.height,
      },
    );

    this.syncPlayerSprite();
    this.syncPlayerGraphics();
  };

  private syncPlayerGraphics(): void {
    if (!this.playerService || !this.playerGraphics) {
      return;
    }

    const position = this.playerService.getPosition();

    this.playerGraphics.position.set(
      position.x,
      position.y,
    );
  }

  private syncPlayerSprite(): void {
    if (!this.playerSprite) {
      return;
    }

    const position = this.playerService.getPosition();
    const direction = this.playerService.getDirection();

    this.playerSprite.setPosition(
      position.x,
      position.y,
    );

    this.playerSprite.setDirection(direction);
  }
}