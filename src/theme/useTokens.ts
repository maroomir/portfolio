import { useTheme } from '@emotion/react';
import type { ITokens } from './tokens';

/** Typed access to the tokens from any component or hook under ThemeProvider. */
export function useTokens(): ITokens {
  return useTheme().tokens;
}
