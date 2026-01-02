import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      
      <div class="hero">
        <div class="hero-content">
          
          <img src="assets/LogoChurnInsight.png" alt="Logo ChurnInsight" class="logo-img">
          
          <h1 class="visually-hidden">ChurnInsight</h1> 
          
          <p class="tagline">Predice, Adapta y Crece con Inteligencia Artificial.</p>
          
          <button class="cta-button" (click)="enterSystem()">
            <span class="btn-text">Ingresar al Sistema</span>
            <span class="btn-icon">🚀</span>
          </button>
        </div>
      </div>

      <div class="tabs-container">
        
        <div class="tabs-header">
          <button [class.active]="activeTab === 'summary'" (click)="setActiveTab('summary')">📄 Resumen</button>
          <button [class.active]="activeTab === 'team'" (click)="setActiveTab('team')">👥 Equipo 46</button>
          <button [class.active]="activeTab === 'tech'" (click)="setActiveTab('tech')">🛠️ Tecnologías</button>
        </div>

        <div class="tabs-content">
          
          <div *ngIf="activeTab === 'summary'" class="tab-pane fade-in">
            <div class="grid-layout">
              <div class="info-card highlight">
                <h3>🎯 El Desafío</h3>
                <p>Las empresas pierden millones por cancelaciones. Nuestro objetivo es <strong>predecir el abandono</strong> antes de que ocurra.</p>
              </div>
              <div class="info-card">
                <h3>💡 La Solución</h3>
                <p>Data Science entrena modelos predictivos y el Backend disponibiliza una API REST para consultar el riesgo en tiempo real.</p>
              </div>
              <div class="info-card full-width">
                <h3>🚀 Funcionalidades MVP</h3>
                <ul>
                  <li>✅ Endpoint <code>POST /predict</code>.</li>
                  <li>✅ Clasificación binaria (Cancelar/Continuar).</li>
                  <li>✅ Probabilidad numérica de riesgo.</li>
                </ul>
              </div>
            </div>
          </div>

          <div *ngIf="activeTab === 'team'" class="tab-pane fade-in">
            <h3 style="text-align: center; margin-bottom: 2rem; color: var(--primary-dark);">Talento del Equipo 46 🚀</h3>
            <div class="team-grid">
              <div class="member-card" *ngFor="let member of teamMembers">
                <div class="avatar">{{ member.initials }}</div>
                <div class="member-info">
                  <h4>{{ member.name }}</h4>
                  <span class="role">{{ member.role }}</span>
                  <a [href]="member.linkedin" target="_blank" class="linkedin-btn">LinkedIn 🔗</a>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="activeTab === 'tech'" class="tab-pane fade-in">
            <div class="tech-stack">
              <div class="tech-item">🅰️ Angular</div>
              <div class="tech-item">☕ Java Spring Boot</div>
              <div class="tech-item">🐍 Python & Pandas</div>
              <div class="tech-item">☁️ Oracle Cloud</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    /* MANTENIMIENTO: Usamos variables de styles.css para la consistencia del tema 'Gold' */
    
    .home-container { min-height: 100vh; display: flex; flex-direction: column; }
    
    /* --- HERO SECTION --- */
    .hero {
      /* Degradado sutil sobre el Azul Navy para dar profundidad */
      background: linear-gradient(135deg, var(--primary-dark) 0%, #0d121f 100%);
      color: white; padding: 4rem 2rem; text-align: center;
      border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    /* Estilos para que el logo se vea centrado y nítido */
    .logo-img { 
      width: 220px; 
      height: auto;
      margin-bottom: 20px; 
      filter: drop-shadow(0 5px 15px rgba(0,0,0,0.4)); /* Sombra para resaltar sobre el fondo oscuro */
      transition: transform 0.3s;
    }
    .logo-img:hover { transform: scale(1.02); }

    .visually-hidden { display: none; } /* Ocultamos el H1 visualmente pero sirve para estructura */
    
    .tagline { font-size: 1.3rem; margin-top: 10px; color: #D1D5DB; font-weight: 300; }

    /* --- BOTÓN CTA (Dorado) --- */
    .cta-button {
      margin-top: 30px; padding: 15px 40px; font-size: 1.2rem;
      border: none; border-radius: 50px;
      
      /* Gradiente Dorado para efecto metálico */
      background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
      color: white; font-weight: bold;
      
      box-shadow: 0 4px 15px rgba(197, 157, 95, 0.4); /* Sombra dorada */
      display: inline-flex; align-items: center; gap: 10px;
    }
    .cta-button:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px rgba(197, 157, 95, 0.6);
    }

    /* --- TABS --- */
    .tabs-container { max-width: 1100px; margin: -40px auto 50px; padding: 0 20px; width: 100%; box-sizing: border-box; }
    .tabs-header { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
    
    .tabs-header button {
      padding: 12px 25px; border: none; border-radius: 30px;
      background: rgba(255, 255, 255, 0.9); color: var(--primary-dark); font-weight: 600;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .tabs-header button.active {
      background: var(--primary-dark); color: var(--accent-color); /* Fondo Navy, Texto Dorado */
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--accent-color);
    }

    /* --- CONTENT CARDS --- */
    .tabs-content { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); min-height: 300px; }
    .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .full-width { grid-column: 1 / -1; }
    
    .info-card { 
      padding: 20px; border-radius: 12px; background: var(--soft-bg); 
      border-left: 4px solid var(--primary-light); /* Borde Cian */
    }
    .info-card.highlight { 
      background: #F0F9FF; /* Azul muy pálido */
      border-left-color: var(--accent-color); /* Borde Dorado */
    }

    /* --- TEAM --- */
    .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
    .member-card {
      background: white; border: 1px solid #eee; padding: 20px; border-radius: 12px;
      text-align: center; display: flex; flex-direction: column; align-items: center;
      transition: transform 0.2s;
    }
    .member-card:hover { transform: translateY(-5px); border-color: var(--accent-color); }
    
    .avatar {
      width: 60px; height: 60px; 
      background: var(--primary-dark); color: var(--accent-color); /* Navy & Dorado */
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;
      border: 2px solid var(--accent-color);
    }
    
    .linkedin-btn {
      text-decoration: none; color: var(--primary-light); font-size: 0.8rem; font-weight: bold;
      border: 1px solid var(--primary-light); padding: 4px 12px; border-radius: 20px;
    }
    .linkedin-btn:hover { background: var(--primary-light); color: white; }

    /* --- TECH --- */
    .tech-stack { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; }
    .tech-item { background: var(--primary-dark); color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; }

    .fade-in { animation: fadeIn 0.4s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: 0; } }
    @media (max-width: 768px) { .grid-layout { grid-template-columns: 1fr; } }
  `]
})
export class Home {
  private router = inject(Router);
  activeTab: string = 'summary';

  // INTEGRANTES (Orden A-Z)
  teamMembers = [
    { name: 'Bibiana Trujillo', role: 'Data Scientist', initials: 'BT', linkedin: '#' },
    { name: 'Fernando Hernández R.', role: 'Data Scientist', initials: 'FH', linkedin: '#' },
    { name: 'Giorgi Beltran Guzman', role: 'Backend Developer', initials: 'GB', linkedin: '#' },
    { name: 'Henry Corporan', role: 'Backend Developer', initials: 'HC', linkedin: '#' },
    { name: 'Juan Carlos Rueda R.', role: 'Backend & Frontend Dev', initials: 'JR', linkedin: '#' },
    { name: 'Rafael Alejandro Mena', role: 'Data Engineer', initials: 'RM', linkedin: '#' },
    { name: 'Rafael Patiño Diaz', role: 'Backend & Frontend Dev', initials: 'RP', linkedin: '#' },
    { name: 'Richard Jerez', role: 'Data Scientist', initials: 'RJ', linkedin: '#' }
  ];

  enterSystem() { this.router.navigate(['/dashboard']); }
  setActiveTab(tabName: string) { this.activeTab = tabName; }
}