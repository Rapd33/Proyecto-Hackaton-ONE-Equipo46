import { Routes } from '@angular/router';
import { ValidationComponent } from './pages/validation/validation.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'validate', pathMatch: 'full' },
  { path: 'validate', component: ValidationComponent },
  { path: 'register/:id', component: RegisterComponent }, // Recibe el ID que no se encontró
  { path: 'dashboard/:id', component: DashboardComponent } // Recibe el ID para mostrar datos
];