import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../services/customer';
import { DashboardStats, RiskDistribution } from '../../../models/dashboard-stats.model';

/**
 * COMPONENTE DASHBOARD GENERAL
 * Muestra las estadísticas generales del sistema:
 * - Métricas principales (clientes totales, activos, desertados, tasa retención)
 * - Distribución por nivel de riesgo
 * - Gráfico de pastel con distribución de riesgos
 */
@Component({
  selector: 'app-dashboard-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-general.html',
  styleUrls: ['./dashboard-general.css']
})
export class DashboardGeneralComponent implements OnInit {
  private service = inject(CustomerService);

  // Estado de carga
  loading = true;
  errorMessage = '';

  // Datos de estadísticas
  stats?: DashboardStats;

  // Distribución de riesgo para gráfico de pastel (porcentajes)
  riskDistribution: RiskDistribution = {
    alto: 0,
    medio: 0,
    bajo: 0
  };

  // Exponer Math para usar en el template
  Math = Math;

  // Control del tooltip activo
  activeTooltip: 'high' | 'medium' | 'low' | null = null;

  ngOnInit() {
    this.loadStats();
  }

  /**
   * Carga las estadísticas del dashboard
   */
  private loadStats() {
    console.log('[DashboardGeneral] Iniciando carga de estadísticas...');
    this.loading = true;
    this.errorMessage = '';

    this.service.getDashboardStats().subscribe({
      next: (data) => {
        console.log('[DashboardGeneral] Datos recibidos del backend:', data);
        this.stats = data;
        this.calculateRiskDistribution();
        this.loading = false;
        console.log('[DashboardGeneral] Estado final - loading:', this.loading, 'stats:', this.stats);
      },
      error: (error) => {
        console.error('[DashboardGeneral] Error completo:', error);
        console.error('[DashboardGeneral] Error status:', error.status);
        console.error('[DashboardGeneral] Error message:', error.message);
        this.errorMessage = 'No se pudieron cargar las estadísticas';
        this.loading = false;

        // DATOS DE EJEMPLO TEMPORALES para depuración
        console.warn('[DashboardGeneral] Usando datos de ejemplo temporales para depuración');
        this.stats = {
          totalClientes: 1240,
          clientesActivos: 1054,
          clientesDesertados: 186,
          tasaRetencion: 85.0,
          clientesRiesgoAlto: 124,
          clientesRiesgoMedio: 310,
          clientesRiesgoBajo: 620
        };
        this.calculateRiskDistribution();
        this.loading = false;
      },
      complete: () => {
        console.log('[DashboardGeneral] Observable completado');
      }
    });
  }

  /**
   * Calcula la distribución porcentual de clientes por nivel de riesgo
   */
  private calculateRiskDistribution() {
    if (!this.stats) return;

    const total = this.stats.clientesRiesgoAlto + this.stats.clientesRiesgoMedio + this.stats.clientesRiesgoBajo;

    if (total === 0) {
      this.riskDistribution = { alto: 0, medio: 0, bajo: 0 };
      return;
    }

    this.riskDistribution = {
      alto: (this.stats.clientesRiesgoAlto / total) * 100,
      medio: (this.stats.clientesRiesgoMedio / total) * 100,
      bajo: (this.stats.clientesRiesgoBajo / total) * 100
    };
  }

  /**
   * Formatea números grandes con separadores de miles
   */
  formatNumber(num: number): string {
    return num.toLocaleString('es-ES');
  }

  /**
   * Formatea porcentajes con 1 decimal
   */
  formatPercentage(num: number): string {
    return `${num.toFixed(1)}%`;
  }

  /**
   * Muestra el tooltip para una sección específica del gráfico
   */
  showTooltip(section: 'high' | 'medium' | 'low') {
    this.activeTooltip = section;
  }

  /**
   * Oculta el tooltip activo
   */
  hideTooltip() {
    this.activeTooltip = null;
  }

  /**
   * Genera el path SVG para una sección del gráfico de pastel
   * @param startPercent Porcentaje de inicio (0-100)
   * @param endPercent Porcentaje de fin (0-100)
   */
  getPiePath(startPercent: number, endPercent: number): string {
    const centerX = 50;
    const centerY = 50;
    const radius = 45; // Radio exterior (90% del radio total para dejar margen)
    const innerRadius = 20; // Radio interior (para el efecto donut)

    // Convertir porcentajes a ángulos (0% = -90°, 100% = 270°)
    const startAngle = (startPercent * 3.6 - 90) * (Math.PI / 180);
    const endAngle = (endPercent * 3.6 - 90) * (Math.PI / 180);

    // Calcular puntos del arco exterior
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    // Calcular puntos del arco interior (en orden inverso)
    const x3 = centerX + innerRadius * Math.cos(endAngle);
    const y3 = centerY + innerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(startAngle);
    const y4 = centerY + innerRadius * Math.sin(startAngle);

    // Determinar si el arco es mayor a 180 grados
    const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;

    // Construir el path SVG
    const path = [
      `M ${x1} ${y1}`, // Mover al punto inicial del arco exterior
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arco exterior
      `L ${x3} ${y3}`, // Línea al punto final del arco interior
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Arco interior (inverso)
      `Z` // Cerrar el path
    ].join(' ');

    return path;
  }
}
