import { Component } from '@angular/core';
import { PixiCanvas } from "../../components/pixi-canvas/pixi-canvas";
import { Debugger } from "../../components/debugger/debugger";
import { GameService } from '../../core/services/game.service';
import { PlayerService } from '../../core/services/player.service';
import { InputService } from '../../core/services/input.service';
import { EnemyService } from '../../core/services/enemy.service';

@Component({
  selector: 'app-game',
  imports: [PixiCanvas, Debugger],
  templateUrl: './game.html',
  styleUrl: './game.css',
  providers: [
    GameService,
    PlayerService,
    InputService,
    EnemyService
  ]
})
export class Game { }
