import { Component } from '@angular/core';
import { PixiCanvas } from "../../components/pixi-canvas/pixi-canvas";

@Component({
  selector: 'app-game',
  imports: [PixiCanvas],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game { }
