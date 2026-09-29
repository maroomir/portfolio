import type { ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider, useTheme } from '@emotion/react';
import { GlobalStyles } from './GlobalStyles';
import { tokens, type ITokens } from './tokens';

const theme = { tokens };

/** Injects the tokens as the Emotion theme and mounts the global stylesheet. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <EmotionThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </EmotionThemeProvider>
  );
}

/** Typed access to the tokens from any component or hook under ThemeProvider. */
export function useTokens(): ITokens {
  return useTheme().tokens;
}
