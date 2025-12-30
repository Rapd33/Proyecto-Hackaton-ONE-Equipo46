import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card-container">
      <h2>🔍 Validar Cliente</h2>
      <p>Ingrese el ID para verificar si ya existe en nuestra base de datos.</p>
      
      <input 
        type="text" 
        [(ngModel)]="customerId" 
        placeholder="Ej: 123" 
        (keyup.enter)="validate()" 
      />
      
      <button (click)="validate()" [disabled]="!customerId">
        Consultar
      </button>

      <p *ngIf="error" class="error-msg">{{ error }}</p>
    </div>
  `
})
export class ValidationComponent {
  customerId = '';
  error = '';
  private router = inject(Router);
  private customerService = inject(CustomerService);

  // Chicos: Esta función decide a dónde vamos según si existe o no el cliente
  validate() {
    this.customerService.checkCustomerExists(this.customerId).subscribe({
      next: (exists) => {
        if (exists) {
          this.router.navigate(['/dashboard', this.customerId]);
        } else {
          this.router.navigate(['/register', this.customerId]);
        }
      },
      error: () => this.error = '⚠️ Error conectando con el servidor (¿Está prendido el Java?)'
    });
  }
}