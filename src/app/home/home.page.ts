import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreCompleto: string = '';
  numeroCarnet: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private toastController: ToastController) {}

  async loadBirds() {
    if (this.nombreCompleto.trim().length >= 3 && /^[0-9]+$/.test(this.numeroCarnet)) {
      this.isLoading = true;

      // Simular un pequeño retardo para mostrar el spinner
      setTimeout(async () => {
        this.isLoading = false;
        await this.presentToast('Datos enviados', 'success');
        this.router.navigate(['/birds']);
      }, 1500);
    } else {
      await this.presentToast('Por favor completa los campos', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }
}
