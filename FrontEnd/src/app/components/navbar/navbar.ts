import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Importamos el Router

/**
 * COMPONENTE NAVBAR
 * Barra superior con navegación.
 * - Logo: Redirige al Home.
 * - Botón Admin: Muestra el usuario actual.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  // 2. Inyectamos el servicio Router para poder navegar
  private router = inject(Router);

  /**
   * Navega a la ruta raíz ('') que es el Home.
   */
  goToHome() {
    this.router.navigate(['/']);
  }

  /**
   * Scroll suave a la sección de features
   */
  scrollToFeatures(): void {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Scroll suave a la sección de equipo
   */
  scrollToAbout(): void {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Scroll suave a la sección de contacto
   */
  scrollToContact(): void {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}