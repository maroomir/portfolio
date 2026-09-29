import type { ZodType } from 'zod';
import contentJson from './content.json';
import portfolioJson from './data.json';
import { contentSchema, portfolioSchema, type IContent, type IPortfolio } from './schema';

/**
 * Single entry point for JSON data. Every other module reads from here,
 * so validation happens once and the source can be swapped in one place.
 * Invalid JSON fails fast at module load with a readable issue list.
 */

function parseOrThrow<T>(schema: ZodType<T>, raw: unknown, sourceName: string): T {
  const result = schema.safeParse(raw);
  if (result.success) {
    return result.data;
  }
  const issues = result.error.issues
    .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid ${sourceName}:\n${issues}`);
}

export const portfolio: IPortfolio = parseOrThrow(portfolioSchema, portfolioJson, 'data.json');
export const content: IContent = parseOrThrow(contentSchema, contentJson, 'content.json');
