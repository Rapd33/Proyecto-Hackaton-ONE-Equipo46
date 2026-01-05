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
  prediction: number;           // 0 = No churn, 1 = Churn
  churnProbability: number;     // 0.0 - 1.0
  riskLevel: string;            // "Alto" o "Bajo"

  // Estrategia de retención
  estrategiaRetencion: string;
  recomendacion: string;
}
