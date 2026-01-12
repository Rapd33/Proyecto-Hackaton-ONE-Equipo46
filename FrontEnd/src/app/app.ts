import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationToastComponent } from './components/notification-toast/notification-toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationToastComponent],
  template: `
    <router-outlet></router-outlet>
    <app-notification-toast></app-notification-toast>
  `,
  styles: [] // Los estilos globales están en styles.css
})
export class AppComponent {}