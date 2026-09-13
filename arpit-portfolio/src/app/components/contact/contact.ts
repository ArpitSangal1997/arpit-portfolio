import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { TiltCardDirective } from '../../directives/tilt-card.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TiltCardDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  portfolio = inject(PortfolioService);

  phoneHref(): string {
    return 'tel:' + this.portfolio.profile().phone.replaceAll('-', '');
  }
}
