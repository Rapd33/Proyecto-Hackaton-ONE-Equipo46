import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer, ChurnPrediction } from '../../../models/customer.model';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="result-card" *ngIf="customer">
      <div class="header">
        <h2>{{ customer.name }}</h2>
        <span class="badge" [ngClass]="prediction?.riskLevel">{{ prediction?.prediction }}</span>
      </div>
      <div class="info">
        <p><strong>Email:</strong> {{ customer.email }}</p>
        <p><strong>Plan:</strong> {{ customer.contractType }}</p>
        <p><strong>Probabilidad Fuga:</strong> {{ prediction?.probability | percent }}</p>
      </div>
    </div>
  `,
  styles: [`
    .result-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; border-left: 5px solid #3498db; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .badge { padding: 5px 15px; border-radius: 20px; color: white; font-size: 0.9rem; }
    .HIGH { background: #e74c3c; } .LOW { background: #2ecc71; }
  `]
})
export class DashboardClienteComponent {
  @Input() customer?: Customer;
  @Input() prediction?: ChurnPrediction;
}