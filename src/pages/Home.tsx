import { useMemo } from "react";
import { Typewriter } from "react-simple-typewriter";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { portfolio, content } from "@/data/repository";
import Seo from "@/components/Seo";
import Timeline from "@/components/Timeline";
import { HudLabel, MonoText } from "@/styles/hud";
import type { IResume } from "@/data/schema";

const READOUT_LIMIT = 3;

function Home() {
  const { home, about, projects } = portfolio;
  const copy = content.home;
  const navigate = useNavigate();

  const topLanguages = useMemo(() => rankByCount(projects.map((p) => p.ability.language)), [projects]);
  const topFrameworks = useMemo(() => rankByCount(projects.flatMap((p) => p.ability.framework)), [projects]);
  const currentJob = useMemo(() => findLatestJob(about.resume), [about.resume]);
  const education = about.resume.find((r) => /대학/.test(r.company));

  const pinnedFrames = useMemo(
    () =>
      projects
        .map((project, index) => ({ project, frameNo: index + 1 }))
        .filter(({ project }) => project.pinned)
        .sort((a, b) => b.project.release.date.localeCompare(a.project.release.date)),
    [projects]
  );

  return (
    <Container>
      <Seo title={`${copy.seoTitle} | ${home.name} ${content.site.titleSuffix}`} description={home.bio} />
      <Inner>
        <HeroGrid>
          <Readouts aria-label="프로필 요약">
            <Readout><HudLabel>{copy.readouts.projects}</HudLabel><BigValue>{projects.length}</BigValue></Readout>
            <Readout><HudLabel>{copy.readouts.lang}</HudLabel><Value>{topLanguages.join(" · ")}</Value></Readout>
            <Readout><HudLabel>{copy.readouts.stack}</HudLabel><Value>{topFrameworks.join(" · ")}</Value></Readout>
          </Readouts>

          <Hero>
            <HudLabel>{copy.subjectLabel}</HudLabel>
            <FocusBox>
              <h1>{home.name}</h1>
            </FocusBox>
            <Bio>{home.bio}</Bio>
            <TypeEffect aria-live="polite">
              <Typewriter
                words={home.keywords}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </TypeEffect>
            <Button onClick={() => navigate("/projects")}>{copy.ctaLabel}</Button>
          </Hero>

          <Readouts $align="right" aria-label="현재 소속">
            <Readout><HudLabel>{copy.readouts.current}</HudLabel><Value>{currentJob.company} · {currentJob.department}</Value></Readout>
            {education && <Readout><HudLabel>{copy.readouts.edu}</HudLabel><Value>{education.company} · {education.role}</Value></Readout>}
            <Readout><HudLabel>{copy.readouts.mode}</HudLabel><Value $accent>{copy.modeValue}</Value></Readout>
          </Readouts>
        </HeroGrid>

        <Timeline items={about.resume} projects={projects} />

        <Section>
          <SectionHeader>
            <HudLabel>{copy.pinnedLabel} · {String(pinnedFrames.length).padStart(2, "0")} / {projects.length}</HudLabel>
            <AllLink to="/projects">{copy.allProjectsLabel}</AllLink>
          </SectionHeader>
          <FrameGrid>
            {pinnedFrames.map(({ project, frameNo }) => (
              <Frame key={project.name}>
                <FrameMeta>
                  <span>FRAME {String(frameNo).padStart(3, "0")}</span>
                  <span>{project.release.date}</span>
                </FrameMeta>
                <h3>{project.title}</h3>
                <FrameDescription>{project.description}</FrameDescription>
                <MonoText>{[project.ability.language, ...project.ability.framework].join(" · ")}</MonoText>
              </Frame>
            ))}
          </FrameGrid>
        </Section>
      </Inner>
    </Container>
  );
}

export default Home

/** 등장 횟수 순으로 상위 항목을 반환 */
function rankByCount(values: string[]): string[] {
  const counts = new Map<string, number>();
  values.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, READOUT_LIMIT)
    .map(([value]) => value);
}

/** 학업을 제외하고 종료 시점이 가장 늦은 경력 */
function findLatestJob(resume: IResume[]): IResume {
  const jobs = resume.filter((r) => !/대학/.test(r.company));
  return [...jobs].sort((a, b) => (b.period[1] ?? "").localeCompare(a.period[1] ?? ""))[0] ?? resume[0];
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--nav-height) + clamp(2rem, 5vw, 4rem)) 0 clamp(2rem, 4vw, 3rem);
`;

const Inner = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5rem);
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr) 200px;
  gap: 2rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Readouts = styled.div<{ $align?: "right" }>`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: ${(p) => (p.$align === "right" ? "right" : "left")};

  @media (max-width: 1024px) {
    order: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem 2rem;
    text-align: center;
  }
`;

const Readout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

const Value = styled.div<{ $accent?: boolean }>`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: ${(p) => (p.$accent ? "var(--accent)" : "var(--text)")};
`;

const BigValue = styled.div`
  font-family: var(--font-mono);
  font-size: 1.75rem;
  color: var(--text);
  line-height: 1.2;
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`;

/* 이름을 감싸는 포커스 박스: 네 모서리 브래킷 */
const FocusBox = styled.div`
  position: relative;
  padding: clamp(1.25rem, 3vw, 2.25rem) clamp(1.5rem, 5vw, 4rem);

  &::before, &::after,
  h1::before, h1::after {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border: 0 solid var(--text);
  }
  &::before { top: 0; left: 0; border-top-width: 2px; border-left-width: 2px; }
  &::after { top: 0; right: 0; border-top-width: 2px; border-right-width: 2px; }
  h1::before { bottom: 0; left: 0; border-bottom-width: 2px; border-left-width: 2px; }
  h1::after { bottom: 0; right: 0; border-bottom-width: 2px; border-right-width: 2px; }

  h1 {
    position: static;
    font-family: var(--font-body);
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }
`;

const Bio = styled.p`
  max-width: 620px;
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  line-height: 1.6;
  color: var(--text-soft);
  white-space: pre-line;
`;

const TypeEffect = styled.div`
  min-height: 2.25rem;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--accent);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
`;

const AllLink = styled(Link)`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--accent);

  &:hover {
    color: var(--text);
  }
`;

const FrameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Frame = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.4rem;
  border: 1px solid var(--line);
  background: var(--surface);
  transition: border-color 160ms ease;

  &:hover {
    border-color: var(--accent);
  }

  h3 {
    font-family: var(--font-body);
    font-size: 1.1rem;
  }
`;

const FrameMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--accent);
`;

const FrameDescription = styled.p`
  flex-grow: 1;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--muted);
`;
