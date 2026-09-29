import type { ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { GlobalStyles } from './GlobalStyles';
import { tokens } from './tokens';

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
