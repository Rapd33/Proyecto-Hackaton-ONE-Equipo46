import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrediccionChurn } from '../../../models/prediccion-churn.model';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-cliente.html',
  styleUrls: ['./dashboard-cliente.css']
})
export class DashboardClienteComponent {
  @Input() customer?: Customer;
  @Input() prediccion?: PrediccionChurn;
  @Input() loading = false;

  getProbabilityClass(): string {
    if (!this.prediccion) return 'low';
    if (this.prediccion.churnProbability > 0.7) return 'high';
    if (this.prediccion.churnProbability > 0.5) return 'medium';
    return 'low';
  }

  getStrategyClass(): string {
    if (!this.prediccion) return 'low';
    const estrategia = this.prediccion.estrategiaRetencion.toLowerCase();
    if (estrategia.includes('urgente')) return 'urgent';
    if (estrategia.includes('medio')) return 'medium';
    return 'low';
  }
}