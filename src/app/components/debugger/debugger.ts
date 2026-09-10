import { Component, inject } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { Button } from "../button/button";

@Component({
  selector: 'app-debugger',
  imports: [Button],
  templateUrl: './debugger.html',
  styleUrl: './debugger.css',
})
export class Debugger {
  readonly gameService = inject(GameService);

  play(): void {
    this.gameService.play();
  }

  pause(): void {
    this.gameService.pause();
  }

  get isPlaying(): boolean {
    return this.gameService.isPlaying();
  }
}