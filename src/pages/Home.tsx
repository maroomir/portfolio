import { useMemo } from "react";
import { Typewriter } from "react-simple-typewriter";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Button from "@/ui/Button";
import { portfolio, content } from "@/data/repository";
import Seo from "@/components/Seo";
import Timeline from "@/components/Timeline";
import { HudLabel, MonoText, Readout, ReadoutBigValue, ReadoutList, ReadoutValue } from "@/ui/Hud";
import { PageShell } from "@/ui/PageShell";
import { Section, SectionHeader } from "@/ui/Section";
import { Card, CardDescription, CardGrid, CardMeta, CardTitle } from "@/ui/Card";
import { HudLink } from "@/ui/Link";
import { rankTop } from "@/model/collections";
import { countByFramework, countByLanguage, selectPinnedFrames } from "@/model/project";
import { findEducation, findLatestJob } from "@/model/career";
import { mq } from "@/theme/mq";
import { tokens } from "@/theme/tokens";

function Home() {
  const { home, about, projects } = portfolio;
  const copy = content.home;
  const navigate = useNavigate();
  const { readoutLimit, typewriter } = tokens.behavior;

  const topLanguages = useMemo(() => rankTop(countByLanguage(projects), readoutLimit), [projects, readoutLimit]);
  const topFrameworks = useMemo(() => rankTop(countByFramework(projects), readoutLimit), [projects, readoutLimit]);
  const currentJob = useMemo(() => findLatestJob(about.resume), [about.resume]);
  const education = useMemo(() => findEducation(about.resume), [about.resume]);
  const pinnedFrames = useMemo(() => selectPinnedFrames(projects), [projects]);

  return (
    <PageShell>
      <Seo title={`${copy.seoTitle} | ${home.name} ${content.site.titleSuffix}`} description={home.bio} />
      <HeroGrid>
        <HeroReadouts aria-label="프로필 요약">
          <Readout><HudLabel>{copy.readouts.projects}</HudLabel><ReadoutBigValue>{projects.length}</ReadoutBigValue></Readout>
          <Readout><HudLabel>{copy.readouts.lang}</HudLabel><ReadoutValue>{topLanguages.join(" · ")}</ReadoutValue></Readout>
          <Readout><HudLabel>{copy.readouts.stack}</HudLabel><ReadoutValue>{topFrameworks.join(" · ")}</ReadoutValue></Readout>
        </HeroReadouts>

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
              typeSpeed={typewriter.typeSpeed}
              deleteSpeed={typewriter.deleteSpeed}
              delaySpeed={typewriter.delaySpeed}
            />
          </TypeEffect>
          <Button onClick={() => navigate("/projects")}>{copy.ctaLabel}</Button>
        </Hero>

        <HeroReadouts $align="right" aria-label="현재 소속">
          {currentJob && <Readout><HudLabel>{copy.readouts.current}</HudLabel><ReadoutValue>{currentJob.company} · {currentJob.department}</ReadoutValue></Readout>}
          {education && <Readout><HudLabel>{copy.readouts.edu}</HudLabel><ReadoutValue>{education.company} · {education.role}</ReadoutValue></Readout>}
          <Readout><HudLabel>{copy.readouts.mode}</HudLabel><ReadoutValue $accent>{copy.modeValue}</ReadoutValue></Readout>
        </HeroReadouts>
      </HeroGrid>

      <Timeline items={about.resume} projects={projects} />

      <Section>
        <SectionHeader>
          <HudLabel>{copy.pinnedLabel} · {String(pinnedFrames.length).padStart(2, "0")} / {projects.length}</HudLabel>
          <HudLink to="/projects">{copy.allProjectsLabel}</HudLink>
        </SectionHeader>
        <CardGrid $minWidth={tokens.layout.pinnedCardMinWidth}>
          {pinnedFrames.map(({ project, frameNo }) => (
            <Card key={project.name}>
              <CardMeta>
                <span>FRAME {String(frameNo).padStart(3, "0")}</span>
                <span>{project.release.date}</span>
              </CardMeta>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <MonoText>{[project.ability.language, ...project.ability.framework].join(" · ")}</MonoText>
            </Card>
          ))}
        </CardGrid>
      </Section>
    </PageShell>
  );
}

export default Home

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: ${tokens.layout.heroSideColumn}px minmax(0, 1fr) ${tokens.layout.heroSideColumn}px;
  gap: 2rem;
  align-items: center;

  ${mq.lg} {
    grid-template-columns: 1fr;
  }
`;

const HeroReadouts = styled(ReadoutList)`
  ${mq.lg} {
    order: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem 2rem;
    text-align: center;
  }
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`;

/* Focus box around the name: four corner brackets */
const FocusBox = styled.div`
  position: relative;
  padding: clamp(1.25rem, 3vw, 2.25rem) clamp(1.5rem, 5vw, 4rem);

  &::before, &::after,
  h1::before, h1::after {
    content: "";
    position: absolute;
    width: ${tokens.size.focusBracket}px;
    height: ${tokens.size.focusBracket}px;
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
