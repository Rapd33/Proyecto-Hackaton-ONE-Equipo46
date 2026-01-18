/**
 * Literales para niveles de riesgo en español
 */
export type RiskLevelES = 'Alto' | 'Bajo' | 'Medio';

/**
 * Literales para predicción de churn
 */
export type ChurnPrediction = 0 | 1;

/**
 * Detalle de una estrategia específica
 */
export interface EstrategiaDetalle {
  numero: number;
  titulo: string;
  descripcion: string;
  descuento: string | null;
}

/**
 * DTO con todas las estrategias de retención
 */
export interface Estrategias {
  nivelRiesgo: RiskLevelES;
  rangoProbabilidad: string;
  estrategiaPrincipal: string;
  estrategiasDetalladas: EstrategiaDetalle[];
}

/**
 * Modelo para la predicción de churn de un cliente
 * Incluye datos del cliente y predicción completa
 */
export interface PrediccionChurn {
  // Datos básicos del cliente
  customerId: string;
  nombreCompleto: string;
  correoElectronico: string;
  documentoIdentidad: number;

  // Datos de predicción ML
  prediction: ChurnPrediction;      // 0 = No churn, 1 = Churn
  churnProbability: number;         // 0.0 - 1.0
  riskLevel: RiskLevelES;           // "Alto", "Medio" o "Bajo"

  // Estrategias de retención completas
  estrategias: Estrategias;
}
