import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrediccionChurn } from '../../../models/prediccion-churn.model';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Loading State -->
    <div class="loading-card" *ngIf="loading">
      <div class="spinner"></div>
      <p>Analizando riesgo de churn con IA...</p>
    </div>

    <!-- Predicción Completa -->
    <div class="prediction-card" *ngIf="prediccion && !loading">
      <!-- Header con datos del cliente -->
      <div class="header">
        <div class="client-info">
          <h2>{{ prediccion.nombreCompleto }}</h2>
          <p class="client-id">ID: {{ prediccion.customerId }}</p>
        </div>
        <span class="risk-badge" [ngClass]="prediccion.riskLevel === 'Alto' ? 'HIGH' : 'LOW'">
          {{ prediccion.riskLevel === 'Alto' ? 'RIESGO ALTO' : 'RIESGO BAJO' }}
        </span>
      </div>

      <!-- Información básica del cliente -->
      <div class="client-details">
        <div class="detail-item">
          <span class="label">Correo:</span>
          <span class="value">{{ prediccion.correoElectronico }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Documento:</span>
          <span class="value">{{ prediccion.documentoIdentidad }}</span>
        </div>
      </div>

      <!-- Métricas de Predicción -->
      <div class="metrics-section">
        <h3>📊 Análisis de Churn</h3>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Probabilidad de Abandono</div>
            <div class="metric-value" [ngClass]="getProbabilityClass()">
              {{ (prediccion.churnProbability * 100).toFixed(1) }}%
            </div>
            <div class="progress-bar">
              <div class="progress-fill"
                   [style.width.%]="prediccion.churnProbability * 100"
                   [ngClass]="getProbabilityClass()">
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-label">Predicción</div>
            <div class="metric-value">
              {{ prediccion.prediction === 1 ? 'Probable Abandono' : 'Cliente Estable' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Estrategia de Retención -->
      <div class="strategy-section">
        <h3>🎯 Estrategia de Retención</h3>
        <div class="strategy-badge" [ngClass]="getStrategyClass()">
          {{ prediccion.estrategiaRetencion }}
        </div>
      </div>

      <!-- Recomendaciones -->
      <div class="recommendations-section">
        <h3>💡 Recomendaciones</h3>
        <div class="recommendation-box">
          <p>{{ prediccion.recomendacion }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      text-align: center;
      margin-bottom: 20px;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 15px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .prediction-card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      margin-bottom: 20px;
      border-left: 5px solid #3498db;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 2px solid #ecf0f1;
    }

    .client-info h2 {
      margin: 0 0 5px 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }

    .client-id {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .risk-badge {
      padding: 12px 24px;
      border-radius: 25px;
      color: white;
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .HIGH {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
    }

    .LOW {
      background: linear-gradient(135deg, #27ae60, #229954);
    }

    .client-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin-bottom: 25px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .detail-item .label {
      font-size: 0.85rem;
      color: #7f8c8d;
      font-weight: 600;
      text-transform: uppercase;
    }

    .detail-item .value {
      font-size: 1rem;
      color: #2c3e50;
      font-weight: 500;
    }

    .metrics-section,
    .strategy-section,
    .recommendations-section {
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #ecf0f1;
    }

    h3 {
      margin: 0 0 15px 0;
      color: #2c3e50;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .metric-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #e9ecef;
    }

    .metric-label {
      font-size: 0.85rem;
      color: #6c757d;
      margin-bottom: 10px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .metric-value.high { color: #e74c3c; }
    .metric-value.medium { color: #f39c12; }
    .metric-value.low { color: #27ae60; }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e9ecef;
      border-radius: 10px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      transition: width 0.5s ease;
      border-radius: 10px;
    }

    .progress-fill.high { background: linear-gradient(90deg, #e74c3c, #c0392b); }
    .progress-fill.medium { background: linear-gradient(90deg, #f39c12, #e67e22); }
    .progress-fill.low { background: linear-gradient(90deg, #27ae60, #229954); }

    .strategy-badge {
      display: inline-block;
      padding: 15px 25px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      border-left: 4px solid;
    }

    .strategy-badge.urgent {
      background: #fee;
      color: #c0392b;
      border-color: #e74c3c;
    }

    .strategy-badge.medium {
      background: #fef5e7;
      color: #d68910;
      border-color: #f39c12;
    }

    .strategy-badge.low {
      background: #eafaf1;
      color: #1e8449;
      border-color: #27ae60;
    }

    .recommendation-box {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      border-left: 4px solid #3498db;
    }

    .recommendation-box p {
      margin: 0;
      color: #2c3e50;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  `]
})
export class DashboardClienteComponent {
  @Input() prediccion?: PrediccionChurn;
  @Input() loading = false;

  getProbabilityClass(): string {
    if (!this.prediccion) return 'low';
    if (this.prediccion.churnProbability > 0.7) return 'high';
    if (this.prediccion.churnProbability > 0.5) return 'medium';
    return 'low';
  }

  getStrategyClass(): string {
    if (!this.prediccion) return 'low';
    const estrategia = this.prediccion.estrategiaRetencion.toLowerCase();
    if (estrategia.includes('urgente')) return 'urgent';
    if (estrategia.includes('medio')) return 'medium';
    return 'low';
  }
}