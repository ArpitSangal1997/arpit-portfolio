import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, of } from 'rxjs';
import {
  ResumeData,
  Experience,
  Project,
  Skill,
  Profile,
  AboutData,
  ProfileStat
} from '../models/portfolio.model';

const GITHUB_RESUME_URL =
  'https://raw.githubusercontent.com/ArpitSangal1997/arpit-portfolio/main/arpit-portfolio/public/resume.json';

const FALLBACK: ResumeData = {
  profile: {
    name: 'Arpit Sangal',
    firstName: 'Arpit',
    lastName: 'Sangal',
    title: 'Java/Spring Boot Backend Engineer',
    tagline:
      'Java/Spring Boot Backend Engineer with 3+ years building production REST APIs, microservices, and database-backed enterprise applications.',
    available: true,
    resumePdf: 'Resume.pdf',
    github: { username: 'ArpitSangal1997', url: 'https://github.com/ArpitSangal1997' },
    linkedin: { username: 'arpit-sangal', url: 'https://linkedin.com/in/arpit-sangal' },
    email: 'sangalarpitsml@gmail.com',
    phone: '+91-9870956252',
    location: 'Noida, India',
    education: 'MCA (2022) · BCA (2019)'
  },
  stats: [
    { value: '3+', label: 'Years Exp.' },
    { value: '100+', label: 'Users Supported' },
    { value: '80%+', label: 'Test Coverage' }
  ],
  about: {
    headlineMain: 'Crafting robust',
    headlineAccent: 'backend systems',
    paragraphs: [
      'I\'m a Java/Spring Boot Backend Engineer with 3+ years of experience developing and supporting production REST APIs, microservices, and database-backed enterprise applications.',
      'My work spans SQL optimization, caching, authentication and authorization, asynchronous processing, automated testing, production debugging, and CI/CD workflows across AWS- and GCP-hosted environments.',
      'I contribute across requirements analysis, implementation, deployment, and post-release support, with GitHub Copilot and Microsoft Copilot supporting code review, test scaffolding, refactoring, and documentation.'
    ],
    highlights: [
      { icon: '⚡', label: 'Backend APIs', value: 'Java + Spring Boot' },
      { icon: '☁️', label: 'Cloud Delivery', value: 'AWS + GCP' },
      { icon: '🧪', label: 'Test Coverage', value: '80%+ measured' },
      { icon: '👥', label: 'Platform Users', value: '100+ supported' }
    ]
  },
  experiences: [],
  projects: [],
  skills: [],
  skillCategories: [
    'Backend',
    'Databases',
    'Testing',
    'Build & Delivery',
    'Cloud & Containers',
    'Frontend',
    'AI-Assisted Development'
  ]
};

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);

  private data = signal<ResumeData>(FALLBACK);
  loading = signal(true);
  loadedFrom = signal<'github' | 'local' | 'fallback'>('fallback');

  profile = computed(() => this.data().profile);
  stats = computed(() => this.data().stats);
  about = computed(() => this.data().about);
  experiences = computed(() => this.data().experiences);
  projects = computed(() => this.data().projects);
  skills = computed(() => this.data().skills);
  skillCategories = computed(() => this.data().skillCategories);

  resumePdfUrl = computed(() => this.data().profile.resumePdf);

  constructor() {
    this.loadResume();
  }

  async loadResume(): Promise<void> {
    this.loading.set(true);
    const cacheBust = `?t=${Date.now()}`;

    try {
      const localData = await firstValueFrom(
        this.http.get<ResumeData>('resume.json').pipe(catchError(() => of(null)))
      );

      if (localData?.profile) {
        this.data.set(localData);
        this.loadedFrom.set('local');
        this.loading.set(false);
        return;
      }

      const githubData = await firstValueFrom(
        this.http.get<ResumeData>(`${GITHUB_RESUME_URL}${cacheBust}`).pipe(
          catchError(() => of(null))
        )
      );

      if (githubData?.profile) {
        this.data.set(githubData);
        this.loadedFrom.set('github');
      }
    } catch {
      // keep fallback
    }

    this.loading.set(false);
  }

  getExperiences(): Experience[] {
    return this.experiences();
  }

  getProjects(): Project[] {
    return this.projects();
  }

  getSkills(): Skill[] {
    return this.skills();
  }

  getSkillCategories(): string[] {
    return this.skillCategories();
  }

  getProfile(): Profile {
    return this.profile();
  }

  getAbout(): AboutData {
    return this.about();
  }

  getStats(): ProfileStat[] {
    return this.stats();
  }
}
