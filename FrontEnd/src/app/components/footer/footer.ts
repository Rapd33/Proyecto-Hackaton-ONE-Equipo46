import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <p>© 2025 Equipo 46 - Hackathon ONE</p>
    </footer>
  `,
  styles: [`
    footer { text-align: center; padding: 20px; color: #7f8c8d; font-size: 0.9rem; margin-top: 40px; }
  `]
})
export class FooterComponent {}