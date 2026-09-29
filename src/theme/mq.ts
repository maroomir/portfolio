import { tokens } from './tokens';

/** Media query prefixes derived from the breakpoint tokens. Use inside template literals. */
export const mq = {
  /** <= sm (phones) */
  sm: `@media (max-width: ${tokens.breakpoint.sm}px)`,
  /** <= md (tablets) */
  md: `@media (max-width: ${tokens.breakpoint.md}px)`,
  /** <= lg */
  lg: `@media (max-width: ${tokens.breakpoint.lg}px)`,
  /** > sm */
  upSm: `@media (min-width: ${tokens.breakpoint.sm + 1}px)`,
} as const;

/** Raw query string for useMediaQuery. */
export const MOBILE_QUERY = `(max-width: ${tokens.breakpoint.sm}px)`;
