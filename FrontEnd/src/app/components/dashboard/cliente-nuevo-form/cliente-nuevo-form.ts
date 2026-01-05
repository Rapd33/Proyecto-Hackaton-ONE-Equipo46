import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer';
import { CustomerCreation } from '../../../models/customer-creation.model';

@Component({
  selector: 'app-cliente-nuevo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="overlay" (click)="closeModal()">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <h2>Registrar Nuevo Cliente</h2>

        <div class="error-message" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>

        <div class="success-message" *ngIf="successMessage">
          {{ successMessage }}
        </div>

        <form (ngSubmit)="onSubmit()" #customerForm="ngForm">

          <!-- Sección: Datos Personales -->
          <div class="form-section">
            <h3>Datos Personales</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Nombre *</label>
                <input type="text" [(ngModel)]="formData.nombre" name="nombre" required>
              </div>
              <div class="form-group">
                <label>Apellido *</label>
                <input type="text" [(ngModel)]="formData.apellido" name="apellido" required>
              </div>
              <div class="form-group">
                <label>Documento de Identidad *</label>
                <input type="number" [(ngModel)]="formData.documentoIdentidad" name="documento" required>
              </div>
              <div class="form-group">
                <label>Correo Electrónico *</label>
                <input type="email" [(ngModel)]="formData.correoElectronico" name="correo" required>
              </div>
              <div class="form-group">
                <label>Género *</label>
                <select [(ngModel)]="formData.gender" name="gender" required>
                  <option value="">Seleccionar</option>
                  <option value="Male">Masculino</option>
                  <option value="Female">Femenino</option>
                </select>
              </div>
              <div class="form-group">
                <label>Adulto Mayor *</label>
                <select [(ngModel)]="formData.seniorCitizen" name="seniorCitizen" required>
                  <option [ngValue]="0">No</option>
                  <option [ngValue]="1">Sí</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tiene Pareja *</label>
                <select [(ngModel)]="formData.partner" name="partner" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tiene Dependientes *</label>
                <select [(ngModel)]="formData.dependents" name="dependents" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Sección: Servicios Telefónicos -->
          <div class="form-section">
            <h3>Servicios Telefónicos</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Servicio Telefónico *</label>
                <select [(ngModel)]="formData.phoneService" name="phoneService" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="form-group">
                <label>Múltiples Líneas *</label>
                <select [(ngModel)]="formData.multipleLines" name="multipleLines" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                  <option value="No phone service">No tiene servicio</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Sección: Servicios de Internet -->
          <div class="form-section">
            <h3>Servicios de Internet</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Servicio de Internet *</label>
                <select [(ngModel)]="formData.internetService" name="internetService" required>
                  <option value="">Seleccionar</option>
                  <option value="DSL">DSL</option>
                  <option value="Fiber optic">Fibra Óptica</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="form-group">
                <label>Seguridad Online *</label>
                <select [(ngModel)]="formData.onlineSecurity" name="onlineSecurity" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                  <option value="No internet service">No tiene internet</option>
                </select>
              </div>
              <div class="form-group">
                <label>Backup Online *</label>
                <select [(ngModel)]="formData.onlineBackup" name="onlineBackup" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                  <option value="No internet service">No tiene internet</option>
                </select>
              </div>
              <div class="form-group">
                <label>Protección de Dispositivos *</label>
                <select [(ngModel)]="formData.deviceProtection" name="deviceProtection" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                  <option value="No internet service">No tiene internet</option>
                </select>
              </div>
              <div class="form-group">
                <label>Soporte Técnico *</label>
                <select [(ngModel)]="formData.techSupport" name="techSupport" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                  <option value="No internet service">No tiene internet</option>
                </select>
              </div>
              <div class="form-group">
                <label>Streaming TV *</label>
                <select [(ngModel)]="formData.streamingTv" name="streamingTv" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                  <option value="No internet service">No tiene internet</option>
                </select>
              </div>
              <div class="form-group">
                <label>Streaming Películas *</label>
                <select [(ngModel)]="formData.streamingMovies" name="streamingMovies" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                  <option value="No internet service">No tiene internet</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Sección: Contrato y Facturación -->
          <div class="form-section">
            <h3>Contrato y Facturación</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Tipo de Contrato *</label>
                <select [(ngModel)]="formData.contract" name="contract" required>
                  <option value="">Seleccionar</option>
                  <option value="Month-to-month">Mes a mes</option>
                  <option value="One year">Un año</option>
                  <option value="Two year">Dos años</option>
                </select>
              </div>
              <div class="form-group">
                <label>Facturación Sin Papel *</label>
                <select [(ngModel)]="formData.paperlessBilling" name="paperlessBilling" required>
                  <option value="">Seleccionar</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="form-group">
                <label>Método de Pago *</label>
                <select [(ngModel)]="formData.paymentMethod" name="paymentMethod" required>
                  <option value="">Seleccionar</option>
                  <option value="Electronic check">Cheque Electrónico</option>
                  <option value="Mailed check">Cheque por Correo</option>
                  <option value="Bank transfer (automatic)">Transferencia Bancaria</option>
                  <option value="Credit card (automatic)">Tarjeta de Crédito</option>
                </select>
              </div>
              <div class="form-group">
                <label>Antigüedad (meses) *</label>
                <input type="number" [(ngModel)]="formData.tenure" name="tenure" required min="0">
              </div>
              <div class="form-group">
                <label>Cargo Mensual *</label>
                <input type="number" [(ngModel)]="formData.monthlyCharges" name="monthlyCharges" required step="0.01" min="0">
              </div>
              <div class="form-group">
                <label>Cargo Total (opcional)</label>
                <input type="number" [(ngModel)]="formData.totalCharges" name="totalCharges" step="0.01" min="0">
              </div>
            </div>
          </div>

          <div class="actions">
            <button type="button" class="cancel" (click)="closeModal()">Cancelar</button>
            <button type="submit" class="save" [disabled]="!customerForm.valid || isSubmitting">
              {{ isSubmitting ? 'Guardando...' : 'Registrar Cliente' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(4px);
      overflow-y: auto;
      padding: 20px;
    }
    .modal-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      width: 90%;
      max-width: 900px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
    h2 {
      margin: 0 0 20px 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }
    h3 {
      margin: 0 0 15px 0;
      color: #34495e;
      font-size: 1.2rem;
      border-bottom: 2px solid #3498db;
      padding-bottom: 8px;
    }
    .form-section {
      margin-bottom: 25px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    label {
      font-weight: 600;
      margin-bottom: 5px;
      color: #2c3e50;
      font-size: 0.9rem;
    }
    input, select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: border-color 0.3s;
    }
    input:focus, select:focus {
      outline: none;
      border-color: #3498db;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .error-message {
      background: #e74c3c;
      color: white;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }
    .success-message {
      background: #27ae60;
      color: white;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      color: white;
      font-weight: bold;
      font-size: 1rem;
      transition: background 0.3s;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .cancel {
      background: #95a5a6;
    }
    .cancel:hover:not(:disabled) {
      background: #7f8c8d;
    }
    .save {
      background: #27ae60;
    }
    .save:hover:not(:disabled) {
      background: #229954;
    }
  `]
})
export class ClienteNuevoFormComponent {
  private customerService = inject(CustomerService);

  @Output() close = new EventEmitter<boolean>();
  @Output() customerCreated = new EventEmitter<void>();

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  formData: CustomerCreation = {
    nombre: '',
    apellido: '',
    documentoIdentidad: 0,
    correoElectronico: '',
    gender: '',
    seniorCitizen: 0,
    partner: '',
    dependents: '',
    phoneService: '',
    multipleLines: '',
    internetService: '',
    onlineSecurity: '',
    onlineBackup: '',
    deviceProtection: '',
    techSupport: '',
    streamingTv: '',
    streamingMovies: '',
    contract: '',
    paperlessBilling: '',
    paymentMethod: '',
    tenure: 0,
    monthlyCharges: 0,
    totalCharges: 0
  };

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.customerService.createCustomer(this.formData).subscribe({
      next: (response) => {
        this.successMessage = `Cliente ${response.nombreCompleto} registrado exitosamente con ID: ${response.customerId}`;
        this.isSubmitting = false;

        // Esperar 2 segundos para que el usuario vea el mensaje de éxito
        setTimeout(() => {
          this.customerCreated.emit();
          this.closeModal();
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 409) {
          // Conflicto: cliente duplicado
          this.errorMessage = error.error || 'Ya existe un cliente con ese correo o documento';
        } else {
          this.errorMessage = 'Error al registrar el cliente. Por favor, intenta nuevamente.';
        }
        console.error('Error al crear cliente:', error);
      }
    });
  }

  closeModal() {
    this.close.emit(false);
  }
}
