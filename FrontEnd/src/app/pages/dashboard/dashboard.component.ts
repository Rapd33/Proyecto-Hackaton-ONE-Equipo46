import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ChurnPrediction, Customer } from '../../models/customer.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-container" *ngIf="customer && prediction">
      <h1>📊 Análisis de Riesgo</h1>
      <h3>Cliente: {{ customer.name }}</h3>
      
      <div class="risk-card" [ngClass]="prediction.riskLevel">
        <h2>{{ prediction.prediction }}</h2>
        <p>Probabilidad de fuga: <strong>{{ prediction.probability | percent }}</strong></p>
      </div>

      <div class="details">
        <p><strong>ID:</strong> {{ customer.id }}</p>
        <p><strong>Plan Actual:</strong> {{ customer.contractType }}</p>
        <p><strong>Email:</strong> {{ customer.email }}</p>
      </div>

      <button class="secondary" (click)="goHome()">
        🔄 Nueva Consulta
      </button>
    </div>
  `,
  styles: [`
    /* Estilos específicos solo para este componente */
    .risk-card {
      padding: 20px;
      border-radius: 8px;
      color: white;
      margin: 20px 0;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
    .HIGH { background: linear-gradient(135deg, #e74c3c, #c0392b); } /* Rojo Degradado */
    .LOW { background: linear-gradient(135deg, #2ecc71, #27ae60); }  /* Verde Degradado */
    .details { text-align: left; margin-top: 20px; color: #555; }
  `]
})
export class DashboardComponent implements OnInit {
  customer?: Customer;
  prediction?: ChurnPrediction;
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerService.getCustomer(id).subscribe(c => this.customer = c);
      this.customerService.getChurnPrediction(id).subscribe(p => this.prediction = p);
    }
  }

  // Chicos: Nos devuelve a la pantalla principal
  goHome() {
    this.router.navigate(['/validate']);
  }
}