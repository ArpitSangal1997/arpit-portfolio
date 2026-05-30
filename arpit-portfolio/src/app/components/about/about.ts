import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  highlights = [
    { icon: '⚡', label: 'API Performance', value: '35% improvement' },
    { icon: '🐛', label: 'Bug Reduction', value: '30% fewer recurrences' },
    { icon: '📅', label: 'Sprint Delivery', value: '95% on-time' },
    { icon: '🏗️', label: 'Tech Debt', value: '25% reduction' },
  ];
}
