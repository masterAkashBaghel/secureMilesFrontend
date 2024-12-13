import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning'; // Type of toast
  message: string; // Main message
  subText?: string; // Optional subtext
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastMessagesSubject = new BehaviorSubject<Toast[]>([]);
  toastMessages$ = this.toastMessagesSubject.asObservable();

  // Add a toast
  addToast(toast: Toast): void {
    toast.id = Math.random().toString(36).substring(2, 11); // Generate unique ID
    this.toasts.push(toast);
    this.toastMessagesSubject.next(this.toasts);

    // Auto-remove toast after a timeout (e.g., 5 seconds)
    setTimeout(() => this.removeToast(toast.id), 5000);
  }

  // Remove a toast by ID
  removeToast(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.toastMessagesSubject.next(this.toasts);
  }
  showSuccessToast(message: string) {
    this.addToast({
      id: 'success-toast',
      type: 'success',
      message: 'Success',
      subText: message,
    });
  }

  showErrorToast(message: string) {
    this.addToast({
      id: 'error-toast',
      type: 'error',
      message: 'Error',
      subText: message,
    });
  }
}
