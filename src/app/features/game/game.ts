import { Component } from '@angular/core';
import { PixiCanvas } from "../../components/pixi-canvas/pixi-canvas";
import { Debugger } from "../../components/debugger/debugger";
import { GameService } from '../../core/services/game.service';
import { PlayerService } from '../../core/services/player.service';
import { InputService } from '../../core/services/input.service';
import { EnemyService } from '../../core/services/enemy.service';
import { BulletPatternService } from '../../core/services/bullet-pattern.service';
import { PlayerHealth } from '../../components/player-health/player-health';

@Component({
  selector: 'app-game',
  imports: [PixiCanvas, Debugger, PlayerHealth],
  templateUrl: './game.html',
  styleUrl: './game.css',
  providers: [
    GameService,
    PlayerService,
    InputService,
    EnemyService,
    BulletPatternService
  ]
})
export class Game { }
