import { describe, expect, it } from 'vitest';
import { careerSpan, findEducation, findLatestJob, isEducation, sortByStart } from '../career';
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
});
