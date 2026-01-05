import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer.model';

// --- Importación de Componentes Hijos (Piezas de la interfaz) ---
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { DashboardGeneralComponent } from '../../components/dashboard/dashboard-general/dashboard-general';
import { DashboardClienteComponent } from '../../components/dashboard/dashboard-cliente/dashboard-cliente';
import { ClienteNuevoFormComponent } from '../../components/dashboard/cliente-nuevo-form/cliente-nuevo-form';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    DashboardGeneralComponent,
    DashboardClienteComponent,
    ClienteNuevoFormComponent
  ],
  template: `
    <app-navbar></app-navbar>

    <div class="container">

      <div class="search-section">
        <h2>Búsqueda de Clientes</h2>

        <div class="search-options">
          <label>
            <input type="radio" [(ngModel)]="searchType" value="customerId" name="searchType" />
            Por ID de Cliente
          </label>
          <label>
            <input type="radio" [(ngModel)]="searchType" value="email" name="searchType" />
            Por Correo Electrónico
          </label>
          <label>
            <input type="radio" [(ngModel)]="searchType" value="document" name="searchType" />
            Por Documento
          </label>
        </div>

        <div class="search-bar">
          <input
            type="text"
            [(ngModel)]="searchValue"
            [placeholder]="getPlaceholder()"
            (keyup.enter)="search()"
          />
          <button class="search-btn" (click)="search()">Buscar</button>
          <button class="create-btn" (click)="openModal()">Agrega un usuario</button>
        </div>

        <div class="error-message" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>
      </div>

      <app-dashboard-general></app-dashboard-general>

      <app-dashboard-cliente [customer]="customer"></app-dashboard-cliente>
    </div>

    <app-footer></app-footer>

    <app-cliente-nuevo-form
      *ngIf="showModal"
      (close)="onModalClose($event)">
    </app-cliente-nuevo-form>
  `,
  styles: [`
    .container {
      max-width: 900px;
      margin: 30px auto;
      padding: 0 20px;
      min-height: 80vh;
    }

    .search-section {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      margin-bottom: 30px;
    }

    h2 {
      margin: 0 0 20px 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }

    .search-options {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .search-options label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: #34495e;
      font-size: 0.95rem;
    }

    .search-options input[type="radio"] {
      cursor: pointer;
      width: auto;
      margin: 0;
    }

    .search-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    input[type="text"] {
      flex: 1;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      color: #2c3e50;
    }

    input[type="text"]:focus {
      outline: 2px solid #3498db;
      border-color: transparent;
    }

    button {
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
    }

    .search-btn {
      background: #3498db;
    }
    .search-btn:hover {
      background: #2980b9;
    }

    .create-btn {
      background: #7adb82ff;
    }
    .create-btn:hover {
      background: #2daf38ff;
    }

    .error-message {
      background: #ffe5e5;
      color: #c0392b;
      padding: 12px;
      border-radius: 6px;
      border-left: 4px solid #e74c3c;
      font-size: 0.9rem;
    }
  `]
})
export class Dashboard {
  // --- Variables de Estado ---
  searchType: 'customerId' | 'email' | 'document' = 'email';
  searchValue = '';
  showModal = false;
  errorMessage = '';

  // Modelo de datos
  customer?: Customer;

  // Inyección del servicio
  private service = inject(CustomerService);

  getPlaceholder(): string {
    switch (this.searchType) {
      case 'customerId':
        return '🔍 Ej: 7590-VHVEG';
      case 'email':
        return '🔍 Ej: ralvarez4776@outlook.com';
      case 'document':
        return '🔍 Ej: 16706640';
      default:
        return '🔍 Buscar...';
    }
  }

  search() {
    this.errorMessage = '';
    this.customer = undefined;

    if (!this.searchValue.trim()) {
      this.errorMessage = 'Por favor ingresa un valor para buscar';
      return;
    }

    console.log(`[Dashboard] Buscando por ${this.searchType}: ${this.searchValue}`);

    switch (this.searchType) {
      case 'customerId':
        this.searchByCustomerId();
        break;
      case 'email':
        this.searchByEmail();
        break;
      case 'document':
        this.searchByDocument();
        break;
    }
  }

  private searchByCustomerId() {
    this.service.getCustomer(this.searchValue).subscribe({
      next: (customer) => {
        this.customer = customer;
        console.log('[Dashboard] Cliente encontrado:', customer);
      },
      error: (error) => {
        console.error('[Dashboard] Error al buscar:', error);
        this.errorMessage = `No se encontró ningún cliente con ID: ${this.searchValue}`;
      }
    });
  }

  private searchByEmail() {
    this.service.getCustomerByEmail(this.searchValue).subscribe({
      next: (customer) => {
        this.customer = customer;
        console.log('[Dashboard] Cliente encontrado:', customer);
      },
      error: (error) => {
        console.error('[Dashboard] Error al buscar:', error);
        this.errorMessage = `No se encontró ningún cliente con correo: ${this.searchValue}`;
      }
    });
  }

  private searchByDocument() {
    const docNumber = Number(this.searchValue);
    if (isNaN(docNumber)) {
      this.errorMessage = 'El documento debe ser un número válido';
      return;
    }

    this.service.getCustomerByDocument(docNumber).subscribe({
      next: (customer) => {
        this.customer = customer;
        console.log('[Dashboard] Cliente encontrado:', customer);
      },
      error: (error) => {
        console.error('[Dashboard] Error al buscar:', error);
        this.errorMessage = `No se encontró ningún cliente con documento: ${this.searchValue}`;
      }
    });
  }

  openModal() {
    this.showModal = true;
  }

  onModalClose(saved: boolean) {
    this.showModal = false;
  }
}
