import { css, Global } from "@emotion/react";

/**
 * Viewfinder 테마 전역 스타일
 * - 카메라 뷰파인더 HUD 메타포: 어두운 바탕 + 미세 그리드 + 앰버 강조색
 * - 서체: Space Grotesk(디스플레이) / Noto Sans KR(본문) / JetBrains Mono(HUD 판독값)
 */
const globalStyles = css`
  :root {
    --bg: #0b0c0e;
    --surface: #101214;
    --surface-2: #15181b;
    --line: #2c2c2c;
    --line-strong: #3a3a3a;
    --text: #e9e6df;
    --text-soft: #c9c5bb;
    --muted: #8f8b83;
    --dim: #56534d;
    --accent: #f5a524;
    --accent-dim: rgba(245, 165, 36, 0.25);
    --rec: #ff3b30;
    --focus: rgba(245, 165, 36, 0.35);
    --font-display: 'Space Grotesk', 'Noto Sans KR', sans-serif;
    --font-body: 'Noto Sans KR', 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    --nav-height: 64px;
    --max-width: 1200px;
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
    font-family: var(--font-body);
    color: var(--text);
    line-height: 1.6;
    background-color: var(--bg);
    background-image:
      radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.6) 100%),
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 100% 100%, 64px 64px, 64px 64px;
    background-attachment: fixed;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
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

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />
