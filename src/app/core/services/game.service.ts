import {
  inject,
  Injectable,
  signal,
} from '@angular/core';
import {
  Application,
  Assets,
  Graphics,
} from 'pixi.js';
import { PLAYER_CONFIG } from '../player/player.config';
import { ENEMY_CONFIG } from '../enemy/enemy.config';
import { PlayerService } from './player.service';
import { EnemyService } from './enemy.service';
import { InputService } from './input.service';
import { PlayerSprite } from '../player/player-sprite';
import { EnemySprite } from '../enemy/enemy-sprite';

@Injectable()
export class GameService {
  private app?: Application;

  private readonly inputService =
    inject(InputService);

  private readonly playerService =
    inject(PlayerService);

  private readonly enemyService =
    inject(EnemyService);

  private playerGraphics?: Graphics;
  private playerSprite?: PlayerSprite;

  private enemyGraphics?: Graphics;
  private enemySprite?: EnemySprite;

  readonly elapsedTime = signal(0);

  private playing = true;

  async initialize(
    app: Application,
  ): Promise<void> {
    this.app = app;

    this.playerService.initialize({
      x: app.screen.width * 0.5,
      y: app.screen.height * 0.9,
    });

    const playerRadius =
      app.screen.height *
      PLAYER_CONFIG.radiusRatio;

    this.playerGraphics = new Graphics()
      .circle(
        0,
        0,
        playerRadius,
      )
      .fill(0xff0008);

    const playerTexture = await Assets.load(
      '/sprites/player.png',
    );

    this.playerSprite =
      new PlayerSprite(playerTexture);

    this.playerSprite.setHeight(
      app.screen.height *
      PLAYER_CONFIG.heightRatio,
    );

    app.stage.addChild(
      this.playerSprite.sprite,
    );

    app.stage.addChild(
      this.playerGraphics,
    );

    this.enemyService.initialize({
      x: app.screen.width * 0.5,
      y: app.screen.height * 0.1,
    });

    const enemyRadius =
      app.screen.height *
      ENEMY_CONFIG.radiusRatio;

    this.enemyGraphics = new Graphics()
      .circle(
        0,
        0,
        enemyRadius,
      )
      .fill(0x00ff00);

    const enemyTexture = await Assets.load(
      '/sprites/enemy.png',
    );

    this.enemySprite =
      new EnemySprite(enemyTexture);

    this.enemySprite.setHeight(
      app.screen.height *
      ENEMY_CONFIG.heightRatio,
    );

    app.stage.addChild(
      this.enemySprite.sprite,
    );

    app.stage.addChild(
      this.enemyGraphics,
    );

    this.syncPlayer();
    this.syncEnemy();
  }

  start(): void {
    if (!this.app) {
      throw new Error(
        'Game has not been initialized.',
      );
    }

    this.inputService.start();

    this.app.ticker.add(
      this.update,
    );
  }

  stop(): void {
    if (!this.app) {
      return;
    }

    this.app.ticker.remove(
      this.update,
    );

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
    if (
      !this.app ||
      !this.playing
    ) {
      return;
    }

    const deltaSeconds =
      this.app.ticker.deltaMS / 1000;

    this.elapsedTime.update(
      (time) =>
        time + deltaSeconds,
    );

    const movement =
      this.inputService.getMovement();

    this.playerService.update(
      movement,
      deltaSeconds,
      {
        width: this.app.screen.width,
        height: this.app.screen.height,
      },
    );

    this.resolvePlayerEnemyCollision();

    this.syncPlayer();
    this.syncEnemy();
  };

  private syncPlayer(): void {
    if (
      !this.playerSprite ||
      !this.playerGraphics
    ) {
      return;
    }

    const position =
      this.playerService.getPosition();

    const direction =
      this.playerService.getDirection();

    this.playerSprite.setPosition(
      position.x,
      position.y,
    );

    this.playerSprite.setDirection(
      direction,
    );

    this.playerGraphics.position.set(
      position.x,
      position.y,
    );
  }

  private syncEnemy(): void {
    if (
      !this.enemySprite ||
      !this.enemyGraphics
    ) {
      return;
    }

    const position =
      this.enemyService.getPosition();

    this.enemySprite.setPosition(
      position.x,
      position.y,
    );

    this.enemyGraphics.position.set(
      position.x,
      position.y,
    );
  }

  private resolvePlayerEnemyCollision(): void {
    if (!this.app) {
      return;
    }

    const playerPosition =
      this.playerService.getPosition();

    const enemyPosition =
      this.enemyService.getPosition();

    const playerRadius =
      this.app.screen.height *
      PLAYER_CONFIG.radiusRatio;

    const enemyRadius =
      this.app.screen.height *
      ENEMY_CONFIG.radiusRatio;

    const dx =
      playerPosition.x -
      enemyPosition.x;

    const dy =
      playerPosition.y -
      enemyPosition.y;

    const distance = Math.hypot(dx, dy);

    const minimumDistance =
      playerRadius + enemyRadius;

    if (distance >= minimumDistance) {
      return;
    }

    if (distance === 0) {
      return;
    }

    const overlap =
      minimumDistance - distance;

    const normalX = dx / distance;
    const normalY = dy / distance;

    this.playerService.moveBy(
      normalX * overlap,
      normalY * overlap,
    );
  }
}