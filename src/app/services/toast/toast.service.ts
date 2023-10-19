import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: ToastController) {}

  async presentErrorToast(message: string, duration = 3000): Promise<void> {
    try {
      const newToast: ToastOptions = {
        message,
        duration,
        animated: true,
        color: 'danger',
        position: 'bottom'
      };
      const toast = await this.toast.create(newToast);
      await toast.present();
    } catch (error) {}
  }
}
