import styled from '@emotion/styled';
import { mq } from '@/theme/mq';
import { tokens } from '@/theme/tokens';

/**
 * Frame card primitives (a "frame" is one project in the viewfinder metaphor)
 * - CardGrid: responsive auto-fit grid, `$minWidth` in px
 * - Card: bordered surface; `$interactive` makes the whole card clickable through a CardTrigger
 * - CardTrigger: the one button that activates the card; its ::after stretches over the card,
 *   while links/buttons inside the card stay separately clickable above it (no nested controls)
 * - CardMeta: FRAME 001 · date row
 * - CardTitle / CardDescription / CardFooter
 */
export const CardGrid = styled.div<{ $minWidth: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${(p) => p.$minWidth}px, 1fr));
  gap: ${tokens.space.gridGap};

  ${mq.sm} {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const Card = styled.article<{ $interactive?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: ${tokens.space.cardPadding};
  border: 1px solid var(--line);
  background: var(--surface);
  transition: border-color ${tokens.motion.fast}ms ease;
  ${(p) =>
    p.$interactive &&
    `
    cursor: pointer;

    a, button:not([data-card-trigger]) {
      position: relative;
      z-index: 1;
    }
  `}

  &:hover {
    border-color: var(--accent);
  }

  &:has([data-card-trigger]:focus-visible) {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  ${mq.sm} {
    padding: ${tokens.space.cardPaddingMobile};
  }
`;

export const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--accent);
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 700;
`;

export const CardDescription = styled.p`
  flex-grow: 1;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--muted);
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--line);
`;

/** Unstyled button that fills the card (via ::after) and opens it; wrap the card title in it. */
export const CardTrigger = styled.button`
  all: unset;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  &:focus-visible {
    outline: none;
  }
`;
