import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent } from './components/projects/projects';
import { SkillsComponent } from './components/skills/skills';
import { GitHubComponent } from './components/github/github';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { Scene3dComponent } from './components/scene-3d/scene-3d';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    GitHubComponent,
    ContactComponent,
    FooterComponent,
    Scene3dComponent
  ],
  template: `
    <app-scene-3d />
    <app-navbar />
    <main class="main-content">
      <app-hero />
      <app-about />
      <app-experience />
      <app-projects />
      <app-skills />
      <app-github />
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: [`
    .main-content {
      display: block;
      position: relative;
      z-index: 1;
    }
  `]
})
export class App {}
