import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { TiltCardDirective } from '../../directives/tilt-card.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TiltCardDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  portfolio = inject(PortfolioService);
  form = { name: '', email: '', message: '' };
  submitted = signal(false);
  submitting = signal(false);

  phoneHref(): string {
    return 'tel:' + this.portfolio.profile().phone.replaceAll('-', '');
  }

  async onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.submitting.set(true);
    await new Promise(r => setTimeout(r, 1200));
    this.submitted.set(true);
    this.submitting.set(false);
    this.form = { name: '', email: '', message: '' };
  }
}
