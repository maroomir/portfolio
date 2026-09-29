import type { IProject, ReleaseStatus } from '@/data/schema';
import { countBy, groupBy, type CountMap } from './collections';

/** Selectors over the project list. All functions are pure and input-order preserving unless stated. */

export type SortOrder = 'newest' | 'oldest';
export type MatchMode = 'and' | 'or';

export interface IProjectFilterCriteria {
  readonly query: string;
  readonly status: ReleaseStatus | 'all';
  readonly language: string;
  readonly agency: string;
  readonly techs: readonly string[];
  readonly mode: MatchMode;
}

export interface IFramedProject {
  readonly project: IProject;
  /** 1-based position in the source list; shown as "FRAME 001" in the HUD. */
  readonly frameNo: number;
}

export const EMPTY_FILTER: IProjectFilterCriteria = {
  query: '',
  status: 'all',
  language: '',
  agency: '',
  techs: [],
  mode: 'and',
};

export function countByLanguage(projects: readonly IProject[]): CountMap {
  return countBy(projects, (p) => p.ability.language);
}

export function countByFramework(projects: readonly IProject[]): CountMap {
  return countBy(
    projects.flatMap((p) => p.ability.framework),
    (framework) => framework,
  );
}

export function countByAgency(projects: readonly IProject[]): CountMap {
  return countBy(projects, (p) => p.agency?.name);
}

/** Projects grouped by lower-cased agency name; projects without an agency are dropped. */
export function groupByAgency(projects: readonly IProject[]): ReadonlyMap<string, readonly IProject[]> {
  return groupBy(projects, (p) => p.agency?.name.toLowerCase());
}

export function withFrameNumbers(projects: readonly IProject[]): IFramedProject[] {
  return projects.map((project, index) => ({ project, frameNo: index + 1 }));
}

/** "YYYY/MM" -> YYYYMM as a number; malformed dates sort first. */
export function releaseDateKey(project: IProject): number {
  const digits = project.release.date.replace(/\D/g, '');
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function compareByRelease(order: SortOrder): (a: IProject, b: IProject) => number {
  return (a, b) => {
    const diff = releaseDateKey(b) - releaseDateKey(a);
    return order === 'newest' ? diff : -diff;
  };
}

/** Pinned projects first, then by release date. */
export function sortProjects(projects: readonly IProject[], order: SortOrder): IProject[] {
  const byRelease = compareByRelease(order);
  return [...projects].sort((a, b) => {
    const pinnedDiff = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
    return pinnedDiff !== 0 ? pinnedDiff : byRelease(a, b);
  });
}

export function selectPinnedFrames(projects: readonly IProject[]): IFramedProject[] {
  return withFrameNumbers(projects)
    .filter(({ project }) => project.pinned)
    .sort((a, b) => compareByRelease('newest')(a.project, b.project));
}

function usesTech(project: IProject, tech: string): boolean {
  return project.ability.language === tech || project.ability.framework.includes(tech);
}

export function matchesCriteria(project: IProject, criteria: IProjectFilterCriteria): boolean {
  const query = criteria.query.trim().toLowerCase();
  if (query && !`${project.title} ${project.description}`.toLowerCase().includes(query)) {
    return false;
  }
  if (criteria.status !== 'all' && project.release.status !== criteria.status) {
    return false;
  }
  if (criteria.language && project.ability.language !== criteria.language) {
    return false;
  }
  if (criteria.agency && (project.agency?.name ?? '').toLowerCase() !== criteria.agency.toLowerCase()) {
    return false;
  }
  if (criteria.techs.length === 0) {
    return true;
  }
  return criteria.mode === 'and'
    ? criteria.techs.every((tech) => usesTech(project, tech))
    : criteria.techs.some((tech) => usesTech(project, tech));
}

export function filterProjects(
  projects: readonly IProject[],
  criteria: IProjectFilterCriteria,
): IProject[] {
  return projects.filter((project) => matchesCriteria(project, criteria));
}
