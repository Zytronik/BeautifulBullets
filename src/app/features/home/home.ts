import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from "../../components/button/button";

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);

  startGame(): void {
    this.router.navigate(['/game']);
  }
}
