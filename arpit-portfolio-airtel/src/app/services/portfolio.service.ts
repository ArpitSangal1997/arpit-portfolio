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
  'https://raw.githubusercontent.com/ArpitSangal1997/arpit-portfolio/main/arpit-portfolio-airtel/public/resume.json';

const FALLBACK: ResumeData = {
  profile: {
    name: 'Arpit Sangal',
    firstName: 'Arpit',
    lastName: 'Sangal',
    title: 'Software Engineer',
    tagline:
      'Building scalable microservices and RESTful APIs with Java & Spring Boot.',
    available: true,
    resumePdf: 'Arpit_30_05_26.pdf',
    github: { username: 'ArpitSangal1997', url: 'https://github.com/ArpitSangal1997' },
    linkedin: { username: 'arpit-sangal', url: 'https://linkedin.com/in/arpit-sangal' },
    email: 'sangalarpitsml@gmail.com',
    phone: '+91-9870956252',
    location: 'Noida, India',
    education: 'MCA — GL Bajaj Institute, 2022'
  },
  stats: [
    { value: '3+', label: 'Years Exp.' },
    { value: '35%', label: 'API Boost' },
    { value: '95%', label: 'On-Time' }
  ],
  about: {
    headlineMain: 'Crafting robust',
    headlineAccent: 'backend systems',
    paragraphs: [],
    highlights: []
  },
  experiences: [],
  projects: [],
  skills: [],
  skillCategories: ['Backend', 'Frontend', 'Database', 'Cloud & DevOps', 'Testing', 'Concepts']
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
      const githubData = await firstValueFrom(
        this.http.get<ResumeData>(`${GITHUB_RESUME_URL}${cacheBust}`).pipe(
          catchError(() => of(null))
        )
      );

      if (githubData?.profile) {
        this.data.set(githubData);
        this.loadedFrom.set('github');
        this.loading.set(false);
        return;
      }

      const localData = await firstValueFrom(
        this.http.get<ResumeData>('resume.json').pipe(catchError(() => of(null)))
      );

      if (localData?.profile) {
        this.data.set(localData);
        this.loadedFrom.set('local');
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
