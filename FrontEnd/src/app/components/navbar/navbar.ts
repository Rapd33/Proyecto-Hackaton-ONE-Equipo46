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
  template: `
    <nav>
      <div class="brand-container" (click)="goToHome()" title="Volver al Inicio">
        <img src="assets/LogoChurnInsight.png" alt="Logo ChurnInsight" class="nav-logo">
        <span class="brand-name">ChurnInsight</span>
      </div>

      <div class="actions">
        <button class="profile-btn">
          <span class="username">Admin</span>
          <div class="avatar-circle">👤</div>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    /* Variables globales definidas en src/styles.css */
    nav {
      background-color: var(--primary-dark);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 2rem;
      border-bottom: 3px solid var(--accent-color);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    /* --- MARCA INTERACTIVA --- */
    .brand-container {
      display: flex; 
      align-items: center; 
      gap: 12px;
      
      /* Hacemos que parezca un botón */
      cursor: pointer; 
      transition: transform 0.2s ease, opacity 0.2s; /* Animación suave */
      
      /* Evita selección de texto al hacer clic rápido */
      user-select: none;
    }

    /* Efecto al pasar el mouse por el logo (Feedback visual) */
    .brand-container:hover {
      transform: scale(1.03); /* Crece un poquito */
      opacity: 0.9;
    }
    
    /* Efecto al hacer clic */
    .brand-container:active {
      transform: scale(0.97); /* Se hunde ligeramente */
    }

    .nav-logo {
      height: 40px; width: auto;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }

    .brand-name {
      font-size: 1.4rem; font-weight: bold; letter-spacing: 0.5px; color: #fff;
    }

    /* --- PERFIL --- */
    .profile-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50px;
      padding: 5px 15px 5px 20px;
      display: flex; align-items: center; gap: 12px; color: white;
    }
    .profile-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: var(--accent-color);
    }

    .username { font-weight: 500; font-size: 1rem; }
    .avatar-circle {
      background-color: var(--accent-color);
      width: 35px; height: 35px; border-radius: 50%;
      display: flex; justify-content: center; align-items: center;
      font-size: 1.2rem;
      border: 2px solid rgba(255,255,255,0.2);
    }
  `]
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
}