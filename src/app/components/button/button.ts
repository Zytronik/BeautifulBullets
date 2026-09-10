import { Component, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
