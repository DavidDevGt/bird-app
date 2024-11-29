import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreCompleto: string = '';
  numeroCarnet: string = '';

  constructor(private router: Router) {}

  loadBirds() {
    if (this.nombreCompleto && this.numeroCarnet) {
      this.router.navigate(['/birds']);
    }
  }
}
