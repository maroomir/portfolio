export interface IHome {
  name: string;
  bio: string;
  keywords: string[];
}

export interface IResume {
  company: string;
  department: string;
  rules: string;
  period: string[];
}

export interface IAbout {
  skills: string[];
  languages: string[];
  interests: string[];
  resume: IResume[];
}

export interface IAgency {
  name: string;
  link: string;
}

export interface IRelease {
  date: string;
  status: 'public' | 'private' | 'Do not have';
  link: string;
}

export interface IAbility {
  language: string;
  framework: string[];
}

export interface IProject {
  name: string;
  title: string;
  description: string;
  agency: IAgency;
  ability: IAbility;
  release: IRelease;
}
