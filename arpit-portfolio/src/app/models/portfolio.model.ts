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
