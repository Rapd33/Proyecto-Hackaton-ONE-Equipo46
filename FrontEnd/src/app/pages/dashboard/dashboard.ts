import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * ⚠️ NOTA DE MANTENIMIENTO:
 * Importamos el servicio desde '../../services/customer' (sin .service)
 * porque el archivo físico se creó como 'customer.ts'.
 * Si en el futuro renombras el archivo a 'customer.service.ts', actualiza esta ruta.
 */
import { CustomerService } from '../../services/customer';
import { Customer, ChurnPrediction } from '../../models/customer.model';

// --- Importación de Componentes Hijos (Piezas de la interfaz) ---
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { DashboardGeneralComponent } from '../../components/dashboard/dashboard-general/dashboard-general';
import { DashboardClienteComponent } from '../../components/dashboard/dashboard-cliente/dashboard-cliente';
import { ClienteNuevoFormComponent } from '../../components/dashboard/cliente-nuevo-form/cliente-nuevo-form';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // Aquí declaramos todas las dependencias que usa este HTML
  imports: [
    CommonModule,             // Para directivas como *ngIf
    FormsModule,              // Para vincular inputs con [(ngModel)]
    NavbarComponent, 
    FooterComponent,
    DashboardGeneralComponent, 
    DashboardClienteComponent, 
    ClienteNuevoFormComponent
  ],
  template: `
    <app-navbar></app-navbar>

    <div class="container">
      
      <div class="search-bar">
        <input 
          type="text" 
          [(ngModel)]="searchId" 
          placeholder="🔍 Buscar ID Cliente..." 
          (keyup.enter)="search()" 
        />
        
        <button class="search-btn" (click)="search()">Buscar</button>
        
        <button class="new-btn" (click)="openModal()">+ Nuevo</button>
      </div>

      <app-dashboard-general></app-dashboard-general>

      <app-dashboard-cliente 
        [customer]="customer" 
        [prediction]="prediction">
      </app-dashboard-cliente>
    </div>

    <app-footer></app-footer>

    <app-cliente-nuevo-form 
      *ngIf="showModal" 
      [initialId]="searchId" 
      (close)="onModalClose($event)">
    </app-cliente-nuevo-form>
  `,
  styles: [`
    /* ESTILOS DEL DASHBOARD
       Usamos variables CSS (var(--...)) definidas en 'src/styles.css'.
       Esto asegura que la paleta "Executive Gold" se aplique uniformemente.
    */

    .container { 
      max-width: 900px; 
      margin: 30px auto; 
      padding: 0 20px; 
      min-height: 80vh; /* Empuja el footer hacia abajo si hay poco contenido */
    }
    
    .search-bar { 
      display: flex; 
      gap: 10px; 
      margin-bottom: 30px; 
    }
    
    input { 
      flex: 1; /* Toma todo el espacio disponible */
      padding: 12px; 
      border: 1px solid #ddd; 
      border-radius: 8px; 
      font-size: 1rem; 
      color: var(--text-main); /* Azul oscuro para texto */
    }
    
    /* Efecto de foco usando el color Cian del tema */
    input:focus { 
      outline: 2px solid var(--primary-light); 
      border-color: transparent; 
    }

    button { 
      padding: 0 25px; 
      border: none; 
      border-radius: 8px; 
      color: white; 
      font-weight: bold; 
      cursor: pointer; 
      transition: background 0.3s; /* Suaviza el cambio de color al pasar el mouse */
    }

    /* ESTILO BOTÓN BUSCAR: Azul Cian (--primary-light) */
    .search-btn { 
      background: var(--primary-light); 
    }
    .search-btn:hover { 
      background: var(--primary-dark); /* Se oscurece al hover */
    }

    /* ESTILO BOTÓN NUEVO: Dorado (--accent-color) */
    .new-btn { 
      background: var(--accent-color); 
      color: #fff; 
      /* Sombra de texto sutil para mejorar lectura sobre fondo dorado */
      text-shadow: 0 1px 2px rgba(0,0,0,0.1); 
    }
    .new-btn:hover { 
      background: var(--accent-dark); /* Dorado bronce al hover */
    }
  `]
})
export class Dashboard {
  // --- Variables de Estado ---
  searchId = '';          // Almacena el texto del buscador
  showModal = false;      // Controla la visibilidad del formulario flotante
  
  // Modelos de datos (pueden ser undefined al inicio)
  customer?: Customer;
  prediction?: ChurnPrediction;
  
  // Inyección del servicio (Nueva sintaxis Angular 16+)
  private service = inject(CustomerService);

  /**
   * Lógica principal de búsqueda de clientes.
   * 1. Valida que el input no esté vacío.
   * 2. Consulta al servicio si el ID existe.
   * 3. SI EXISTE: Descarga datos del cliente y predicción.
   * 4. NO EXISTE: Sugiere al usuario abrir el modal de registro.
   */
  search() {
    if(!this.searchId) return; // Protección contra búsquedas vacías

    this.service.checkCustomerExists(this.searchId).subscribe(exists => {
      if(exists) {
        console.log(`[Dashboard] Cliente ${this.searchId} encontrado.`);
        // Carga paralela de datos y predicción
        this.service.getCustomer(this.searchId).subscribe(c => this.customer = c);
        this.service.getChurnPrediction(this.searchId).subscribe(p => this.prediction = p);
      } else {
        // UX: Confirmación antes de interrumpir al usuario con un modal
        if(confirm(`El ID ${this.searchId} no existe. ¿Desea registrarlo?`)) {
          this.showModal = true;
        }
      }
    });
  }

  /**
   * Abre el modal de registro manualmente.
   * Vinculado al botón "+ Nuevo".
   */
  openModal() { 
    this.showModal = true; 
  }

  /**
   * Se ejecuta cuando el modal se cierra (ya sea por cancelar o guardar).
   * @param saved - true si se guardó un cliente nuevo con éxito.
   */
  onModalClose(saved: boolean) {
    this.showModal = false; // Siempre ocultamos el modal
    if(saved) {
      console.log('[Dashboard] Registro exitoso. Actualizando vista...');
      // Si guardó, buscamos automáticamente para mostrar los datos recién creados
      this.search(); 
    }
  }
}