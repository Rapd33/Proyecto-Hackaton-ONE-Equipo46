import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomerCreation } from '../models/customer-creation.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/clientes';

  /**
   * Verificar si existe un cliente por customerId
   */
  checkCustomerExists(customerId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${customerId}/exists`);
  }

  /**
   * Obtener cliente por customerId
   */
  getCustomer(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${customerId}`);
  }

  /**
   * Obtener todos los clientes
   */
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  /**
   * Buscar cliente por correo electrónico
   */
  getCustomerByEmail(correo: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/correo/${correo}`);
  }

  /**
   * Buscar cliente por documento de identidad
   */
  getCustomerByDocument(documento: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/documento/${documento}`);
  }

  /**
   * Obtener clientes en riesgo de churn
   */
  getCustomersAtRisk(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/en-riesgo`);
  }

  /**
   * Crear un nuevo cliente
   */
  createCustomer(customerData: CustomerCreation): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customerData);
  }
}