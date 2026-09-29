import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { tokens } from '@/theme/tokens';

interface IPageShellProps {
  readonly children: ReactNode;
  /** 'center' stacks content in the middle of the viewport (used by 404). */
  readonly align?: 'start' | 'center';
  /** Overrides the content column width; defaults to the max-width token. */
  readonly maxWidth?: string;
  /** Vertical gap between direct children of the content column. */
  readonly gap?: string;
}

/** Page frame shared by every route: nav-height offset, centered column, responsive side padding. */
export function PageShell({ children, align = 'start', maxWidth = 'var(--max-width)', gap = tokens.space.sectionGap }: IPageShellProps) {
  return (
    <Outer $align={align}>
      <Column $maxWidth={maxWidth} $gap={gap} $align={align}>
        {children}
      </Column>
    </Outer>
  );
}

const Outer = styled.div<{ $align: 'start' | 'center' }>`
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--nav-height) + ${(p) => (p.$align === 'center' ? '2rem' : tokens.space.pagePaddingY)}) 0
    ${(p) => (p.$align === 'center' ? '2rem' : tokens.space.pagePaddingBottom)};
  ${(p) =>
    p.$align === 'center' &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

const Column = styled.div<{ $maxWidth: string; $gap: string; $align: 'start' | 'center' }>`
  width: 100%;
  max-width: ${(p) => p.$maxWidth};
  margin: 0 auto;
  padding: 0 ${tokens.space.pagePaddingX};
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.$gap};
  ${(p) =>
    p.$align === 'center' &&
    `
    align-items: center;
    text-align: center;
  `}
`;
