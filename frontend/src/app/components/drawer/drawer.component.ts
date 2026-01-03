import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drawer',
  imports: [CommonModule, RouterModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  readonly isOpen = signal(true);

  toggle(): void {
    this.isOpen.update(value => !value);
  }
}
