import styled from '@emotion/styled';

/**
 * HUD text primitives
 * - HudLabel: uppercase monospace eyebrow (e.g. CAREER TIMELINE)
 * - MonoText: monospace readout for dates, counts and stacks
 * - ReadoutList / Readout / ReadoutValue / ReadoutBigValue: label+value pairs beside the hero
 */
export const HudLabel = styled.div`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
`;

export const MonoText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--muted);
`;

export const ReadoutList = styled.div<{ $align?: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: ${(p) => p.$align ?? 'left'};
`;

export const Readout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const ReadoutValue = styled.div<{ $accent?: boolean }>`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: ${(p) => (p.$accent ? 'var(--accent)' : 'var(--text)')};
`;

export const ReadoutBigValue = styled.div`
  font-family: var(--font-mono);
  font-size: 1.75rem;
  color: var(--text);
  line-height: 1.2;
`;
