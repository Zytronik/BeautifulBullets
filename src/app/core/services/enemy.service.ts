import { Injectable } from "@angular/core";
import { EnemyPosition } from "../types/enemy.types";

@Injectable()
export class EnemyService {
  private position: EnemyPosition = {
    x: 0,
    y: 0,
  };

  initialize(position: EnemyPosition): void {
    this.position = {
      ...position,
    };
  }

  getPosition(): EnemyPosition {
    return {
      ...this.position,
    };
  }
}