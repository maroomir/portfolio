import { useMemo } from "react";
import styled from "@emotion/styled";
import { IResume } from "@/data/data";
import data from "@/data/data.json";

/**
 * Timeline
 * - 세로 중심형 타임라인 (데스크탑)
 * - 모바일에서는 단일 열(스택) 형태로 표시
 *
 * Props:
 * - items: IResume[]
 *
 * 동작:
 * - 기간(period 배열)의 시작 연도(숫자)를 파싱하여 최신순으로 정렬 후 렌더링
 * - 각 항목에 간단한 등장 애니메이션 적용
 * - 해당 회사에서 수행한 모든 프로젝트를 카드 하단에 나열 (public 프로젝트는 깃허브 링크)
 * - 하이라이트 및 프로젝트 설명은 표시하지 않음 (요청에 따라 프로젝트 제목만 노출)
 */

type Props = {
  items: IResume[];
};

export default function Timeline({ items }: Props) {
  const sorted = useMemo(() => {
    const getYear = (p?: string[]) => {
      if (!p || p.length === 0) return 0;
      const s = p[0];
      const digits = s?.toString().match(/20\d{2}|19\d{2}/);
      return digits ? parseInt(digits[0], 10) : 0;
    };
    return [...items].sort((a, b) => getYear(b.period) - getYear(a.period));
  }, [items]);

  const projects = (data as any).projects || [];
  const projectsByCompany = useMemo(() => {
    const map: Record<string, any[]> = {};
    projects.forEach((p: any) => {
      const name = (p.agency?.name ?? "").toLowerCase();
      if (!map[name]) map[name] = [];
      map[name].push(p);
    });
    return map;
  }, [projects]);

  return (
    <Wrapper>
      <Inner>
        <Line aria-hidden />
        {sorted.map((it, idx) => {
          const companyKey = (it.company ?? "").toLowerCase();
          const companyProjects = projectsByCompany[companyKey] || [];

          return (
            <Item
              key={idx}
              $side={idx % 2 === 0 ? "left" : "right"}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <Dot aria-hidden />
              <ItemCard>
                <Company>{it.company}</Company>
                <Role>
                  {it.role}
                  {it.department ? ` · ${it.department}` : ""}
                </Role>
                <PeriodText>{(it.period || []).join(" — ")}</PeriodText>

                {/* 하이라이트는 표시하지 않음 (요청) */}

                {companyProjects.length > 0 && (
                  <ProjectsList aria-label={`${it.company} projects`}>
                    {companyProjects.map((pr: any, pi: number) => (
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
              </ItemCard>
            </Item>
          );
        })}
      </Inner>
    </Wrapper>
  );
}

/* Styles */

const Wrapper = styled.section`
  width: 100%;
  max-width: var(--max-width, 1200px);
  margin: 2.5rem auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;
`;

const Inner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
`;

/* center vertical line on wide screens */
const Line = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04));
  z-index: 0;

  @media (max-width: 800px) {
    left: 24px;
    transform: none;
  }
`;

const Item = styled.div<{ $side?: "left" | "right" }>`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: ${(p) => (p.$side === "left" ? "flex-end" : "flex-start")};
  align-items: flex-start;

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

  @media (max-width: 800px) {
    justify-content: flex-start;
    padding-left: 56px; /* space for line/dot */
  }
`;

const Dot = styled.span`
  position: absolute;
  left: calc(50% - 6px);
  top: 14px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--chip-active, rgba(99,102,241,0.24));
  border: 2px solid var(--chip-active-border, rgba(99,102,241,0.95));
  box-shadow: 0 6px 18px rgba(99,102,241,0.14);

  @media (max-width: 800px) {
    left: 20px;
  }
`;

const ItemCard = styled.article`
  background: var(--card-bg, rgba(255,255,255,0.04));
  border: 1px solid var(--glass-border, rgba(255,255,255,0.06));
  color: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  width: min(48rem, 46%);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);

  @media (max-width: 800px) {
    width: 100%;
    padding: 0.9rem;
    border-radius: 10px;
  }
`;

const Company = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
`;

const Role = styled.div`
  font-size: 0.95rem;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const PeriodText = styled.time`
  display: block;
  font-size: 0.9rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

/* 하이라이트 표시 제거 (요청) */

const ProjectsList = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProjectItem = styled.div`
  font-size: 0.8rem;
  line-height: 1;
  text-align: left;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.2rem;

  &::before {
    content: "-";
    color: var(--primary, #ffd700);
    display: inline-block;
    width: 1ch;
    margin-right: 0.35rem;
    margin-top: 0.1rem;
  }

  a,
  span {
    color: #ffffff;
    font-weight: 500;
    text-decoration: none;
    display: inline;
  }
  a:hover {
    text-decoration: underline;
  }
`;
