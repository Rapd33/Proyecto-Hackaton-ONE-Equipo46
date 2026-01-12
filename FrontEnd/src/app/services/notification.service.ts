import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSignal = signal<Notification[]>([]);
  private idCounter = 0;

  readonly notifications = this.notificationsSignal.asReadonly();

  private generateId(): string {
    return `notification-${++this.idCounter}-${Date.now()}`;
  }

  show(message: string, type: NotificationType = 'info', duration: number = 5000): string {
    const id = this.generateId();
    const notification: Notification = { id, type, message, duration };

    this.notificationsSignal.update(notifications => [...notifications, notification]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }

    return id;
  }

  success(message: string, duration: number = 5000): string {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 5000): string {
    return this.show(message, 'error', duration);
  }

  warning(message: string, duration: number = 5000): string {
    return this.show(message, 'warning', duration);
  }

  info(message: string, duration: number = 5000): string {
    return this.show(message, 'info', duration);
  }

  remove(id: string): void {
    this.notificationsSignal.update(notifications =>
      notifications.filter(n => n.id !== id)
    );
  }

  clear(): void {
    this.notificationsSignal.set([]);
  }
}
