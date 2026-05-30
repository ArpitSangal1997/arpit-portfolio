import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  form = { name: '', email: '', message: '' };
  submitted = signal(false);
  submitting = signal(false);

  async onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.submitting.set(true);
    // Simulate form submission (replace with FormSpree/Netlify/EmailJS endpoint)
    await new Promise(r => setTimeout(r, 1200));
    this.submitted.set(true);
    this.submitting.set(false);
    this.form = { name: '', email: '', message: '' };
  }
}
