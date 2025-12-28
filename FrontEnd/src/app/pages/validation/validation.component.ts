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
    <div class="container">
      <h2>Validar Cliente</h2>
      <input type="text" [(ngModel)]="customerId" placeholder="Ingrese ID del cliente" />
      <button (click)="validate()" [disabled]="!customerId">Consultar</button>
      <p *ngIf="error" class="error">{{ error }}</p>
    </div>
  `,
  styles: [`.container { max-width: 400px; margin: 50px auto; text-align: center; }`]
})
export class ValidationComponent {
  customerId = '';
  error = '';
  private router = inject(Router);
  private customerService = inject(CustomerService);

  validate() {
    this.customerService.checkCustomerExists(this.customerId).subscribe({
      next: (exists) => {
        if (exists) {
          this.router.navigate(['/dashboard', this.customerId]);
        } else {
          this.router.navigate(['/register', this.customerId]);
        }
      },
      error: () => this.error = 'Error de conexión con el servidor.'
    });
  }
}