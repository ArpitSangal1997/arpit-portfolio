import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitHubService } from '../../services/github.service';
import { PortfolioService } from '../../services/portfolio.service';

const LANG_COLORS: Record<string, string> = {
  Java: '#b07219',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  Python: '#3572A5',
  Go: '#00ADD8'
};

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github.html',
  styleUrl: './github.scss'
})
export class GitHubComponent {
  github = inject(GitHubService);
  portfolio = inject(PortfolioService);

  langColor(lang: string | null): string {
    if (!lang) return 'var(--accent)';
    return LANG_COLORS[lang] ?? 'var(--accent)';
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}
