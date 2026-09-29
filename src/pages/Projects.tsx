import styled from "@emotion/styled";
import { useState } from "react";
import Seo from "@/components/Seo";
import { portfolio, content } from "@/data/repository";
import Chip from '@/ui/Chip';
import { HudLabel } from "@/ui/Hud";
import { PageShell } from "@/ui/PageShell";
import { PageHeading } from "@/ui/Section";
import { Card, CardDescription, CardFooter, CardGrid, CardMeta, CardTitle } from "@/ui/Card";
import { ControlButton, Select, TextInput, ToggleGroup, ToggleLabel } from "@/ui/Control";
import { HudAnchor } from "@/ui/Link";
import { ProjectBadges } from "@/components/ProjectBadges";
import { ProjectModal } from "@/features/project-modal/ProjectModal";
import type { ReleaseStatus } from "@/data/schema";
import type { SortOrder } from "@/model/project";
import { useProjectFilter } from "@/features/project-filter/useProjectFilter";
import { useProjectModal } from "@/features/project-modal/useProjectModal";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { MOBILE_QUERY, mq } from "@/theme/mq";
import { tokens } from "@/theme/tokens";

function Projects() {
  const { projects } = portfolio;
  const copy = content.projects;

  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { state, dispatch, url, clearAgency, visible } = useProjectFilter(projects, { forceAndMode: isMobile });
  const modal = useProjectModal();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const isTechActive = (tech: string) => state.activeTechs.includes(tech);
  const toggleTech = (tech: string) => dispatch({ type: 'toggleTech', tech });

  return (
    <PageShell gap="0">
      <Seo title={`${copy.seoTitle} | ${portfolio.home.name} ${content.site.titleSuffix}`} description={copy.seoDescription} />
      <TitleRow>
        <PageHeading
          eyebrow={<>{copy.eyebrow} · {String(visible.length).padStart(2, '0')} / {projects.length}</>}
          title={copy.title}
        />
        <InlineMobileSearchButton
          type="button"
          aria-label={mobileSearchOpen ? "검색 닫기" : "검색 열기"}
          onClick={() => setMobileSearchOpen((s) => !s)}
          aria-expanded={mobileSearchOpen}
        >
          검색
        </InlineMobileSearchButton>
      </TitleRow>

      <Controls>
        {mobileSearchOpen && (
          <MobileSearchBar role="search" aria-hidden={!mobileSearchOpen}>
            <MobileSearchInput
              value={state.query}
              onChange={(e) => dispatch({ type: 'setQuery', query: e.target.value })}
              placeholder={copy.searchPlaceholder}
              aria-label="모바일 프로젝트 검색"
              autoFocus
            />
            <MobileSearchClose type="button" aria-label="검색 닫기" onClick={() => setMobileSearchOpen(false)}>
              ✕
            </MobileSearchClose>
          </MobileSearchBar>
        )}

        <SearchInput
          value={state.query}
          onChange={(e) => dispatch({ type: 'setQuery', query: e.target.value })}
          placeholder={copy.searchPlaceholder}
          aria-label="프로젝트 검색"
        />
        <Select
          value={state.status}
          onChange={(e) => dispatch({ type: 'setStatus', status: e.target.value as ReleaseStatus | 'all' })}
          aria-label="공개 여부 필터"
        >
          <option value="all">전체</option>
          <option value="public">공개</option>
          <option value="private">비공개</option>
        </Select>
        <Select value={state.sort} onChange={(e) => dispatch({ type: 'setSort', sort: e.target.value as SortOrder })} aria-label="정렬 필터">
          <option value="newest">최신</option>
          <option value="oldest">오래된</option>
        </Select>

        <MatchModeToggle role="tablist" aria-label="필터 매칭 모드">
          <ToggleLabel>매칭</ToggleLabel>
          <ControlButton type="button" $active={state.mode === 'and'} onClick={() => dispatch({ type: 'setMode', mode: 'and' })} role="tab" aria-selected={state.mode === 'and'}>
            AND
          </ControlButton>
          <ControlButton type="button" $active={state.mode === 'or'} onClick={() => dispatch({ type: 'setMode', mode: 'or' })} role="tab" aria-selected={state.mode === 'or'}>
            OR
          </ControlButton>
        </MatchModeToggle>
      </Controls>

      <ActiveFilters>
        {url.agency && (
          <Chip active onClick={clearAgency} aria-pressed={false}>
            {url.agency}
          </Chip>
        )}
        {url.techs.length > 0 && (
          <Chip readonly aria-hidden>
            URL 필터: {url.techs.join(',')}
          </Chip>
        )}
        {state.activeTechs.map((t) => (
          <Chip key={t} active onClick={() => toggleTech(t)} aria-pressed>
            {t}
          </Chip>
        ))}
        {state.activeTechs.length > 0 && (
          <ClearButton onClick={() => dispatch({ type: 'clearTechs' })}>필터 초기화</ClearButton>
        )}
      </ActiveFilters>

      <CardGrid $minWidth={tokens.layout.projectCardMinWidth}>
        {visible.map(({ project, frameNo }) => (
          <Card
            key={project.name}
            $interactive
            role="button"
            tabIndex={0}
            onClick={(e) => modal.openFrom(project, e.target)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                modal.openFrom(project, e.target);
              }
            }}
            aria-label={`${project.title} 상세 보기`}
          >
            <CardMeta>
              <span>FRAME {String(frameNo).padStart(3, '0')}</span>
              <span>{project.release.date}</span>
            </CardMeta>
            <ProjectHeader>
              <CardTitle>{project.title}</CardTitle>
              <ProjectBadges project={project} />
            </ProjectHeader>
            <CardDescription>{project.description}</CardDescription>

            <TechStack>
              <HudLabel>Stack</HudLabel>
              <TechTags>
                <TechTag>{project.ability.language}</TechTag>
                {project.ability.framework.map((framework) => (
                  <Chip
                    key={framework}
                    active={isTechActive(framework)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTech(framework);
                    }}
                    aria-pressed={isTechActive(framework)}
                  >
                    {framework}
                  </Chip>
                ))}
              </TechTags>
            </TechStack>

            <CardFooter>
              <Category>{project.category}</Category>
              {project.release.status === 'public' && project.release.link && (
                <HudAnchor href={project.release.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  OPEN →
                </HudAnchor>
              )}
            </CardFooter>
          </Card>
        ))}
      </CardGrid>

      {modal.selected && <ProjectModal project={modal.selected} onClose={modal.close} noAttachmentText={copy.noAttachment} />}
    </PageShell>
  );
}

