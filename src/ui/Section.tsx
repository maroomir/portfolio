import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { HudLabel } from './Hud';

/** Vertical block with a fixed inner gap. */
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

/** Eyebrow on the left, optional action on the right. */
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
`;

/** h2 followed by a rule that fills the remaining width. */
export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-body);
  font-size: 1.25rem;

  &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: var(--line);
  }
`;

interface IPageHeadingProps {
  readonly eyebrow: ReactNode;
  readonly title: ReactNode;
}

/** Page-level eyebrow + large h1 used at the top of list pages. */
export function PageHeading({ eyebrow, title }: IPageHeadingProps) {
  return (
    <HeadingGroup>
      <HudLabel>{eyebrow}</HudLabel>
      <HeadingTitle>{title}</HeadingTitle>
    </HeadingGroup>
  );
}

const HeadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const HeadingTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
`;
