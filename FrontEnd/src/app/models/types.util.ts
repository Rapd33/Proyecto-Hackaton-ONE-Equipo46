/**
 * Tipos utilitarios para mejorar el tipado en la aplicación
 */

// Tipo para resultados de API que pueden fallar
export type ApiResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

// Tipo para estados de carga
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Tipo para hacer propiedades opcionales
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Tipo para hacer propiedades requeridas
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Tipo para extraer propiedades de solo lectura
export type ReadonlyKeys<T> = {
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T];

// Tipo para valores de un enum/objeto
export type ValueOf<T> = T[keyof T];

// Tipo para crear un diccionario
export type Dictionary<T> = Record<string, T>;

// Tipo para niveles de riesgo
export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

// Tipo para métodos de búsqueda
export type SearchMethod = 'customerId' | 'email' | 'document';

// Tipo para respuestas de la API con paginación
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Tipo para errores de API
export interface ApiError {
  message: string;
  code?: string;
  details?: Dictionary<string[]>;
}

// Tipo para validación de formularios
export interface ValidationError {
  field: string;
  message: string;
}

// Tipo genérico para entidades con ID
export interface Entity {
  id: string | number;
}

// Tipo para respuestas de operaciones CRUD
export interface CrudResponse<T> {
  created?: T;
  updated?: T;
  deleted?: boolean;
}

// Tipo para filtros de búsqueda
export interface SearchFilters {
  query?: string;
  filters?: Dictionary<unknown>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}

// Helper type para extraer el tipo de un array
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Helper type para crear tipos profundamente parciales
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Helper type para crear tipos profundamente requeridos
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Tipo para funciones de callback
export type Callback<T = void> = (data: T) => void;

// Tipo para async callbacks
export type AsyncCallback<T = void> = (data: T) => Promise<void>;
