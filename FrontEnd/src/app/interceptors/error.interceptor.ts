import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        switch (error.status) {
          case 400:
            errorMessage = 'Solicitud inválida. Por favor verifica los datos ingresados.';
            break;
          case 401:
            errorMessage = 'No autorizado. Por favor inicia sesión.';
            break;
          case 403:
            errorMessage = 'No tienes permisos para realizar esta acción.';
            break;
          case 404:
            errorMessage = error.error?.message || 'Recurso no encontrado.';
            break;
          case 409:
            errorMessage = error.error || 'Conflicto: el recurso ya existe.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor. Por favor intenta más tarde.';
            break;
          case 503:
            errorMessage = 'Servicio no disponible. Por favor intenta más tarde.';
            break;
          default:
            if (error.error?.message) {
              errorMessage = error.error.message;
            }
        }
      }

      // Mostrar notificación de error
      notificationService.error(errorMessage);

      // Log del error para debugging
      console.error('HTTP Error:', {
        status: error.status,
        message: errorMessage,
        url: error.url,
        error: error.error
      });

      return throwError(() => error);
    })
  );
};
