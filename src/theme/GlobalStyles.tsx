import { css, Global } from '@emotion/react';
import { buildCssVariables } from './cssVariables';
import { mq } from './mq';
import { tokens } from './tokens';

/**
 * Viewfinder theme global styles
 * - Camera HUD metaphor: dark ground + faint grid + amber accent
 * - Fonts: Space Grotesk (display) / Noto Sans KR (body) / JetBrains Mono (HUD readouts)
 */
const globalStyles = css`
  :root {
    ${buildCssVariables()}
    color-scheme: dark;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-width: 320px;
    font-family: var(--font-body);
    color: var(--text);
    line-height: 1.6;
    background-color: var(--bg);
    background-image:
      radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.6) 100%),
      linear-gradient(var(--grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
    background-size: 100% 100%, ${tokens.size.backgroundGrid}px ${tokens.size.backgroundGrid}px, ${tokens.size.backgroundGrid}px ${tokens.size.backgroundGrid}px;
    background-attachment: fixed;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    font-weight: 500;
    color: inherit;
  }

  h1, h2, h3 {
    font-family: var(--font-display);
    line-height: 1.1;
  }
  h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; letter-spacing: -0.03em; }
  h2 { font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 700; }
  h3 { font-size: clamp(1.05rem, 2.4vw, 1.25rem); font-weight: 700; }
  h4, h5, h6 { font-weight: 700; }

  button, input, select {
    font-family: inherit;
  }

  ::selection {
    background: var(--accent);
    color: var(--bg);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  ${mq.md} {
    body {
      font-size: 14px;
    }
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
