import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, of } from 'rxjs';
import { GitHubRepo } from '../models/portfolio.model';
import { PortfolioService } from './portfolio.service';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private http = inject(HttpClient);
  private portfolio = inject(PortfolioService);

  repos = signal<GitHubRepo[]>([]);
  user = signal<GitHubUser | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const username = this.portfolio.profile().github.username;
      if (username) this.loadGitHubData(username);
    });
  }

  async loadGitHubData(username: string): Promise<void> {
    this.loading.set(true);

    try {
      const [user, repos] = await Promise.all([
        firstValueFrom(
          this.http.get<GitHubUser>(`https://api.github.com/users/${username}`).pipe(
            catchError(() => of(null))
          )
        ),
        firstValueFrom(
          this.http
            .get<GitHubRepo[]>(
              `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
            )
            .pipe(catchError(() => of([])))
        )
      ]);

      if (user) this.user.set(user);
      this.repos.set(repos.filter(r => !r.name.includes('portfolio')));
      this.error.set(null);
    } catch {
      this.error.set('Unable to load GitHub data');
    }

    this.loading.set(false);
  }
}
