import { describe, expect, it } from 'vitest';
import { careerSpan, findEducation, findLatestJob, isEducation, ONGOING_PERIOD_END, resolvePeriodEnd, sortByStart } from '../career';
import { RESUME } from './fixtures';

describe('career selectors', () => {
  it('detects education entries by company name', () => {
    expect(RESUME.map(isEducation)).toEqual([false, true, false]);
  });

  it('sorts by start period ascending', () => {
    expect(sortByStart(RESUME).map((r) => r.company)).toEqual(['Acme', 'Beta Corp', '연세대학교']);
  });

  it('finds the latest-ending job, ignoring education', () => {
    expect(findLatestJob(RESUME)?.company).toBe('Beta Corp');
    expect(findEducation(RESUME)?.company).toBe('연세대학교');
  });

  it('computes the overall career span in years', () => {
    expect(careerSpan(RESUME)).toEqual({ start: 2013, end: 2025, span: 12 });
    expect(careerSpan([])).toBeUndefined();
  });

  it('resolves an ongoing period end to the given date', () => {
    const ongoing = { ...RESUME[2], period: ['2017/03', ONGOING_PERIOD_END] as [string, string] };
    const now = new Date(2027, 0, 15);
    expect(resolvePeriodEnd(ongoing, now)).toBe('2027/01');
    expect(resolvePeriodEnd(RESUME[0], now)).toBe('2017/03');
    expect(careerSpan([RESUME[0], ongoing], now)).toEqual({ start: 2013, end: 2027, span: 14 });
  });

  it('treats an ongoing job as the latest one', () => {
    const ongoing = { ...RESUME[0], company: 'Now Inc', period: ['2010/01', ONGOING_PERIOD_END] as [string, string] };
    expect(findLatestJob([...RESUME, ongoing])?.company).toBe('Now Inc');
  });
});
