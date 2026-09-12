import { Component, inject } from '@angular/core';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-player-health',
  imports: [],
  templateUrl: './player-health.html',
  styleUrl: './player-health.css',
})
export class PlayerHealth {
  private readonly playerService = inject(PlayerService);

  protected readonly hearts =
    () =>
      Array.from({
        length:
          this.playerService.health(),
      });
}
