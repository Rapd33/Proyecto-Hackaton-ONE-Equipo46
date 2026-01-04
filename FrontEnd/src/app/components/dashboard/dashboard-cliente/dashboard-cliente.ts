import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="result-card" *ngIf="customer">
      <div class="header">
        <h2>{{ customer.nombreCompleto }}</h2>
        <span class="badge" [ngClass]="customer.propensoAChurn ? 'HIGH' : 'LOW'">
          {{ customer.propensoAChurn ? 'Riesgo de Fuga' : 'Cliente Activo' }}
        </span>
      </div>
      <div class="info">
        <p><strong>Correo Electrónico:</strong> {{ customer.correoElectronico }}</p>
        <p><strong>Documento:</strong> {{ customer.documentoIdentidad }}</p>
        <p><strong>ID Cliente:</strong> {{ customer.customerId }}</p>
      </div>
    </div>
  `,
  styles: [`
    .result-card {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      margin-bottom: 20px;
      border-left: 5px solid #3498db;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #ecf0f1;
    }
    h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }
    .badge {
      padding: 8px 18px;
      border-radius: 20px;
      color: white;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .HIGH { background: #e74c3c; }
    .LOW { background: #27ae60; }
    .info p {
      margin: 12px 0;
      color: #34495e;
      font-size: 0.95rem;
    }
    .info strong {
      color: #2c3e50;
      font-weight: 600;
    }
  `]
})
export class DashboardClienteComponent {
  @Input() customer?: Customer;
}