import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-purple-300 text-center text-white py-3">
      <span class="text-sm">
        © {{ currentYear }}, Dailytherapyspa.ae. All Rights Reserved
      </span>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}


