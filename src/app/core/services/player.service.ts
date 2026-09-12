import {
  inject,
  Injectable,
  signal,
} from '@angular/core';
import {
  PlayerDirection,
  PlayerPosition,
} from '../types/player.types';
import { PLAYER_CONFIG } from '../player/player.config';
import { InputService } from './input.service';

@Injectable()
export class PlayerService {
  private readonly inputService =
    inject(InputService);

  readonly health = signal(PLAYER_CONFIG.health);

  private position: PlayerPosition = {
    x: 0,
    y: 0,
  };

  private direction: PlayerDirection =
    'idle';

  private inputEnabled =
    PLAYER_CONFIG.inputEnabled;

  initialize(position: PlayerPosition): void {
    this.position = {
      ...position,
    };

    this.direction = 'idle';
    this.health.set(PLAYER_CONFIG.health);
  }

  update(
    deltaSeconds: number,
    bounds: {
      width: number;
      height: number;
    },
  ): void {
    if (!this.inputEnabled) {
      this.direction = 'idle';
      return;
    }

    const movement =
      this.inputService.getPlayerMovement();

    const length = Math.hypot(
      movement.x,
      movement.y,
    );

    if (length === 0) {
      this.direction = 'idle';
      return;
    }

    this.updateDirection(movement);

    const directionX =
      movement.x / length;

    const directionY =
      movement.y / length;

    const speed =
      this.inputService.isShiftPressed()
        ? PLAYER_CONFIG.precisionSpeed
        : PLAYER_CONFIG.speed;

    this.position.x +=
      directionX *
      speed *
      deltaSeconds;

    this.position.y +=
      directionY *
      speed *
      deltaSeconds;

    this.clampToBounds(bounds);
  }

  getHealth(): number {
    return this.health();
  }

  getMaxHealth(): number {
    return PLAYER_CONFIG.health;
  }

  takeDamage(amount: number): void {
    this.health.update(
      (health) =>
        Math.max(0, health - amount),
    );
  }

  isAlive(): boolean {
    return this.health() > 0;
  }

  isPrecisionMode(): boolean {
    return this.inputService.isShiftPressed();
  }

  setInputEnabled(
    enabled: boolean,
  ): void {
    this.inputEnabled = enabled;

    if (!enabled) {
      this.direction = 'idle';
    }
  }

  isInputEnabled(): boolean {
    return this.inputEnabled;
  }

  getPosition(): PlayerPosition {
    return {
      ...this.position,
    };
  }

  getDirection(): PlayerDirection {
    return this.direction;
  }

  moveBy(
    x: number,
    y: number,
  ): void {
    this.position.x += x;
    this.position.y += y;
  }

  private updateDirection(
    movement: {
      x: number;
      y: number;
    },
  ): void {
    if (movement.x < 0) {
      this.direction = 'left';
    } else if (movement.x > 0) {
      this.direction = 'right';
    } else {
      this.direction = 'idle';
    }
  }

  private clampToBounds(
    bounds: {
      width: number;
      height: number;
    },
  ): void {
    const radius =
      bounds.height *
      PLAYER_CONFIG.radiusRatio;

    this.position.x = Math.max(
      radius,
      Math.min(
        bounds.width - radius,
        this.position.x,
      ),
    );

    this.position.y = Math.max(
      radius,
      Math.min(
        bounds.height - radius,
        this.position.y,
      ),
    );
  }
}