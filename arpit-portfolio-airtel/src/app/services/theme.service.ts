import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal<boolean>(false);

  constructor() {
    document.documentElement.setAttribute('data-theme', 'airtel');
  }

  toggle() {
    // Airtel theme is light-only
  }
}
