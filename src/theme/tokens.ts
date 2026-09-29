/**
 * Design and behavior tokens: the one file to edit for look, spacing and timing.
 * - Colors/fonts/sizes are also emitted as CSS variables (see GlobalStyles) under the same names,
 *   so `var(--accent)` in styled components and `theme.tokens.color.accent` in TS stay in sync.
 * - `breakpoint` feeds the `mq` helpers in ./mq.ts. Three tiers: sm (phone), md (tablet), lg (desktop).
 */
export const tokens = {
  color: {
    bg: '#0b0c0e',
    surface: '#101214',
    surface2: '#15181b',
    line: '#2c2c2c',
    lineStrong: '#3a3a3a',
    text: '#e9e6df',
    textSoft: '#c9c5bb',
    muted: '#8f8b83',
    dim: '#56534d',
    accent: '#f5a524',
    accentDim: 'rgba(245, 165, 36, 0.25)',
    accentSoft: 'rgba(245, 165, 36, 0.12)',
    rec: '#ff3b30',
    ok: '#7ee787',
    okDim: 'rgba(126, 231, 135, 0.4)',
    focus: 'rgba(245, 165, 36, 0.35)',
    /** Translucent panel background for floating HUD buttons. */
    glass: 'rgba(11, 12, 14, 0.85)',
    /** Slightly denser glass for the fixed navbar. */
    glassStrong: 'rgba(11, 12, 14, 0.92)',
    /** Full-screen dim behind modals. */
    scrim: 'rgba(0, 0, 0, 0.78)',
    gridLine: 'rgba(255, 255, 255, 0.035)',
  },
  font: {
    display: "'Space Grotesk', 'Noto Sans KR', sans-serif",
    body: "'Noto Sans KR', 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  size: {
    navHeight: 64, // [px]
    maxWidth: 1200, // [px]
    hudButton: 44, // [px] floating square buttons on desktop
    hudButtonMobile: 40, // [px]
    frameCorner: 40, // [px] viewfinder bracket size
    frameCornerOffset: 24, // [px] distance from viewport edge
    frameCornerStroke: 3, // [px]
    focusBracket: 28, // [px] brackets around the hero name
    backgroundGrid: 64, // [px] body grid cell
  },
  space: {
    pagePaddingY: 'clamp(2rem, 5vw, 4rem)',
    pagePaddingBottom: 'clamp(2rem, 4vw, 3rem)',
    pagePaddingX: 'clamp(1rem, 4vw, 2.5rem)',
    sectionGap: 'clamp(3rem, 6vw, 5rem)',
    sectionGapTight: 'clamp(2.5rem, 5vw, 4rem)',
    cardPadding: '1.4rem',
    cardPaddingMobile: '1rem',
    gridGap: '1.5rem',
  },
  layout: {
    heroSideColumn: 200, // [px] readout columns beside the hero
    pinnedCardMinWidth: 280, // [px]
    projectCardMinWidth: 360, // [px]
    attachmentMinWidth: 220, // [px]
    resumePeriodColumn: 180, // [px]
  },
  motion: {
    fast: 160, // [ms] hover transitions
    normal: 220, // [ms] modal pop-in, card border
    pageTransition: 0.32, // [s] route slide/fade
    timelineFadeIn: 420, // [ms]
    timelineStagger: 80, // [ms] per item
  },
  behavior: {
    /** Number of top languages/frameworks shown in the hero readouts. */
    readoutLimit: 3,
    typewriter: { typeSpeed: 70, deleteSpeed: 40, delaySpeed: 1500 }, // [ms]
    swipeThreshold: 50, // [px]
    navDebounce: 600, // [ms]
  },
  breakpoint: {
    sm: 600, // [px] phones
    md: 900, // [px] tablets and narrow laptops
    lg: 1024, // [px] hero grid collapses below this
  },
} as const;

export type ITokens = typeof tokens;
