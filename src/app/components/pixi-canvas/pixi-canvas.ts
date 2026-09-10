import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Application } from 'pixi.js';
import { GAME_CONFIG } from '../../core/game/game.config';
import { Game } from '../../core/game/game';

@Component({
  selector: 'app-pixi-canvas',
  imports: [],
  templateUrl: './pixi-canvas.html',
  styleUrl: './pixi-canvas.css',
})
export class PixiCanvas implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true })
  private canvasContainer!: ElementRef<HTMLDivElement>;

  private app?: Application;
  private game?: Game;
  private resizeObserver?: ResizeObserver;

  async ngAfterViewInit(): Promise<void> {
    this.app = new Application();

    const size = this.calculateCanvasSize();

    await this.app.init({
      width: size.width,
      height: size.height,
      antialias: GAME_CONFIG.antialias,
      background: '#1e1e1e',
    });

    this.canvasContainer.nativeElement.appendChild(
      this.app.canvas,
    );

    this.game = new Game(this.app);
    this.game.start();

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });

    this.resizeObserver.observe(
      this.canvasContainer.nativeElement,
    );
  }

  private calculateCanvasSize(): {
    width: number;
    height: number;
  } {
    const container = this.canvasContainer.nativeElement;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const containerAspectRatio =
      containerWidth / containerHeight;

    if (containerAspectRatio > GAME_CONFIG.aspectRatio) {
      return {
        width: containerHeight * GAME_CONFIG.aspectRatio,
        height: containerHeight,
      };
    }

    return {
      width: containerWidth,
      height: containerWidth / GAME_CONFIG.aspectRatio,
    };
  }

  private resizeCanvas(): void {
    if (!this.app) {
      return;
    }

    const size = this.calculateCanvasSize();

    this.app.renderer.resize(
      size.width,
      size.height,
    );
  }

  ngOnDestroy(): void {
    this.game?.stop();

    this.resizeObserver?.disconnect();

    this.app?.destroy(true, {
      children: true,
    });
  }
}