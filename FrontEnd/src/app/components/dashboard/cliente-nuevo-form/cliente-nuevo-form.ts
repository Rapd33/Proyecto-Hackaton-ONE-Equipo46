import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-nuevo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="overlay" (click)="closeModal()">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <h2>📝 Búsqueda de Cliente</h2>
        <p class="info-text">Busca clientes existentes por correo o documento</p>

        <div class="info-message">
          <p>⚠️ Este formulario es solo para búsqueda.</p>
          <p>Los clientes ya están registrados en la base de datos.</p>
        </div>

        <div class="actions">
          <button type="button" class="cancel" (click)="closeModal()">Cerrar</button>
        </div>
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
    }
    .modal-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      width: 400px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
    h2 {
      margin: 0 0 10px 0;
      color: #2c3e50;
    }
    .info-text {
      color: #7f8c8d;
      margin-bottom: 20px;
    }
    .info-message {
      background: #ecf0f1;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #3498db;
    }
    .info-message p {
      margin: 5px 0;
      color: #34495e;
      font-size: 0.9rem;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      color: white;
      font-weight: bold;
    }
    .cancel {
      background: #95a5a6;
    }
    .cancel:hover {
      background: #7f8c8d;
    }
  `]
})
export class ClienteNuevoFormComponent {
  @Output() close = new EventEmitter<boolean>();

  closeModal() {
    this.close.emit(false);
  }
}
