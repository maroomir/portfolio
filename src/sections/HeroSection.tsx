import { useMemo, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import { portfolio, content } from '@/data/repository';
import Button from '@/ui/Button';
import { HudLabel, Readout, ReadoutBigValue, ReadoutList, ReadoutValue } from '@/ui/Hud';
import { rankTop } from '@/model/collections';
import { countByFramework, countByLanguage } from '@/model/project';
import { findEducation, findLatestJob } from '@/model/career';
import { mq } from '@/theme/mq';
import { tokens } from '@/theme/tokens';

/** Readouts that can be placed beside the hero; labels come from content.home.readouts. */
export type ReadoutKey = 'projects' | 'lang' | 'stack' | 'current' | 'edu' | 'mode';

export interface IHeroSectionProps {
  readonly leftReadouts: readonly ReadoutKey[];
  readonly rightReadouts: readonly ReadoutKey[];
  readonly showTypewriter: boolean;
  readonly showCta: boolean;
}

interface IReadoutView {
  readonly label: string;
  readonly value: ReactNode;
  readonly size?: 'big';
  readonly accent?: boolean;
}

function useReadouts(): Partial<Record<ReadoutKey, IReadoutView>> {
  const { about, projects } = portfolio;
  const copy = content.home;
  const { readoutLimit } = tokens.behavior;

  return useMemo(() => {
    const currentJob = findLatestJob(about.resume);
    const education = findEducation(about.resume);
    return {
      projects: { label: copy.readouts.projects, value: projects.length, size: 'big' },
      lang: { label: copy.readouts.lang, value: rankTop(countByLanguage(projects), readoutLimit).join(' · ') },
      stack: { label: copy.readouts.stack, value: rankTop(countByFramework(projects), readoutLimit).join(' · ') },
      current: currentJob && { label: copy.readouts.current, value: `${currentJob.company} · ${currentJob.department}` },
      edu: education && { label: copy.readouts.edu, value: `${education.company} · ${education.role}` },
      mode: { label: copy.readouts.mode, value: copy.modeValue, accent: true },
    };
  }, [about.resume, projects, copy, readoutLimit]);
}

function ReadoutColumn({ keys, align, label }: { keys: readonly ReadoutKey[]; align: 'left' | 'right'; label: string }) {
  const readouts = useReadouts();
  return (
    <HeroReadouts $align={align} aria-label={label}>
      {keys.map((key) => {
        const readout = readouts[key];
        if (!readout) {
          return null;
        }
        return (
          <Readout key={key}>
            <HudLabel>{readout.label}</HudLabel>
            {readout.size === 'big' ? (
              <ReadoutBigValue>{readout.value}</ReadoutBigValue>
            ) : (
              <ReadoutValue $accent={readout.accent}>{readout.value}</ReadoutValue>
            )}
          </Readout>
        );
      })}
    </HeroReadouts>
  );
}

/** Name in a focus box, bio, typewriter keywords and CTA, flanked by HUD readouts. */
export function HeroSection({ leftReadouts, rightReadouts, showTypewriter, showCta }: IHeroSectionProps) {
  const { home } = portfolio;
  const copy = content.home;
  const navigate = useNavigate();
  const { typewriter } = tokens.behavior;

  return (
    <HeroGrid>
      <ReadoutColumn keys={leftReadouts} align="left" label="프로필 요약" />

      <Hero>
        <HudLabel>{copy.subjectLabel}</HudLabel>
        <FocusBox>
          <h1>{home.name}</h1>
        </FocusBox>
        <Bio>{home.bio}</Bio>
        {showTypewriter && (
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
        )}
        {showCta && <Button onClick={() => navigate('/projects')}>{copy.ctaLabel}</Button>}
      </Hero>

      <ReadoutColumn keys={rightReadouts} align="right" label="현재 소속" />
    </HeroGrid>
  );
}

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
    content: '';
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
