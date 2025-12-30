import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-general',
  standalone: true,
  template: `
    <div class="stats-grid">
      <div class="card"><h3>Clientes</h3><span>1,240</span></div>
      <div class="card warning"><h3>Riesgo Alto</h3><span>15%</span></div>
      <div class="card success"><h3>Retenidos</h3><span>85%</span></div>
    </div>
  `,
  styles: [`
    .stats-grid { display: flex; gap: 15px; margin-bottom: 30px; }
    .card { flex: 1; background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
    span { font-size: 2rem; font-weight: bold; display: block; margin-top: 10px; }
    .warning span { color: #e67e22; } .success span { color: #27ae60; }
  `]
})
export class DashboardGeneralComponent {}