import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { portfolio, content } from '@/data/repository';
import { Section, SectionTitle } from '@/ui/Section';
import { countByAgency } from '@/model/project';
import { mq } from '@/theme/mq';
import { tokens } from '@/theme/tokens';

export interface IResumeListSectionProps {
  /** Show "NN FRAMES →" with the number of projects done at each company. */
  readonly showFrameCount: boolean;
}

/** Career entries as rows linking to that company's projects. */
export function ResumeListSection({ showFrameCount }: IResumeListSectionProps) {
  const { about, projects } = portfolio;
  const copy = content.about;
  const agencyCounts = useMemo(() => countByAgency(projects), [projects]);

  return (
    <Section>
      <SectionTitle>{copy.resumeTitle}</SectionTitle>
      <ResumeList>
        {about.resume.map((item, idx) => (
          <ResumeCard key={idx} to={`/projects?agency=${encodeURIComponent(item.company)}`} aria-label={`${item.company} 프로젝트 보기`}>
            <Period>
              {item.period[0]} — {item.period[1]}
            </Period>
            <ResumeBody>
              <Company>{item.company}</Company>
              <Department>{item.department}</Department>
              <Role>{item.role}</Role>
            </ResumeBody>
            {showFrameCount && (
              <ProjectCount data-project-count>
                {String(agencyCounts.get(item.company) ?? 0).padStart(2, '0')} {copy.framesSuffix}
              </ProjectCount>
            )}
          </ResumeCard>
        ))}
      </ResumeList>
    </Section>
  );
}

const ResumeList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line);
`;

const ResumeCard = styled(Link)`
  display: grid;
  grid-template-columns: ${tokens.layout.resumePeriodColumn}px minmax(0, 1fr) auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.25rem 0.5rem;
  border-bottom: 1px solid var(--line);
  transition: background ${tokens.motion.fast}ms ease;

  &:hover {
    background: var(--surface);
  }

  /* Component selectors need the Emotion babel plugin; target a data attribute instead */
  &:hover [data-project-count] {
    color: var(--accent);
  }

  ${mq.md} {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const Period = styled.div`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--accent);
`;

const ResumeBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

const Company = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
`;

const Department = styled.div`
  font-size: 0.85rem;
  color: var(--text-soft);
`;

const Role = styled.div`
  font-size: 0.85rem;
  color: var(--muted);
`;

const ProjectCount = styled.div`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  white-space: nowrap;
`;
