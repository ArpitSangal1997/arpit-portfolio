import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { TiltCardDirective } from '../../directives/tilt-card.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TiltCardDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  portfolio = inject(PortfolioService);
}
