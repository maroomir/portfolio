import { useMemo } from 'react';
import { portfolio, content } from '@/data/repository';
import { HudLabel, MonoText } from '@/ui/Hud';
import { HudLink } from '@/ui/Link';
import { Section, SectionHeader } from '@/ui/Section';
import { Card, CardDescription, CardGrid, CardMeta, CardTitle } from '@/ui/Card';
import { selectPinnedFrames } from '@/model/project';
import { tokens } from '@/theme/tokens';

export interface IPinnedFramesSectionProps {
  /** Maximum cards to show; omit for all pinned projects. */
  readonly limit?: number;
  readonly showAllLink: boolean;
}

/** Grid of pinned project cards, newest first. */
export function PinnedFramesSection({ limit, showAllLink }: IPinnedFramesSectionProps) {
  const { projects } = portfolio;
  const copy = content.home;
  const pinnedFrames = useMemo(() => selectPinnedFrames(projects).slice(0, limit), [projects, limit]);

  return (
    <Section>
      <SectionHeader>
        <HudLabel>{copy.pinnedLabel} · {String(pinnedFrames.length).padStart(2, '0')} / {projects.length}</HudLabel>
        {showAllLink && <HudLink to="/projects">{copy.allProjectsLabel}</HudLink>}
      </SectionHeader>
      <CardGrid $minWidth={tokens.layout.pinnedCardMinWidth}>
        {pinnedFrames.map(({ project, frameNo }) => (
          <Card key={project.name}>
            <CardMeta>
              <span>FRAME {String(frameNo).padStart(3, '0')}</span>
              <span>{project.release.date}</span>
            </CardMeta>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
            <MonoText>{[project.ability.language, ...project.ability.framework].join(' · ')}</MonoText>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}
