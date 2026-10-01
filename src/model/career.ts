import type { IResume } from '@/data/schema';

/** Selectors over the resume list (jobs and education share one array). */

/** Entries whose company matches this pattern are treated as education, not employment. */
const EDUCATION_PATTERN = /대학/;

/** Period end written in the data for an entry still in progress; resolved to the current month. */
export const ONGOING_PERIOD_END = '현재';

export interface ICareerSpan {
  readonly start: number;
  readonly end: number;
  readonly span: number;
}

export function isEducation(entry: IResume): boolean {
  return EDUCATION_PATTERN.test(entry.company);
}

export function isOngoing(entry: IResume): boolean {
  return entry.period[1] === ONGOING_PERIOD_END;
}

/** End period as "YYYY/MM", with an ongoing entry resolved to `now`. */
export function resolvePeriodEnd(entry: IResume, now: Date = new Date()): string {
  if (!isOngoing(entry)) {
    return entry.period[1];
  }
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${now.getFullYear()}/${month}`;
}

export function sortByStart(resume: readonly IResume[]): IResume[] {
  return [...resume].sort((a, b) => a.period[0].localeCompare(b.period[0]));
}

/** Latest-ending employment entry; falls back to the first entry when there are no jobs. */
export function findLatestJob(resume: readonly IResume[]): IResume | undefined {
  const jobs = resume.filter((entry) => !isEducation(entry));
  return [...jobs].sort((a, b) => resolvePeriodEnd(b).localeCompare(resolvePeriodEnd(a)))[0] ?? resume[0];
}

export function findEducation(resume: readonly IResume[]): IResume | undefined {
  return resume.find(isEducation);
}

function yearOf(period: string): number {
  return Number.parseInt(period.slice(0, 4), 10);
}

/** First start year to last end year across every entry; an ongoing entry ends in `now`'s year. */
export function careerSpan(resume: readonly IResume[], now: Date = new Date()): ICareerSpan | undefined {
  const years = resume
    .flatMap((entry) => [entry.period[0], resolvePeriodEnd(entry, now)])
    .map(yearOf)
    .filter((y) => !Number.isNaN(y));
  if (years.length === 0) {
    return undefined;
  }
  const start = Math.min(...years);
  const end = Math.max(...years);
  return { start, end, span: end - start };
}
