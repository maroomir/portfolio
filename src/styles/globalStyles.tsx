import { css, Global } from "@emotion/react";

const globalStyles = css`
  :root {
    --bg-gradient-1: #5b6ee0;
    --bg-gradient-2: #6b4ba0;
    --primary: #ffd700;
    --text: #e6edf3;
    --muted: #9aa4b2;
    --card-bg: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.06);
    --chip-active: rgba(99,102,241,0.24);
    --chip-bg: rgba(255,255,255,0.10);
    --chip-inactive-text: #e6edf3;
    --chip-active-border: rgba(99,102,241,0.95);
    --focus: rgba(99,102,241,0.18);
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    color: var(--text);
    line-height: 1.6;
    background: linear-gradient(135deg, var(--bg-gradient-1) 0%, var(--bg-gradient-2) 100%);
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  
  h1 { font-size: clamp(1.6rem, 3.8vw, 2.6rem); line-height: 1.05; margin-bottom: 0.5rem; }
  h2 { font-size: clamp(1.25rem, 3vw, 1.6rem); margin-bottom: 0.5rem; }
  h3 { font-size: clamp(1.05rem, 2.4vw, 1.25rem); }
  h4, h5, h6 { font-weight: 700; }

  button {
    font-family: inherit;
  }

  /* Utility container width */
  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Accessible focus */
  :focus {
    outline: none;
    box-shadow: 0 0 0 4px var(--focus);
    border-radius: 6px;
  }

  /* Small screens */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />
