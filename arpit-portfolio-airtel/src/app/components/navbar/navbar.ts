import { Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  portfolio = inject(PortfolioService);
  scrolled = false;
  menuOpen = false;
  activeSection = signal('hero');

  navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'GitHub', href: '#github', id: 'github' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const ids = ['hero', ...this.navLinks.map(l => l.id)];
    for (let i = ids.length - 1; i >= 0; i--) {
      const el = document.getElementById(ids[i]);
      if (el && el.getBoundingClientRect().top <= 120) {
        this.activeSection.set(ids[i]);
        return;
      }
    }
  }

  scrollTo(href: string, id?: string) {
    this.menuOpen = false;
    if (id) this.activeSection.set(id);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isActive(id: string): boolean {
    return this.activeSection() === id;
  }
}
