import { Routes } from '@angular/router';
// Importamos los archivos tal cual los tienes nombrados
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Home },             // Portada
  { path: 'dashboard', component: Dashboard }, // Sistema Principal
  { path: '**', redirectTo: '' }             // Redirección por defecto
];