export default Projects;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
`;

const InlineMobileSearchButton = styled(ControlButton)`
  display: none;
  padding: 0.45rem 0.7rem;
  color: var(--text);

  ${mq.sm} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  flex-wrap: wrap;

  /* Mobile: stack controls so inputs use the full width */
  ${mq.sm} {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.25rem;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--line-strong);
  }

  ${mq.upSm} {
    flex-wrap: wrap;
    overflow: visible;
    padding-bottom: 0;
  }
`;

const ClearButton = styled(ControlButton)`
  padding: 0.3rem 0.7rem;
  font-size: 0.75rem;
`;

const MatchModeToggle = styled(ToggleGroup)`
  margin-left: 0.5rem;

  ${mq.sm} {
    display: none;
  }
`;

const SearchInput = styled(TextInput)`
  flex: 1 1 280px;
  min-width: 220px;

  /* Desktop only; mobile uses the dedicated search bar */
  ${mq.sm} {
    display: none;
  }
`;

const MobileSearchBar = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  background: var(--surface);
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--line-strong);

  ${mq.upSm} {
    display: none;
  }
`;

const MobileSearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.5rem;
  border: none;
  background: transparent;
  color: var(--text);
  font-family: var(--font-mono);
  outline: none;
`;

const MobileSearchClose = styled.button`
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
`;

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
