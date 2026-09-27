import styled from "@emotion/styled";
import { useMemo } from "react";
import data from "@/data/data.json"
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { HudLabel } from "@/styles/hud";

export default function About() {
  const { about, projects } = data

  const langsSorted = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p: any) => {
      const lang = p?.ability?.language;
      if (lang) counts[lang] = (counts[lang] || 0) + 1;
    });
    return about.languages
      .map((l: string, idx: number) => ({ l, idx, count: counts[l] || 0 }))
      .sort((a, b) => (b.count - a.count) || (a.idx - b.idx))
      .map(x => x.l);
  }, [about, projects]);

  const skillsSorted = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p: any) => {
      const frameworks = p?.ability?.framework ?? [];
      frameworks.forEach((f: string) => {
        if (f) counts[f] = (counts[f] || 0) + 1;
      });
    });
    return about.skills
      .map((s: string, idx: number) => ({ s, idx, count: counts[s] || 0 }))
      .sort((a, b) => (b.count - a.count) || (a.idx - b.idx))
      .map(x => x.s);
  }, [about, projects]);

  const langCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p: any) => {
      const lang = p?.ability?.language;
      if (lang) counts[lang] = (counts[lang] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const skillCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p: any) => {
      const frameworks = p?.ability?.framework ?? [];
      frameworks.forEach((f: string) => {
        if (f) counts[f] = (counts[f] || 0) + 1;
      });
    });
    return counts;
  }, [projects]);

  const agencyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p: any) => {
      const agency = (p?.agency?.name ?? '').toString();
      if (agency) counts[agency] = (counts[agency] || 0) + 1;
    });
    return counts;
  }, [projects]);

  return (
    <Container>
      <Seo title={`소개 | ${data.home?.name} 포트폴리오`} description="보유 기술과 경력을 소개합니다." />
      <Content>
        <Heading>
          <HudLabel>Subject data</HudLabel>
          <Title>About Me</Title>
        </Heading>

        <Section>
          <SectionTitle>기술 스택</SectionTitle>
          <TechGrid>
            <TechGroup>
              <GroupTitle>Lang</GroupTitle>
              <TechList>
                {langsSorted.map((lang) => (
                  <TagLink key={lang} to={`/projects?lang=${encodeURIComponent(lang)}`} aria-label={`Filter by language ${lang}`}>
                    <LangIcon /> {lang}<SmallCount>{langCounts[lang] ?? 0}</SmallCount>
                  </TagLink>
                ))}
              </TechList>
            </TechGroup>
            <TechGroup>
              <GroupTitle>Stack</GroupTitle>
              <TechList>
                {skillsSorted.map((skill) => (
                  <TagLink key={skill} to={`/projects?tech=${encodeURIComponent(skill)}`} aria-label={`Filter by tech ${skill}`}>
                    <ToolIcon /> {skill}<SmallCount>{skillCounts[skill] ?? 0}</SmallCount>
                  </TagLink>
                ))}
              </TechList>
            </TechGroup>
          </TechGrid>
        </Section>

        <Section>
          <SectionTitle>이력</SectionTitle>
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
                <ProjectCount data-project-count>{String(agencyCounts[item.company] ?? 0).padStart(2, "0")} FRAMES →</ProjectCount>
              </ResumeCard>
            ))}
          </ResumeList>
        </Section>
      </Content>
    </Container>
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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--nav-height) + clamp(2rem, 5vw, 4rem)) 0 clamp(2rem, 4vw, 3rem);
`;

const Content = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 4rem);
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-body);
  font-size: 1.25rem;

  &::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background: var(--line);
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: clamp(1.5rem, 4vw, 3rem);

  @media (max-width: 768px) {
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
  transition: border-color 160ms ease, color 160ms ease;

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
  grid-template-columns: 180px minmax(0, 1fr) auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.25rem 0.5rem;
  border-bottom: 1px solid var(--line);
  transition: background 160ms ease;

  &:hover {
    background: var(--surface);
  }

  /* 컴포넌트 선택자는 Emotion babel 플러그인이 없으면 런타임 예외를 던지므로 data 속성으로 지정 */
  &:hover [data-project-count] {
    color: var(--accent);
  }

  @media (max-width: 768px) {
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
