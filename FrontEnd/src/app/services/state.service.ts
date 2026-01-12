import { Injectable, signal, computed } from '@angular/core';
import { Customer } from '../models/customer.model';
import { PrediccionChurn } from '../models/prediccion-churn.model';

export interface AppState {
  currentCustomer: Customer | null;
  currentPrediction: PrediccionChurn | null;
  isLoadingPrediction: boolean;
  searchValue: string;
  searchType: 'customerId' | 'email' | 'document';
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Estado usando signals
  private currentCustomerSignal = signal<Customer | null>(null);
  private currentPredictionSignal = signal<PrediccionChurn | null>(null);
  private isLoadingPredictionSignal = signal<boolean>(false);
  private searchValueSignal = signal<string>('');
  private searchTypeSignal = signal<'customerId' | 'email' | 'document'>('email');

  // Getters de solo lectura
  readonly currentCustomer = this.currentCustomerSignal.asReadonly();
  readonly currentPrediction = this.currentPredictionSignal.asReadonly();
  readonly isLoadingPrediction = this.isLoadingPredictionSignal.asReadonly();
  readonly searchValue = this.searchValueSignal.asReadonly();
  readonly searchType = this.searchTypeSignal.asReadonly();

  // Computed signals
  readonly hasCustomer = computed(() => this.currentCustomerSignal() !== null);
  readonly hasPrediction = computed(() => this.currentPredictionSignal() !== null);

  // Métodos para actualizar el estado
  setCurrentCustomer(customer: Customer | null): void {
    this.currentCustomerSignal.set(customer);
  }

  setCurrentPrediction(prediction: PrediccionChurn | null): void {
    this.currentPredictionSignal.set(prediction);
  }

  setLoadingPrediction(loading: boolean): void {
    this.isLoadingPredictionSignal.set(loading);
  }

  setSearchValue(value: string): void {
    this.searchValueSignal.set(value);
  }

  setSearchType(type: 'customerId' | 'email' | 'document'): void {
    this.searchTypeSignal.set(type);
  }

  // Método para limpiar el estado
  clearSearch(): void {
    this.currentCustomerSignal.set(null);
    this.currentPredictionSignal.set(null);
    this.isLoadingPredictionSignal.set(false);
  }

  // Método para resetear completamente el estado
  resetState(): void {
    this.clearSearch();
    this.searchValueSignal.set('');
    this.searchTypeSignal.set('email');
  }
}
