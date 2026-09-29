import styled from "@emotion/styled";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { portfolio, content } from "@/data/repository";
import Seo from "@/components/Seo";
import { HudLabel } from "@/ui/Hud";
import { PageShell } from "@/ui/PageShell";
import { PageHeading, Section, SectionTitle } from "@/ui/Section";
import { orderByUsage } from "@/model/collections";
import { countByAgency, countByFramework, countByLanguage } from "@/model/project";
import { mq } from "@/theme/mq";
import { tokens } from "@/theme/tokens";

export default function About() {
  const { about, projects } = portfolio;
  const copy = content.about;

  const langCounts = useMemo(() => countByLanguage(projects), [projects]);
  const skillCounts = useMemo(() => countByFramework(projects), [projects]);
  const agencyCounts = useMemo(() => countByAgency(projects), [projects]);
  const langsSorted = useMemo(() => orderByUsage(about.languages, langCounts), [about.languages, langCounts]);
  const skillsSorted = useMemo(() => orderByUsage(about.skills, skillCounts), [about.skills, skillCounts]);

  return (
    <PageShell gap={tokens.space.sectionGapTight}>
      <Seo title={`${copy.seoTitle} | ${portfolio.home.name} ${content.site.titleSuffix}`} description={copy.seoDescription} />
      <PageHeading eyebrow={copy.eyebrow} title={copy.title} />

      <Section>
        <SectionTitle>{copy.techTitle}</SectionTitle>
        <TechGrid>
          <TechGroup>
            <GroupTitle>{copy.langGroup}</GroupTitle>
            <TechList>
              {langsSorted.map((lang) => (
                <TagLink key={lang} to={`/projects?lang=${encodeURIComponent(lang)}`} aria-label={`Filter by language ${lang}`}>
                  <LangIcon /> {lang}<SmallCount>{langCounts.get(lang) ?? 0}</SmallCount>
                </TagLink>
              ))}
            </TechList>
          </TechGroup>
          <TechGroup>
            <GroupTitle>{copy.stackGroup}</GroupTitle>
            <TechList>
              {skillsSorted.map((skill) => (
                <TagLink key={skill} to={`/projects?tech=${encodeURIComponent(skill)}`} aria-label={`Filter by tech ${skill}`}>
                  <ToolIcon /> {skill}<SmallCount>{skillCounts.get(skill) ?? 0}</SmallCount>
                </TagLink>
              ))}
            </TechList>
          </TechGroup>
        </TechGrid>
      </Section>

      <Section>
        <SectionTitle>{copy.resumeTitle}</SectionTitle>
        <ResumeList>
          {about.resume.map((item, idx) => (
            <ResumeCard
              key={idx}
              to={`/projects?agency=${encodeURIComponent(item.company)}`}
              aria-label={`${item.company} 프로젝트 보기`}
            >
              <Period>
                {item.period[0]} — {item.period[1]}
              </Period>
              <ResumeBody>
                <Company>{item.company}</Company>
                <Department>{item.department}</Department>
                <Role>{item.role}</Role>
              </ResumeBody>
              <ProjectCount data-project-count>{String(agencyCounts.get(item.company) ?? 0).padStart(2, "0")} {copy.framesSuffix}</ProjectCount>
            </ResumeCard>
          ))}
        </ResumeList>
      </Section>
    </PageShell>
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

const TechGroup = styled.div`
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
    content: "×";
    margin-right: 0.15rem;
  }
`;

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
