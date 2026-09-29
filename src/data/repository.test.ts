import { describe, expect, it } from 'vitest';
import { content, portfolio } from './repository';

/** Guards the real JSON files: a schema violation fails here before it fails in the browser. */
describe('data repository', () => {
  it('parses data.json and content.json against their schemas', () => {
    expect(portfolio.projects.length).toBeGreaterThan(0);
    expect(portfolio.about.resume.length).toBeGreaterThan(0);
    expect(content.site.githubUrl).toMatch(/^https:/);
  });

  it('has unique project names (used as React keys)', () => {
    const names = portfolio.projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
