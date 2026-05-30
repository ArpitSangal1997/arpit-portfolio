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
  experiences = this.portfolio.getExperiences();
  activeIndex = 0;

  select(i: number) { this.activeIndex = i; }
}
