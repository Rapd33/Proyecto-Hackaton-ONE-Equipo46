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
    if (this.prediccion.churnProbability > 0.6666) return 'high';
    if (this.prediccion.churnProbability > 0.3333) return 'medium';
    return 'low';
  }

  getStrategyClass(): string {
    if (!this.prediccion?.estrategias) return 'low';
    const nivel = this.prediccion.estrategias.nivelRiesgo?.toLowerCase();
    if (nivel === 'alto') return 'urgent';
    if (nivel === 'medio') return 'medium';
    return 'low';
  }
}
