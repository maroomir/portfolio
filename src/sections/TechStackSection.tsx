import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { portfolio, content } from '@/data/repository';
import { HudLabel } from '@/ui/Hud';
import { Section, SectionTitle } from '@/ui/Section';
import { orderByUsage, type CountMap } from '@/model/collections';
import { countByFramework, countByLanguage } from '@/model/project';
import { mq } from '@/theme/mq';
import { tokens } from '@/theme/tokens';

export interface ITechStackSectionProps {
  /** Show the number of projects using each item. */
  readonly showCounts: boolean;
}

/** Languages and frameworks ordered by usage; each links to the filtered project list. */
export function TechStackSection({ showCounts }: ITechStackSectionProps) {
  const { about, projects } = portfolio;
  const copy = content.about;

  const langCounts = useMemo(() => countByLanguage(projects), [projects]);
  const skillCounts = useMemo(() => countByFramework(projects), [projects]);
  const langsSorted = useMemo(() => orderByUsage(about.languages, langCounts), [about.languages, langCounts]);
  const skillsSorted = useMemo(() => orderByUsage(about.skills, skillCounts), [about.skills, skillCounts]);

  return (
    <Section>
      <SectionTitle>{copy.techTitle}</SectionTitle>
      <TechGrid>
        <TechGroup
          title={copy.langGroup}
          items={langsSorted}
          counts={langCounts}
          showCounts={showCounts}
          hrefOf={(lang) => `/projects?lang=${encodeURIComponent(lang)}`}
          ariaPrefix="Filter by language"
          icon={<LangIcon />}
        />
        <TechGroup
          title={copy.stackGroup}
          items={skillsSorted}
          counts={skillCounts}
          showCounts={showCounts}
          hrefOf={(skill) => `/projects?tech=${encodeURIComponent(skill)}`}
          ariaPrefix="Filter by tech"
          icon={<ToolIcon />}
        />
      </TechGrid>
    </Section>
  );
}

interface ITechGroupProps {
  readonly title: string;
  readonly items: readonly string[];
  readonly counts: CountMap;
  readonly showCounts: boolean;
  readonly hrefOf: (item: string) => string;
  readonly ariaPrefix: string;
  readonly icon: React.ReactNode;
}

function TechGroup({ title, items, counts, showCounts, hrefOf, ariaPrefix, icon }: ITechGroupProps) {
  return (
    <GroupColumn>
      <GroupTitle>{title}</GroupTitle>
      <TechList>
        {items.map((item) => (
          <TagLink key={item} to={hrefOf(item)} aria-label={`${ariaPrefix} ${item}`}>
            {icon} {item}
            {showCounts && <SmallCount>{counts.get(item) ?? 0}</SmallCount>}
          </TagLink>
        ))}
      </TechList>
    </GroupColumn>
  );
}

const LangIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 12h16" />
    <path d="M8 6l-4 6 4 6" />
    <path d="M16 6l4 6-4 6" />
  </svg>
);

const ToolIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M14 3l7 7-3 3-7-7 3-3z" />
    <path d="M3 21l6-6" />
  </svg>
);

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: clamp(1.5rem, 4vw, 3rem);

  ${mq.md} {
    grid-template-columns: 1fr;
  }
`;

const GroupColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const GroupTitle = styled(HudLabel)`
  color: var(--accent);
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--line-strong);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-soft);
  transition: border-color ${tokens.motion.fast}ms ease, color ${tokens.motion.fast}ms ease;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`;

const SmallCount = styled.span`
  color: var(--muted);
  font-size: 0.7rem;

  &::before {
    content: '×';
    margin-right: 0.15rem;
  }
`;
