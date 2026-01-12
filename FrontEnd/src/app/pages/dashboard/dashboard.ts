import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer.model';
import { PrediccionChurn } from '../../models/prediccion-churn.model';

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
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  // --- Variables de Estado ---
  searchType: 'customerId' | 'email' | 'document' = 'email';
  searchValue = '';
  showModal = false;
  errorMessage = '';
  loadingPrediction = false;

  // Modelo de datos
  customer?: Customer;
  prediccion?: PrediccionChurn;

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
    this.prediccion = undefined;

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
        // Obtener predicción automáticamente
        this.loadPrediction(customer.customerId);
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
        // Obtener predicción automáticamente
        this.loadPrediction(customer.customerId);
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
        // Obtener predicción automáticamente
        this.loadPrediction(customer.customerId);
      },
      error: (error) => {
        console.error('[Dashboard] Error al buscar:', error);
        this.errorMessage = `No se encontró ningún cliente con documento: ${this.searchValue}`;
      }
    });
  }

  private loadPrediction(customerId: string) {
    this.loadingPrediction = true;
    this.service.getChurnPrediction(customerId).subscribe({
      next: (prediccion) => {
        this.prediccion = prediccion;
        this.loadingPrediction = false;
        console.log('[Dashboard] Predicción obtenida:', prediccion);
      },
      error: (error) => {
        console.error('[Dashboard] Error al obtener predicción:', error);
        this.loadingPrediction = false;
        this.errorMessage = 'No se pudo obtener la predicción de churn. El microservicio de ML puede no estar disponible.';
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
