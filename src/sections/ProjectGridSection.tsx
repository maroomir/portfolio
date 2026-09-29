import styled from '@emotion/styled';
import Chip from '@/ui/Chip';
import { HudLabel } from '@/ui/Hud';
import { HudAnchor } from '@/ui/Link';
import { Card, CardDescription, CardFooter, CardGrid, CardMeta, CardTitle, CardTrigger } from '@/ui/Card';
import { ProjectBadges } from '@/components/ProjectBadges';
import { useProjectExplorer } from '@/features/project-explorer/useProjectExplorer';
import { tokens } from '@/theme/tokens';

export interface IProjectGridSectionProps {
  /** Framework chips that toggle the tech filter. */
  readonly showStackChips: boolean;
  readonly showCategory: boolean;
  /** "OPEN →" link for public projects. */
  readonly showOpenLink: boolean;
}

/** Filtered, sorted project cards; clicking a card (or its title button) opens the detail modal. */
export function ProjectGridSection({ showStackChips, showCategory, showOpenLink }: IProjectGridSectionProps) {
  const { filter, modal } = useProjectExplorer();
  const { state, dispatch, visible } = filter;

  const isTechActive = (tech: string) => state.activeTechs.includes(tech);
  const toggleTech = (tech: string) => dispatch({ type: 'toggleTech', tech });

  return (
    <CardGrid $minWidth={tokens.layout.projectCardMinWidth}>
      {visible.map(({ project, frameNo }) => (
        <Card key={project.name} $interactive>
          <CardMeta>
            <span>FRAME {String(frameNo).padStart(3, '0')}</span>
            <span>{project.release.date}</span>
          </CardMeta>
          <ProjectHeader>
            <CardTitle>
              <CardTrigger
                type="button"
                data-card-trigger
                aria-haspopup="dialog"
                onClick={(e) => modal.open(project, e.currentTarget)}
              >
                {project.title}
              </CardTrigger>
            </CardTitle>
            <ProjectBadges project={project} />
          </ProjectHeader>
          <CardDescription>{project.description}</CardDescription>

          {showStackChips && (
            <TechStack>
              <HudLabel>Stack</HudLabel>
              <TechTags>
                <TechTag>{project.ability.language}</TechTag>
                {project.ability.framework.map((framework) => (
                  <Chip
                    key={framework}
                    active={isTechActive(framework)}
                    aria-pressed={isTechActive(framework)}
                    onClick={() => toggleTech(framework)}
                  >
                    {framework}
                  </Chip>
                ))}
              </TechTags>
            </TechStack>
          )}

          {(showCategory || showOpenLink) && (
            <CardFooter>
              <Category>{showCategory ? project.category : ''}</Category>
              {showOpenLink && project.release.status === 'public' && project.release.link && (
                <HudAnchor href={project.release.link} target="_blank" rel="noopener noreferrer">
                  OPEN →
                </HudAnchor>
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </CardGrid>
  );
}

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const TechTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  background: var(--text);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
`;

const Category = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dim);
`;
