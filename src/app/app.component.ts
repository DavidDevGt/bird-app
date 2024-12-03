import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isDarkMode = false;
  constructor() {
    this.setInitialTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private setInitialTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = prefersDark;
    document.documentElement.setAttribute('theme', prefersDark ? 'dark' : 'light');
  }
  
}
