import {
  inject,
  Injectable,
} from '@angular/core';
import {
  EnemyPosition,
} from '../types/enemy.types';
import { ENEMY_CONFIG } from '../enemy/enemy.config';
import { InputService } from './input.service';

@Injectable()
export class EnemyService {
  private readonly inputService =
    inject(InputService);

  private position: EnemyPosition = {
    x: 0,
    y: 0,
  };

  private inputEnabled =
    ENEMY_CONFIG.inputEnabled;

  initialize(position: EnemyPosition): void {
    this.position = {
      ...position,
    };
  }

  update(
    deltaSeconds: number,
    bounds: {
      width: number;
      height: number;
    },
  ): void {
    if (!this.inputEnabled) {
      return;
    }

    const movement =
      this.inputService.getEnemyMovement();

    const length = Math.hypot(
      movement.x,
      movement.y,
    );

    if (length === 0) {
      return;
    }

    const directionX =
      movement.x / length;

    const directionY =
      movement.y / length;

    this.position.x +=
      directionX *
      ENEMY_CONFIG.speed *
      deltaSeconds;

    this.position.y +=
      directionY *
      ENEMY_CONFIG.speed *
      deltaSeconds;

    this.clampToBounds(bounds);
  }

  setInputEnabled(
    enabled: boolean,
  ): void {
    this.inputEnabled = enabled;
  }

  isInputEnabled(): boolean {
    return this.inputEnabled;
  }

  setPosition(
    x: number,
    y: number,
  ): void {
    this.position.x = x;
    this.position.y = y;
  }

  getPosition(): EnemyPosition {
    return {
      ...this.position,
    };
  }

  private clampToBounds(
    bounds: {
      width: number;
      height: number;
    },
  ): void {
    const radius =
      bounds.height *
      ENEMY_CONFIG.radiusRatio;

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