/*import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Customer, ChurnPrediction } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  
  // ⚠️ IMPORTANTE: Esta URL debe coincidir con tu @RequestMapping en Java
  private apiUrl = 'http://localhost:8080/api/customers'; 

  // 1. Validar si existe (GET /api/customers/{id}/exists)
  checkCustomerExists(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/exists`);
  }

  // 2. Obtener datos del cliente (GET /api/customers/{id})
  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // 3. Registrar cliente (POST /api/customers)
  registerCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  // 4. Obtener predicción (GET /api/customers/{id}/predict)
  getChurnPrediction(id: string): Observable<ChurnPrediction> {
    return this.http.get<ChurnPrediction>(`${this.apiUrl}/${id}/predict`);
  }
}*/

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { Customer, ChurnPrediction } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/customers'; 

  // =================================================================
  //  NOTA PARA EL EQUIPO:
  //  Actualmente este servicio está en "MODO MOCK" (Simulación).
  //  Esto permite trabajar en el Front sin necesidad de tener el 
  //  Backend de Java corriendo.
  //
  //  PARA CONECTAR CON JAVA:
  //  1. Comenta las líneas que empiezan con 'return of(...)'.
  //  2. Descomenta las líneas que usan 'this.http...'.
  // =================================================================

  // 1. Validar si existe (GET /api/customers/{id}/exists)
  checkCustomerExists(id: string): Observable<boolean> {
    // --- MOCK: Simulamos que solo el ID '123' existe ---
    return of(id === '123'); 
    
    // --- REAL (Backend Java) ---
    // return this.http.get<boolean>(`${this.apiUrl}/${id}/exists`);
  }

  // 2. Obtener datos del cliente (GET /api/customers/{id})
  getCustomer(id: string): Observable<Customer> {
    // --- MOCK: Retornamos un cliente falso para ver el Dashboard ---
    return of({ 
      id: id, 
      name: 'Juan Pérez (Mock)', 
      email: 'juan@test.com', 
      contractType: 'ANNUAL',
      lastPaymentDate: '2025-01-01',
      totalSpend: 1500
    } as Customer);

    // --- REAL (Backend Java) ---
    // return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // 3. Registrar cliente (POST /api/customers)
  registerCustomer(customer: Customer): Observable<Customer> {
    console.log('Enviando al Backend:', customer); // Para depuración

    // --- MOCK: Simulamos éxito inmediato ---
    return of(customer);

    // --- REAL (Backend Java) ---
    // return this.http.post<Customer>(this.apiUrl, customer);
  }

  // 4. Obtener predicción (GET /api/customers/{id}/predict)
  getChurnPrediction(id: string): Observable<ChurnPrediction> {
    // --- MOCK: Simulamos respuesta del modelo de Data Science ---
    // Cambia 'prediction' o 'riskLevel' aquí para probar distintos colores en el UI
    return of({ 
      customerId: id, 
      prediction: 'Va a cancelar', 
      probability: 0.78, 
      riskLevel: 'HIGH' // Prueba con 'LOW' o 'MEDIUM'
    } as ChurnPrediction);

    // --- REAL (Backend Java) ---
    // return this.http.get<ChurnPrediction>(`${this.apiUrl}/${id}/predict`);
  }
}