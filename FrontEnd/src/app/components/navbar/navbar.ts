import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Importamos el Router

/**
 * COMPONENTE NAVBAR
 * Barra superior con navegación.
 * - Logo: Redirige al Home.
 * - Nav Links: Navegación a secciones del home.
 * - Botón CTA: Ingresar al sistema (dashboard).
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
   * Si ya estamos en home, hace scroll al inicio (hero)
   */
  goToHome() {
    const currentUrl = this.router.url;
    if (currentUrl === '/' || currentUrl === '') {
      // Si ya estamos en home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Si estamos en otra página, navegar al home
      this.router.navigate(['/']);
    }
  }

  /**
   * Navega al home y hace scroll a la sección de features
   */
  scrollToFeatures(): void {
    this.navigateAndScroll('features');
  }

  /**
   * Navega al home y hace scroll a la sección de equipo
   */
  scrollToAbout(): void {
    this.navigateAndScroll('about');
  }

  /**
   * Navega al home y hace scroll a la sección de contacto
   */
  scrollToContact(): void {
    this.navigateAndScroll('contact');
  }

  /**
   * Navega al home si no estamos allí y hace scroll a la sección especificada
   */
  private navigateAndScroll(sectionId: string): void {
    // Si ya estamos en el home, solo hacemos scroll
    if (this.router.url === '/' || this.router.url === '') {
      this.scrollToSection(sectionId);
    } else {
      // Navegamos al home primero y luego hacemos scroll
      this.router.navigate(['/']).then(() => {
        // Pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 100);
      });
    }
  }

  /**
   * Hace scroll suave a la sección especificada
   */
  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Navega al dashboard
   */
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
