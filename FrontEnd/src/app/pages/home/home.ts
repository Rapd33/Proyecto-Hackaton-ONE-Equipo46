import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NotificationService } from '../../services/notification.service';

interface Feature {
  icon: SafeHtml;
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
  private sanitizer = inject(DomSanitizer);

  // Estado del formulario de contacto
  isSubmitting = false;
  contactData: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Estado del botón scroll to top
  showScrollToTop = false;

  // Features de la plataforma
  features: Feature[] = [
    {
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`),
      title: 'Predicción Precisa',
      description: 'Algoritmos de Machine Learning entrenados para identificar patrones de abandono con alta precisión.'
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>`),
      title: 'Análisis en Tiempo Real',
      description: 'Monitorea el comportamiento de tus clientes y obtén predicciones instantáneas sobre su riesgo de churn.'
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>`),
      title: 'Estrategias Personalizadas',
      description: 'Recibe recomendaciones específicas por rango de riesgo para retener a tus clientes efectivamente.'
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>`),
      title: 'Dashboard Intuitivo',
      description: 'Visualiza métricas clave y probabilidades de abandono en una interfaz clara y fácil de usar.'
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>`),
      title: 'Búsqueda Inteligente',
      description: 'Encuentra clientes por ID, email o documento y consulta su perfil de riesgo al instante.'
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>`),
      title: 'API REST Escalable',
      description: 'Integra nuestra solución con tus sistemas existentes mediante una API robusta y bien documentada.'
    }
  ];

  // INTEGRANTES (Orden A-Z)
  teamMembers = [
    { name: 'Bibiana Trujillo', role: 'Data Scientist', initials: 'BT', linkedin: 'https://www.linkedin.com/in/bibiana-trujillo/', github: 'https://github.com/BibiTC' },
    { name: 'Fernando Hernández Rivera', role: 'Data Scientist', initials: 'FH', linkedin: 'https://www.linkedin.com/in/fernando-hernandez-admon/', github: 'https://github.com/rivera2067' },
    { name: 'Giorgi Beltrán Guzmán', role: 'Backend Developer', initials: 'GB', linkedin: 'https://www.linkedin.com/in/giorgi-b-1aa7341bb/', github: 'https://github.com/GioBelGuz' },
    { name: 'Juan Carlos Rueda Ramos', role: 'Fullstack Developer', initials: 'JR', linkedin: 'https://www.linkedin.com/in/juanchokajcrr/', github: 'https://github.com/Juanchokajcrr' },
    { name: 'Leandro Corporan', role: 'Backend Developer', initials: 'LC', linkedin: 'https://www.linkedin.com/in/henry-leandro-corporan-terrero-b57204357/', github: 'https://github.com/Henry2430' },
    { name: 'Rafael Alejandro Mena Martínez', role: 'Data Engineer', initials: 'RM', linkedin: 'https://www.linkedin.com/in/rafael-alejandro-mena-martinez-764258119/', github: 'https://github.com/Rafa-Mena' },
    { name: 'Rafael Patiño Díaz', role: 'Fullstack Dev & Data Scientist', initials: 'RP', linkedin: 'https://www.linkedin.com/in/rafael-patiño-diaz/', github: 'https://github.com/Rapd33' },
    { name: 'Richard Jerez Padilla', role: 'Data Scientist', initials: 'RJ', linkedin: 'https://www.linkedin.com/in/richard-jerez-padilla/', github: 'https://github.com/Riq76' }
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

  /**
   * Escucha el scroll para mostrar/ocultar el botón scroll to top
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // Mostrar botón cuando se ha scrolleado más de 300px
    this.showScrollToTop = scrollPosition > 300;
  }

  /**
   * Scroll suave al inicio de la página
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
