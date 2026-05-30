import { Component, inject, signal, AfterViewInit, ElementRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent implements AfterViewInit {
  portfolio = inject(PortfolioService);
  el = inject(ElementRef);
  activeCategory = signal('Backend');
  animated = signal(false);

  categories = computed(() => this.portfolio.skillCategories());

  filteredSkills = computed(() =>
    this.portfolio.skills().filter(s => s.category === this.activeCategory())
  );

  setCategory(cat: string) { this.activeCategory.set(cat); }

  ngAfterViewInit() {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { this.animated.set(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(this.el.nativeElement);
  }
}
