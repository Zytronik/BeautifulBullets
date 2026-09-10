import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly disabled = input(false);
  readonly clicked = output<void>();

  onClick(): void {
    if (this.disabled()) {
      return;
    }

    this.clicked.emit();
  }
}
