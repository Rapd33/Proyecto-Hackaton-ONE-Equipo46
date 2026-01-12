/**
 * Modelo para las estadísticas generales del dashboard
 */
export interface DashboardStats {
  // Métricas principales
  totalClientes: number;
  clientesActivos: number;
  clientesDesertados: number;
  tasaRetencion: number; // Porcentaje 0-100

  // Clientes por nivel de riesgo
  clientesRiesgoAlto: number;
  clientesRiesgoMedio: number;
  clientesRiesgoBajo: number;

  // Métrica adicional
  valorEnRiesgo?: number; // Opcional: valor monetario en riesgo
}

/**
 * Modelo para la distribución por nivel de riesgo (gráfico de pastel)
 */
export interface RiskDistribution {
  alto: number;
  medio: number;
  bajo: number;
}

/**
 * Modelo para tendencia mensual de churn
 */
export interface ChurnTrend {
  mes: string; // Ej: "Ene", "Feb", etc.
  cantidadChurn: number;
  cantidadRetenidos: number;
}
