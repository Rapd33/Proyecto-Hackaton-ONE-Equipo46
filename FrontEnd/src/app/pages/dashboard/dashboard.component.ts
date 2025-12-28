import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ChurnPrediction, Customer } from '../../models/customer.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard" *ngIf="customer && prediction">
      <h1>Análisis de Riesgo: {{ customer.name }}</h1>
      
      <div class="card" [ngClass]="prediction.riskLevel">
        <h3>Predicción: {{ prediction.prediction }}</h3>
        <p>Probabilidad: {{ prediction.probability | percent }}</p>
      </div>

      <div class="details">
        <p>ID: {{ customer.id }}</p>
        <p>Plan: {{ customer.contractType }}</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; }
    .card { padding: 20px; border-radius: 8px; color: white; margin-bottom: 20px;}
    .HIGH { background-color: #e74c3c; } /* Rojo para alto riesgo */
    .LOW { background-color: #27ae60; }  /* Verde para bajo riesgo */
  `]
})
export class DashboardComponent implements OnInit {
  customer?: Customer;
  prediction?: ChurnPrediction;
  
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Cargamos datos en paralelo
      this.customerService.getCustomer(id).subscribe(c => this.customer = c);
      this.customerService.getChurnPrediction(id).subscribe(p => this.prediction = p);
    }
  }
}
