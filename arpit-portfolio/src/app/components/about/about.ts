import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { TiltCardDirective } from '../../directives/tilt-card.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TiltCardDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  portfolio = inject(PortfolioService);
}
