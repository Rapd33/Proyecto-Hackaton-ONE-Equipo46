import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// CORRECCIÓN: Importamos desde 'customer' (sin .service)
import { CustomerService } from '../../../services/customer';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-cliente-nuevo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="overlay" (click)="closeModal()">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <h2>📝 Nuevo Cliente</h2>
        <p>El ID <strong>{{ customer.id }}</strong> no existe. Créalo ahora.</p>
        
        <form (ngSubmit)="save()">
          <input [(ngModel)]="customer.name" name="name" placeholder="Nombre" required />
          <input [(ngModel)]="customer.email" name="email" placeholder="Email" required />
          <select [(ngModel)]="customer.contractType" name="contract">
            <option value="MONTHLY">Mensual</option>
            <option value="ANNUAL">Anual</option>
          </select>
          <div class="actions">
            <button type="button" class="cancel" (click)="closeModal()">Cancelar</button>
            <button type="submit" class="save">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(4px); }
    .modal-card { background: white; padding: 2rem; border-radius: 12px; width: 350px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
    input, select { width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ddd; border-radius: 6px; }
    .actions { display: flex; gap: 10px; margin-top: 15px; }
    button { flex: 1; padding: 10px; border: none; border-radius: 6px; cursor: pointer; color: white; font-weight: bold; }
    .save { background: #2ecc71; } .cancel { background: #e74c3c; }
  `]
})
export class ClienteNuevoFormComponent {
  @Input() initialId = '';
  @Output() close = new EventEmitter<boolean>();
  
  customer: Customer = { id: '', name: '', email: '', contractType: 'MONTHLY' };
  private service = inject(CustomerService);

  ngOnInit() { if(this.initialId) this.customer.id = this.initialId; }
  
  save() { 
    this.service.registerCustomer(this.customer).subscribe(() => {
      // Emitimos true para avisar que se guardó correctamente
      this.close.emit(true); 
    }); 
  }
  
  closeModal() { this.close.emit(false); }
}