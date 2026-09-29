import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { tokens } from '@/theme/tokens';

/** Monospace accent link that turns to text color on hover (ALL PROJECTS →, OPEN →, GITHUB →). */
const hudLinkStyle = css`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--accent);
  transition: color ${tokens.motion.fast}ms ease;

  &:hover {
    color: var(--text);
  }
`;

export const HudLink = styled(Link)`
  ${hudLinkStyle}
`;

export const HudAnchor = styled.a`
  ${hudLinkStyle}
`;
