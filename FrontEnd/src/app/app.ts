import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NotificationToastComponent } from './components/notification-toast/notification-toast';
import { FooterComponent } from './components/footer/footer';
import { NavbarComponent } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationToastComponent, FooterComponent, NavbarComponent, CommonModule],
  template: `
    <div class="app-layout">
      @if (showNavbar) {
        <app-navbar [class.navbar-visible]="isNavbarVisible"></app-navbar>
      }
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      <app-notification-toast></app-notification-toast>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
    }

    app-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      opacity: 0;
      transform: translateY(-100%);
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    app-navbar.navbar-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `]
})
export class AppComponent implements OnInit {
  showNavbar = false;
  isNavbarVisible = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Detectar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });

    // Verificar ruta inicial
    this.checkRoute();
  }

  /**
   * Verifica si debemos mostrar el navbar según la ruta actual
   */
  private checkRoute(): void {
    const currentUrl = this.router.url;
    // Solo mostrar navbar con scroll en la página home
    if (currentUrl === '/' || currentUrl === '') {
      this.showNavbar = true;
      this.checkScroll();
    } else {
      // En otras páginas, mostrar navbar siempre
      this.showNavbar = true;
      this.isNavbarVisible = true;
    }
  }

  /**
   * Escucha el scroll para mostrar/ocultar el navbar
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.router.url === '/' || this.router.url === '') {
      this.checkScroll();
    }
  }

  /**
   * Verifica la posición del scroll y muestra/oculta el navbar
   */
  private checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const heroHeight = window.innerHeight; // 100vh

    // Mostrar navbar cuando salgamos del hero (cuando scroll > 80% del hero)
    this.isNavbarVisible = scrollPosition > (heroHeight * 0.8);
  }
}