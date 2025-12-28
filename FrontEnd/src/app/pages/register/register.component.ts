import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // O ReactiveForms si prefieres
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Registro de Nuevo Cliente</h2>
      <p>El ID <strong>{{ customer.id }}</strong> no existe. Regístralo:</p>
      
      <form (ngSubmit)="save()">
        <input [(ngModel)]="customer.name" name="name" placeholder="Nombre Completo" required />
        <input [(ngModel)]="customer.email" name="email" placeholder="Email" required />
        
        <label>Tipo de Contrato:</label>
        <select [(ngModel)]="customer.contractType" name="contract">
          <option value="MONTHLY">Mensual</option>
          <option value="ANNUAL">Anual</option>
        </select>

        <button type="submit">Guardar y Analizar</button>
      </form>
    </div>
  `
})
export class RegisterComponent implements OnInit {
  customer: Customer = { id: '', name: '', email: '', contractType: 'MONTHLY' };
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);

  ngOnInit() {
    this.customer.id = this.route.snapshot.paramMap.get('id') || '';
  }

  save() {
    this.customerService.registerCustomer(this.customer).subscribe(() => {
      alert('Cliente registrado!');
      this.router.navigate(['/dashboard', this.customer.id]);
    });
  }
}