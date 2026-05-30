import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent {
  portfolio = inject(PortfolioService);
  activeIndex = 0;

  select(i: number) { this.activeIndex = i; }

  get experiences() {
    return this.portfolio.experiences();
  }
}
