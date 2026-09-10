import { Injectable } from '@angular/core';
import { KeyboardKey } from '../types/input.types';

@Injectable()
export class InputService {
  private readonly keys = new Set<KeyboardKey>();

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    const key = this.toKeyboardKey(event.key);

    if (key) {
      this.keys.add(key);
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    const key = this.toKeyboardKey(event.key);

    if (key) {
      this.keys.delete(key);
    }
  };

  start(): void {
    window.addEventListener(
      'keydown',
      this.onKeyDown,
    );

    window.addEventListener(
      'keyup',
      this.onKeyUp,
    );
  }

  stop(): void {
    window.removeEventListener(
      'keydown',
      this.onKeyDown,
    );

    window.removeEventListener(
      'keyup',
      this.onKeyUp,
    );

    this.keys.clear();
  }

  getMovement(): { x: number; y: number } {
    let x = 0;
    let y = 0;

    if (this.keys.has('a')) {
      x -= 1;
    }

    if (this.keys.has('d')) {
      x += 1;
    }

    if (this.keys.has('w')) {
      y -= 1;
    }

    if (this.keys.has('s')) {
      y += 1;
    }

    return { x, y };
  }

  private toKeyboardKey(
    key: string,
  ): KeyboardKey | null {
    if (
      key === 'w' ||
      key === 'a' ||
      key === 's' ||
      key === 'd'
    ) {
      return key;
    }

    return null;
  }
}