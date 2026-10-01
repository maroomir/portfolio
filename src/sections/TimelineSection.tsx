import { useMemo } from "react";
import styled from "@emotion/styled";
import { portfolio, content } from "@/data/repository";
import { careerSpan, sortByStart } from "@/model/career";
import { groupByAgency } from "@/model/project";
import { HudLabel } from "@/ui/Hud";
import { mq } from "@/theme/mq";
import { tokens } from "@/theme/tokens";

export interface ITimelineSectionProps {
  /** List each company's project titles under its entry (public ones link to GitHub). */
  readonly showProjects: boolean;
}

/**
 * TimelineSection - career timeline drawn as a lens ruler
 * - Desktop: items along a horizontal ruler, oldest → newest
 * - Mobile: same order stacked on a vertical rail
 */
export function TimelineSection({ showProjects }: ITimelineSectionProps) {
  const { about, projects } = portfolio;
  const sorted = useMemo(() => sortByStart(about.resume), [about.resume]);
  const projectsByCompany = useMemo(() => groupByAgency(projects), [projects]);

  const span = careerSpan(about.resume);

  return (
    <Wrapper aria-label="경력 타임라인">
      <Header>
        <HudLabel>{content.timeline.label}</HudLabel>
        <HudLabel>{span?.start} ———— {span?.end}</HudLabel>
      </Header>
      <Ruler $count={sorted.length}>
        {sorted.map((it, idx) => {
          const companyKey = (it.company ?? "").toLowerCase();
          const companyProjects = showProjects ? projectsByCompany.get(companyKey) ?? [] : [];
          const isLatest = idx === sorted.length - 1;

          return (
            <Item key={idx} $isLatest={isLatest} style={{ animationDelay: `${idx * tokens.motion.timelineStagger}ms` }}>
              <Period>{it.period[0]}{isLatest ? " →" : ""}</Period>
              <Company>{it.company}</Company>
              <Role>
                {it.role}
                {it.department ? ` · ${it.department}` : ""}
              </Role>

              {companyProjects.length > 0 && (
                <ProjectsList aria-label={`${it.company} projects`}>
                  {companyProjects.map((pr, pi) => (
                    <ProjectItem key={pi}>
                      {pr.release?.status === "public" && pr.release?.link ? (
                        <a href={pr.release.link} target="_blank" rel="noopener noreferrer">
                          {pr.title}
                        </a>
                      ) : (
                        <span>{pr.title}</span>
                      )}
                    </ProjectItem>
                  ))}
                </ProjectsList>
              )}
            </Item>
          );
        })}
      </Ruler>
    </Wrapper>
  );
}

/* Styles */

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

/* 가로 눈금자: 상단 선 + 각 항목의 왼쪽 눈금 */
const Ruler = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$count}, minmax(0, 1fr));
  gap: 1rem;
  border-top: 2px solid var(--line);

  ${mq.md} {
    grid-template-columns: 1fr;
    border-top: none;
    border-left: 2px solid var(--line);
    gap: 1.5rem;
  }
`;

const Item = styled.div<{ $isLatest?: boolean }>`
  position: relative;
  padding-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;

  /* 눈금 */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: 0;
    width: 2px;
    height: 14px;
    background: ${(p) => (p.$isLatest ? "var(--accent)" : "var(--dim)")};
  }

  /* entrance animation */
  opacity: 0;
  transform: translateY(8px);
  animation: fadeUp ${tokens.motion.timelineFadeIn}ms ease forwards;

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${mq.md} {
    padding-top: 0;
    padding-left: 1.25rem;

    &::before {
      top: 0.35rem;
      left: -2px;
      width: 14px;
      height: 2px;
    }
  }
`;

const Period = styled.time`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--accent);
`;

const Company = styled.h3`
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
`;

const Role = styled.div`
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--muted);
`;

const ProjectsList = styled.div`
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ProjectItem = styled.div`
  font-size: 0.75rem;
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;

  &::before {
    content: "-";
    color: var(--accent);
    flex-shrink: 0;
  }

  a,
  span {
    color: var(--text-soft);
  }
  a:hover {
    color: var(--accent);
    text-decoration: underline;
  }
`;
