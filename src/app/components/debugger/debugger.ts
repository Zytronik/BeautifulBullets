import { Component, inject, OnDestroy, signal } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { Button } from "../button/button";

@Component({
  selector: 'app-debugger',
  imports: [Button],
  templateUrl: './debugger.html',
  styleUrl: './debugger.css',
})
export class Debugger implements OnDestroy {
  private readonly gameService = inject(GameService);

  readonly fps = signal(0);
  readonly elapsedTime = signal(0);

  private lastTime = performance.now();
  private frameCount = 0;
  private animationFrameId?: number;

  constructor() {
    this.updateDebugInfo();
  }

  play(): void {
    this.gameService.play();
  }

  pause(): void {
    this.gameService.pause();
  }

  get isPlaying(): boolean {
    return this.gameService.isPlaying();
  }

  private readonly updateDebugInfo = (): void => {
    const now = performance.now();

    this.frameCount++;

    const elapsed = now - this.lastTime;

    if (elapsed >= 500) {
      this.frameCount = 0;
      this.lastTime = now;
    }

    this.elapsedTime.set(
      this.gameService.getElapsedTime(),
    );

    this.fps.set(this.gameService.getFps());

    this.animationFrameId =
      requestAnimationFrame(this.updateDebugInfo);
  };

  ngOnDestroy(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}