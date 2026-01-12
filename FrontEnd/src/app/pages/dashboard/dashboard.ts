import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
  searchValue = '';
  showModal = false;
  errorMessage = '';
  loadingPrediction = false;
  predictionError = false;

  // Modelo de datos
  customer?: Customer;
  prediccion?: PrediccionChurn;

  // Inyección del servicio
  private service = inject(CustomerService);
  private cdr = inject(ChangeDetectorRef);

  /**
   * Detecta automáticamente el tipo de búsqueda basado en el formato del valor
   */
  private detectSearchType(value: string): 'customerId' | 'email' | 'document' {
    const trimmedValue = value.trim();

    // Detectar email por presencia de @
    if (trimmedValue.includes('@')) {
      return 'email';
    }

    // Detectar documento si es solo números
    if (/^\d+$/.test(trimmedValue)) {
      return 'document';
    }

    // Por defecto, asumir que es customerId
    return 'customerId';
  }

  search() {
    this.errorMessage = '';
    this.customer = undefined;
    this.prediccion = undefined;
    this.predictionError = false;

    if (!this.searchValue.trim()) {
      this.errorMessage = 'Por favor ingresa un valor para buscar';
      return;
    }

    const searchType = this.detectSearchType(this.searchValue);
    console.log(`[Dashboard] Búsqueda inteligente detectada: ${searchType} para valor: ${this.searchValue}`);

    switch (searchType) {
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
        this.cdr.detectChanges(); // Forzar detección de cambios
        // Obtener predicción automáticamente
        this.loadPrediction(customer.customerId);
      },
      error: (error) => {
        console.error('[Dashboard] Error al buscar:', error);
        this.errorMessage = `No se encontró ningún cliente con ID: ${this.searchValue}`;
        this.cdr.detectChanges();
      }
    });
  }

  private searchByEmail() {
    this.service.getCustomerByEmail(this.searchValue).subscribe({
      next: (customer) => {
        this.customer = customer;
        console.log('[Dashboard] Cliente encontrado:', customer);
        this.cdr.detectChanges(); // Forzar detección de cambios
        // Obtener predicción automáticamente
        this.loadPrediction(customer.customerId);
      },
      error: (error) => {
        console.error('[Dashboard] Error al buscar:', error);
        this.errorMessage = `No se encontró ningún cliente con correo: ${this.searchValue}`;
        this.cdr.detectChanges();
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
        this.cdr.detectChanges(); // Forzar detección de cambios
        // Obtener predicción automáticamente
        this.loadPrediction(customer.customerId);
      },
      error: (error) => {
        console.error('[Dashboard] Error al buscar:', error);
        this.errorMessage = `No se encontró ningún cliente con documento: ${this.searchValue}`;
        this.cdr.detectChanges();
      }
    });
  }

  private loadPrediction(customerId: string) {
    this.loadingPrediction = true;
    this.predictionError = false;
    this.cdr.detectChanges();
    this.service.getChurnPrediction(customerId).subscribe({
      next: (prediccion) => {
        this.prediccion = prediccion;
        this.loadingPrediction = false;
        this.predictionError = false;
        console.log('[Dashboard] Predicción obtenida:', prediccion);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('[Dashboard] Error al obtener predicción:', error);
        this.loadingPrediction = false;
        this.predictionError = true;
        this.cdr.detectChanges();
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
