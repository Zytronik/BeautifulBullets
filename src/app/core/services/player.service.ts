import { Injectable } from '@angular/core';
import {
  PlayerMovement,
  PlayerPosition,
} from '../types/player.types';
import { PLAYER_CONFIG } from '../player/player.config';

@Injectable()
export class PlayerService {
  private position: PlayerPosition = {
    x: 0,
    y: 0,
  };

  initialize(position: PlayerPosition): void {
    this.position = {
      ...position,
    };
  }

  update(
    movement: PlayerMovement,
    deltaSeconds: number,
    bounds: {
      width: number;
      height: number;
    },
  ): void {
    const length = Math.hypot(
      movement.x,
      movement.y,
    );

    if (length === 0) {
      return;
    }

    const directionX = movement.x / length;
    const directionY = movement.y / length;

    this.position.x +=
      directionX *
      PLAYER_CONFIG.speed *
      deltaSeconds;

    this.position.y +=
      directionY *
      PLAYER_CONFIG.speed *
      deltaSeconds;

    this.clampToBounds(bounds);
  }

  getPosition(): PlayerPosition {
    return {
      ...this.position,
    };
  }

  private clampToBounds(bounds: {
    width: number;
    height: number;
  }): void {
    const radius = PLAYER_CONFIG.radius;

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