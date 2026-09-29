import styled from '@emotion/styled';
import { mq } from '@/theme/mq';
import { tokens } from '@/theme/tokens';

/** Square translucent button for floating HUD controls (scroll, prev/next). */
export const HudButton = styled.button`
  width: ${tokens.size.hudButton}px;
  height: ${tokens.size.hudButton}px;
  border-radius: 0;
  background: var(--glass);
  color: var(--accent);
  border: 1px solid var(--line-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  cursor: pointer;
  transition: border-color ${tokens.motion.fast}ms ease, color ${tokens.motion.fast}ms ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  ${mq.md} {
    width: ${tokens.size.hudButtonMobile}px;
    height: ${tokens.size.hudButtonMobile}px;
  }
`;
