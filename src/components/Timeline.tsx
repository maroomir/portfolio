import { useMemo } from "react";
import styled from "@emotion/styled";
import { IProject, IResume } from "@/data/data";
import data from "@/data/data.json";
import { HudLabel } from "@/styles/hud";

/**
 * Timeline - 렌즈 눈금자 형태의 경력 타임라인
 * - 데스크탑: 가로 눈금자 위에 시작 시점 순(오래된 → 최신)으로 배치
 * - 모바일: 왼쪽 세로 레일에 같은 순서로 스택
 *
 * Props:
 * - items: IResume[]
 *
 * 동작:
 * - 각 항목 하단에 해당 회사에서 수행한 프로젝트 제목을 나열 (public 프로젝트는 깃허브 링크)
 * - 하이라이트 및 프로젝트 설명은 표시하지 않음 (요청에 따라 프로젝트 제목만 노출)
 */

type Props = {
  items: IResume[];
};

export default function Timeline({ items }: Props) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => (a.period[0] ?? "").localeCompare(b.period[0] ?? "")),
    [items]
  );

  const projects = data.projects as IProject[];
  const projectsByCompany = useMemo(() => {
    const map: Record<string, IProject[]> = {};
    projects.forEach((p) => {
      const name = (p.agency?.name ?? "").toLowerCase();
      if (!map[name]) map[name] = [];
      map[name].push(p);
    });
    return map;
  }, [projects]);

  const startYear = sorted[0]?.period[0]?.slice(0, 4);
  const endYear = sorted[sorted.length - 1]?.period[1]?.slice(0, 4);

  return (
    <Wrapper aria-label="경력 타임라인">
      <Header>
        <HudLabel>Career timeline</HudLabel>
        <HudLabel>{startYear} ———— {endYear}</HudLabel>
      </Header>
      <Ruler $count={sorted.length}>
        {sorted.map((it, idx) => {
          const companyKey = (it.company ?? "").toLowerCase();
          const companyProjects = projectsByCompany[companyKey] || [];
          const isLatest = idx === sorted.length - 1;

          return (
            <Item key={idx} $isLatest={isLatest} style={{ animationDelay: `${idx * 80}ms` }}>
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

  @media (max-width: 900px) {
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
  animation: fadeUp 420ms ease forwards;

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 900px) {
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
