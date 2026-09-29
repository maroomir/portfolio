import type { IResume } from '@/data/schema';

/** Selectors over the resume list (jobs and education share one array). */

/** Entries whose company matches this pattern are treated as education, not employment. */
const EDUCATION_PATTERN = /대학/;

export interface ICareerSpan {
  readonly start: number;
  readonly end: number;
  readonly span: number;
}

export function isEducation(entry: IResume): boolean {
  return EDUCATION_PATTERN.test(entry.company);
}

export function sortByStart(resume: readonly IResume[]): IResume[] {
  return [...resume].sort((a, b) => a.period[0].localeCompare(b.period[0]));
}

/** Latest-ending employment entry; falls back to the first entry when there are no jobs. */
export function findLatestJob(resume: readonly IResume[]): IResume | undefined {
  const jobs = resume.filter((entry) => !isEducation(entry));
  return [...jobs].sort((a, b) => b.period[1].localeCompare(a.period[1]))[0] ?? resume[0];
}

export function findEducation(resume: readonly IResume[]): IResume | undefined {
  return resume.find(isEducation);
}

function yearOf(period: string): number {
  return Number.parseInt(period.slice(0, 4), 10);
}

/** First start year to last end year across every entry. */
export function careerSpan(resume: readonly IResume[]): ICareerSpan | undefined {
  const years = resume.flatMap((entry) => entry.period).map(yearOf).filter((y) => !Number.isNaN(y));
  if (years.length === 0) {
    return undefined;
  }
  const start = Math.min(...years);
  const end = Math.max(...years);
  return { start, end, span: end - start };
}
