import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * COMPONENTE NAVBAR
 * Ahora los elementos interactivos son botones reales (<button>) 
 * para aprovechar las animaciones globales definidas en styles.css.
 * Se usa en el Dashboard y en otras vistas internas del sistema.
 * Hereda los colores definidos globalmente en 'src/styles.css'.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav>
      <div class="brand-container">
        <img src="assets/LogoChurnInsight.png" alt="Logo" class="nav-logo">
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
    /* Los colores base vienen de las variables globales */
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

    .brand-container {
      display: flex; align-items: center; gap: 12px;
    }

    .nav-logo {
      height: 40px; width: auto;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }

    .brand-name {
      font-size: 1.4rem; font-weight: bold; letter-spacing: 0.5px; color: #fff;
    }

    /* --- BOTÓN DE PERFIL --- */
    .profile-btn {
      /* Estilos visuales del botón (La animación viene de styles.css) */
      background: rgba(255, 255, 255, 0.1); /* Fondo semitransparente */
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50px; /* Bordes redondeados tipo píldora */
      padding: 5px 15px 5px 20px;
      
      display: flex;
      align-items: center;
      gap: 12px;
      color: white;
    }

    /* Cuando pasas el mouse por encima del botón de perfil específicamente */
    .profile-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: var(--accent-color); /* El borde se pone dorado */
    }

    .username {
      font-weight: 500; font-size: 1rem;
    }

    .avatar-circle {
      background-color: var(--accent-color);
      width: 35px; height: 35px;
      border-radius: 50%;
      display: flex; justify-content: center; align-items: center;
      font-size: 1.2rem;
      border: 2px solid rgba(255,255,255,0.2);
    }
  `]
})
export class NavbarComponent {}