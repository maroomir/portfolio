import { describe, expect, it } from 'vitest';
import {
  EMPTY_FILTER,
  countByAgency,
  countByFramework,
  countByLanguage,
  filterProjects,
  groupByAgency,
  releaseDateKey,
  selectPinnedFrames,
  sortProjects,
  withFrameNumbers,
} from '../project';
import { PROJECTS, makeProject } from './fixtures';

const names = (projects: readonly { name: string }[]) => projects.map((p) => p.name);

describe('project counts', () => {
  it('counts languages, frameworks and agencies', () => {
    expect(countByLanguage(PROJECTS).get('C++')).toBe(2);
    expect(countByFramework(PROJECTS).get('ROS2')).toBe(2);
    expect(countByAgency(PROJECTS).get('Acme')).toBe(2);
    expect(countByAgency(PROJECTS).has('')).toBe(false);
  });

  it('groups by lower-cased agency and drops projects without one', () => {
    const groups = groupByAgency(PROJECTS);
    expect(names(groups.get('acme') ?? [])).toEqual(['alpha', 'beta']);
    expect(groups.has('')).toBe(false);
  });
});

describe('project ordering', () => {
  it('assigns 1-based frame numbers in source order', () => {
    expect(withFrameNumbers(PROJECTS).map((f) => f.frameNo)).toEqual([1, 2, 3, 4]);
  });

  it('parses YYYY/MM into a sortable key', () => {
    expect(releaseDateKey(makeProject({ name: 'x', release: { date: '2021/03', status: 'public' } }))).toBe(202103);
  });

  it('sorts by release date regardless of pinned', () => {
    const projects = [...PROJECTS, makeProject({ name: 'epsilon', release: { date: '2025/02', status: 'public' } })];
    expect(names(sortProjects(projects, 'newest'))).toEqual(['epsilon', 'delta', 'beta', 'alpha', 'gamma']);
    expect(names(sortProjects(projects, 'oldest'))).toEqual(['gamma', 'alpha', 'beta', 'delta', 'epsilon']);
  });

  it('selects pinned frames newest first with original frame numbers', () => {
    expect(selectPinnedFrames(PROJECTS).map((f) => [f.project.name, f.frameNo])).toEqual([['delta', 4], ['beta', 2]]);
  });
});

describe('filterProjects', () => {
  it('returns everything for the empty filter', () => {
    expect(filterProjects(PROJECTS, EMPTY_FILTER)).toHaveLength(PROJECTS.length);
  });

  it('matches query against title and description, case-insensitively', () => {
    expect(names(filterProjects(PROJECTS, { ...EMPTY_FILTER, query: ' CAMERA ' }))).toEqual(['alpha']);
  });

  it('filters by status, language and agency (agency case-insensitive)', () => {
    expect(names(filterProjects(PROJECTS, { ...EMPTY_FILTER, status: 'private' }))).toEqual(['beta']);
    expect(names(filterProjects(PROJECTS, { ...EMPTY_FILTER, language: 'Python' }))).toEqual(['beta']);
    expect(names(filterProjects(PROJECTS, { ...EMPTY_FILTER, agency: 'acme' }))).toEqual(['alpha', 'beta']);
  });

  it('matches techs against language or framework with AND / OR semantics', () => {
    const techs = ['C++', 'OpenCV'];
    expect(names(filterProjects(PROJECTS, { ...EMPTY_FILTER, techs, mode: 'and' }))).toEqual(['alpha']);
    expect(names(filterProjects(PROJECTS, { ...EMPTY_FILTER, techs, mode: 'or' }))).toEqual(['alpha', 'gamma']);
  });
});
