// Type definitions aligned with src/data/data.json
// This file defines the full shape of the JSON data used across the app.

export interface IHome {
  name: string;
  bio: string;
  keywords: string[];
}

export interface IResume {
  company: string;
  department: string;
  role: string;
  period: string[];
  highlights?: string[];
}

export interface IAbout {
  skills: string[];
  languages: string[];
  resume: IResume[];
  interests?: string[];
}

export interface IAgency {
  name: string;
  url?: string;
  link?: string;
}

export interface IRelease {
  date: string;
  status: 'public' | 'private';
  link?: string;
}

export interface IAbility {
  language: string;
  framework: string[];
}

export interface IProject {
  name: string;
  title: string;
  description: string;
  agency?: IAgency;
  category?: string;
  ability: IAbility;
  release: IRelease;
}

export interface IData {
  home: IHome;
  about: IAbout;
  projects: IProject[];
}
