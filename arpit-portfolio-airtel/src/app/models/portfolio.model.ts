export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  type?: string;
  points: string[];
  tech: string[];
  current?: boolean;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  company: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface ProfileStat {
  value: string;
  label: string;
}

export interface AboutHighlight {
  icon: string;
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  available: boolean;
  resumePdf: string;
  github: { username: string; url: string };
  linkedin: { username: string; url: string };
  email: string;
  phone: string;
  location: string;
  education: string;
}

export interface AboutData {
  headlineMain: string;
  headlineAccent: string;
  paragraphs: string[];
  highlights: AboutHighlight[];
}

export interface ResumeData {
  profile: Profile;
  stats: ProfileStat[];
  about: AboutData;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  skillCategories: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}
