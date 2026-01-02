import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { Customer, ChurnPrediction } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  // NOTA EQUIPO: Cambiar URL cuando el Backend Java (Spring Boot) esté listo
  private apiUrl = 'http://localhost:8080/api/customers'; 

  // =================================================================
  //  MODO MOCK (Simulación):
  //  Actualmente devolvemos datos falsos con 'of()' para trabajar
  //  en el Front sin depender del Backend.
  //  PARA PROD: Comentar los 'return of(...)' y descomentar los http.
  // =================================================================

  // 1. Validar si existe
  checkCustomerExists(id: string): Observable<boolean> {
    // MOCK: Simulamos que solo el ID '123' existe.
    return of(id === '123'); 
    // REAL: return this.http.get<boolean>(`${this.apiUrl}/${id}/exists`);
  }

  // 2. Obtener datos del cliente
  getCustomer(id: string): Observable<Customer> {
    // MOCK: Retornamos un cliente de prueba
    return of({ 
      id: id, 
      name: 'Juan Pérez (Mock)', 
      email: 'juan@test.com', 
      contractType: 'ANNUAL'
    } as Customer);
    // REAL: return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // 3. Registrar cliente
  registerCustomer(customer: Customer): Observable<Customer> {
    console.log('Guardando (Simulado):', customer);
    // MOCK: Simulamos éxito inmediato
    return of(customer);
    // REAL: return this.http.post<Customer>(this.apiUrl, customer);
  }

  // 4. Obtener predicción IA
  getChurnPrediction(id: string): Observable<ChurnPrediction> {
    // MOCK: Simulamos respuesta de la IA
    return of({ 
      customerId: id, 
      prediction: 'Va a cancelar', 
      probability: 0.78, 
      riskLevel: 'HIGH' 
    } as ChurnPrediction);
    // REAL: return this.http.get<ChurnPrediction>(`${this.apiUrl}/${id}/predict`);
  }
}