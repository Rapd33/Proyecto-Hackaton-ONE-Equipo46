import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  // Estado del formulario de contacto
  isSubmitting = false;
  contactData: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Features de la plataforma
  features: Feature[] = [
    {
      icon: '🎯',
      title: 'Predicción Precisa',
      description: 'Algoritmos de Machine Learning entrenados para identificar patrones de abandono con alta precisión.'
    },
    {
      icon: '📊',
      title: 'Análisis en Tiempo Real',
      description: 'Monitorea el comportamiento de tus clientes y obtén predicciones instantáneas sobre su riesgo de churn.'
    },
    {
      icon: '💡',
      title: 'Estrategias Personalizadas',
      description: 'Recibe recomendaciones específicas por rango de riesgo para retener a tus clientes efectivamente.'
    },
    {
      icon: '📈',
      title: 'Dashboard Intuitivo',
      description: 'Visualiza métricas clave y probabilidades de abandono en una interfaz clara y fácil de usar.'
    },
    {
      icon: '🔍',
      title: 'Búsqueda Inteligente',
      description: 'Encuentra clientes por ID, email o documento y consulta su perfil de riesgo al instante.'
    },
    {
      icon: '⚡',
      title: 'API REST Escalable',
      description: 'Integra nuestra solución con tus sistemas existentes mediante una API robusta y bien documentada.'
    }
  ];

  // INTEGRANTES (Orden A-Z)
  teamMembers = [
    { name: 'Bibiana Trujillo', role: 'Data Scientist', initials: 'BT', linkedin: '#' },
    { name: 'Fernando Hernández R.', role: 'Data Scientist', initials: 'FH', linkedin: '#' },
    { name: 'Giorgi Beltran Guzman', role: 'Backend Developer', initials: 'GB', linkedin: '#' },
    { name: 'Henry Corporan', role: 'Backend Developer', initials: 'HC', linkedin: '#' },
    { name: 'Juan Carlos Rueda R.', role: 'Backend & Frontend Dev', initials: 'JR', linkedin: '#' },
    { name: 'Rafael Alejandro Mena', role: 'Data Engineer', initials: 'RM', linkedin: '#' },
    { name: 'Rafael Patiño Diaz', role: 'Backend & Frontend Dev', initials: 'RP', linkedin: '#' },
    { name: 'Richard Jerez', role: 'Data Scientist', initials: 'RJ', linkedin: '#' }
  ];

  /**
   * Navega al dashboard de la aplicación
   */
  enterSystem(): void {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Scroll suave a la sección de features
   */
  scrollToFeatures(): void {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Scroll suave a la sección de contacto
   */
  scrollToContact(): void {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Maneja el envío del formulario de contacto
   */
  onContactSubmit(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    // Simulación de envío (aquí puedes integrar con un backend real)
    setTimeout(() => {
      this.notificationService.success(
        `¡Gracias ${this.contactData.name}! Hemos recibido tu mensaje y te contactaremos pronto.`
      );

      // Limpiar formulario
      this.contactData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      this.isSubmitting = false;
    }, 1500);
  }
}