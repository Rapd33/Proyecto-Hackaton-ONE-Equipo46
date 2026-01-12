import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer';
import { CustomerCreation } from '../../../models/customer-creation.model';

@Component({
  selector: 'app-cliente-nuevo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-nuevo-form.html',
  styleUrls: ['./cliente-nuevo-form.css']
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
