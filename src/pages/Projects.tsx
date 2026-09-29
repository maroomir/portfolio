import styled from "@emotion/styled";
import { useState } from "react";
import Seo from "@/components/Seo";
import { portfolio, content } from "@/data/repository";
import Chip from '@/components/Chip';
import { keyframes } from "@emotion/react";
import { HudLabel } from "@/styles/hud";
import type { IProject, ReleaseStatus } from "@/data/schema";
import type { SortOrder } from "@/model/project";
import { useProjectFilter } from "@/features/project-filter/useProjectFilter";
import { useProjectModal } from "@/features/project-modal/useProjectModal";
import { useMediaQuery } from "@/lib/useMediaQuery";

const MOBILE_QUERY = '(max-width: 600px)';

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
    <Container>
      <Seo title={`${copy.seoTitle} | ${portfolio.home.name} ${content.site.titleSuffix}`} description={copy.seoDescription} />
      <Content>
        <TitleRow>
          <Heading>
            <HudLabel>{copy.eyebrow} · {String(visible.length).padStart(2, '0')} / {projects.length}</HudLabel>
            <Title>{copy.title}</Title>
          </Heading>
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
              <MobileSearchClose
                type="button"
                aria-label="검색 닫기"
                onClick={() => setMobileSearchOpen(false)}
              >
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
          <SortSelect value={state.sort} onChange={(e) => dispatch({ type: 'setSort', sort: e.target.value as SortOrder })} aria-label="정렬 필터">
            <option value="newest">최신</option>
            <option value="oldest">오래된</option>
          </SortSelect>

          <FilterModeToggle role="tablist" aria-label="필터 매칭 모드">
            <ModeLabel>매칭</ModeLabel>
            <ModeButton
              type="button"
              $active={state.mode === 'and'}
              onClick={() => dispatch({ type: 'setMode', mode: 'and' })}
              role="tab"
              aria-selected={state.mode === 'and'}
            >
              AND
            </ModeButton>
            <ModeButton
              type="button"
              $active={state.mode === 'or'}
              onClick={() => dispatch({ type: 'setMode', mode: 'or' })}
              role="tab"
              aria-selected={state.mode === 'or'}
            >
              OR
            </ModeButton>
          </FilterModeToggle>
        </Controls>

        <ActiveFilters>
          {/* URL 기반 agency 필터 (About 페이지 링크에서 진입) */}
          {url.agency && (
            <Chip active onClick={clearAgency} aria-pressed={false}>
              {url.agency}
            </Chip>
          )}

          {/* URL 기반 tech 필터 표시 (읽기 전용) */}
          {url.techs.length > 0 && (
            <Chip readonly aria-hidden>
              URL 필터: {url.techs.join(',')}
            </Chip>
          )}

          {/* 활성화된 태그 필터(토글로 적용/해제 가능) */}
          {state.activeTechs.map((t) => (
            <Chip key={t} active onClick={() => toggleTech(t)} aria-pressed>
              {t}
            </Chip>
          ))}
          {state.activeTechs.length > 0 && (
            <ClearButton onClick={() => dispatch({ type: 'clearTechs' })}>필터 초기화</ClearButton>
          )}
        </ActiveFilters>

        <ProjectGrid>
          {visible.map(({ project, frameNo }) => (
            <Card
              key={project.name}
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
              <FrameMeta>
                <span>FRAME {String(frameNo).padStart(3, '0')}</span>
                <span>{project.release.date}</span>
              </FrameMeta>
              <ProjectHeader>
                <h3>{project.title}</h3>
                <HeaderRight>
                  {project.pinned && <PinnedBadge>PINNED</PinnedBadge>}
                  <Status $status={project.release.status}>
                    {project.release.status === 'public' ? 'PUBLIC' : 'PRIVATE'}
                  </Status>
                </HeaderRight>
              </ProjectHeader>
              <Description>{project.description}</Description>
              
              <TechStack>
                <TechLabel>Stack</TechLabel>
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
              
              <ProjectFooter>
                <Category>{project.category}</Category>
                {project.release.status === 'public' && project.release.link && (
                  <GitHubLink
                    href={project.release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    OPEN →
                  </GitHubLink>
                )}
              </ProjectFooter>
            </Card>
          ))}
        </ProjectGrid>

        {modal.selected && <ProjectModal project={modal.selected} onClose={modal.close} noAttachmentText={copy.noAttachment} />}
      </Content>
    </Container>
  );
}

export default Projects;

type ProjectModalProps = {
  project: IProject;
  onClose: () => void;
  noAttachmentText: string;
};

function ProjectModal({ project, onClose, noAttachmentText }: ProjectModalProps) {
  return (
    <ModalOverlay role="dialog" aria-modal="true" aria-label={`${project.title} 상세 모달`} onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitleGroup>
            <h2>{project.title}</h2>
            <ModalMeta>
              {project.pinned && <PinnedBadge>PINNED</PinnedBadge>}
              <Status $status={project.release.status}>
                {project.release.status === 'public' ? 'PUBLIC' : 'PRIVATE'}
              </Status>
            </ModalMeta>
          </ModalTitleGroup>
          <ModalCloseButton type="button" aria-label="모달 닫기" onClick={onClose}>
            ✕
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <Description>{project.description}</Description>
          <ReleaseDate>{project.release.date}</ReleaseDate>

          {project.attachments && project.attachments.length > 0 ? (
            <AttachmentGrid>
              {project.attachments.map((attachment, idx) => (
                <AttachmentFigure key={`${project.name}-attachment-${idx}`}>
                  <AttachmentImage src={attachment.src} alt={attachment.caption || `${project.title} 첨부 이미지 ${idx + 1}`} loading="lazy" />
                  {attachment.caption && <AttachmentCaption>{attachment.caption}</AttachmentCaption>}
                </AttachmentFigure>
              ))}
            </AttachmentGrid>
          ) : (
            <NoAttachmentText>{noAttachmentText}</NoAttachmentText>
          )}
        </ModalBody>
      </ModalCard>
    </ModalOverlay>
  );
}


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
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
`;

const controlBase = `
  padding: 0.6rem 0.9rem;
  border-radius: 0;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  outline: none;

  &:focus-visible {
    border-color: var(--accent);
    outline: none;
  }
`;

const InlineMobileSearchButton = styled.button`
  display: none;
  ${controlBase}
  padding: 0.45rem 0.7rem;
  cursor: pointer;

  @media (max-width: 600px) {
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

  /* 모바일: 컨트롤을 세로로 쌓고 버튼/인풋이 화면 폭을 사용하게 함 */
  @media (max-width: 600px) {
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

  /* hide native scrollbar visually while remaining accessible */
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--line-strong);
  }

  @media (min-width: 600px) {
    flex-wrap: wrap;
    overflow: visible;
    padding-bottom: 0;
  }
`;

const ClearButton = styled.button`
  ${controlBase}
  padding: 0.3rem 0.7rem;
  font-size: 0.75rem;
  color: var(--muted);
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`;

const FilterModeToggle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.5rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ModeLabel = styled(HudLabel)``;

const ModeButton = styled.button<{ $active?: boolean }>`
  ${controlBase}
  padding: 0.35rem 0.6rem;
  border-color: ${props => (props.$active ? 'var(--accent)' : 'var(--line-strong)')};
  color: ${props => (props.$active ? 'var(--accent)' : 'var(--muted)')};
  cursor: pointer;
`;

const SearchInput = styled.input`
  ${controlBase}
  flex: 1 1 280px;
  min-width: 220px;

  ::placeholder {
    color: var(--muted);
  }

  /* 데스크톱: 기본 노출, 모바일: 전용 모바일 검색 컴포넌트 사용 */
  @media (max-width: 600px) {
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

  @media (min-width: 601px) {
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

const Select = styled.select`
  ${controlBase}
  flex: 0 0 auto;
  cursor: pointer;
`;

const SortSelect = styled(Select)``;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1.5rem;

  /* 모바일: 한 열 레이아웃으로 카드가 풀폭을 사용하도록 함 */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 1.4rem;
  box-sizing: border-box;
  transition: border-color 220ms ease;
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    padding: 1rem;
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

const HeaderRight = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
`;

const badgeBase = `
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.45rem;
  border: 1px solid;
`;

const PinnedBadge = styled.span`
  ${badgeBase}
  color: var(--bg);
  background: var(--accent);
  border-color: var(--accent);
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;

  h3 {
    margin: 0;
    font-family: var(--font-body);
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

const Status = styled.span<{ $status: string }>`
  ${badgeBase}
  color: ${props => (props.$status === 'public' ? '#7ee787' : 'var(--muted)')};
  border-color: ${props => (props.$status === 'public' ? 'rgba(126, 231, 135, 0.4)' : 'var(--line-strong)')};
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.55;
`;

const TechStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TechLabel = styled(HudLabel)``;

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

const ProjectFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--line);
`;

const Category = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dim);
`;

const ReleaseDate = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--muted);
`;

const GitHubLink = styled.a`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--accent);
  transition: color 0.2s ease;

  &:hover {
    color: var(--text);
    text-decoration: underline;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.75rem, 2.5vw, 1.5rem);
`;

const modalPopIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ModalCard = styled.div`
  width: min(960px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  padding: clamp(1rem, 3vw, 1.6rem);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  animation: ${modalPopIn} 220ms ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ModalTitleGroup = styled.div`
  h2 {
    margin: 0;
    font-family: var(--font-body);
    font-size: clamp(1.25rem, 3vw, 1.75rem);
  }
`;

const ModalMeta = styled.div`
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const ModalCloseButton = styled.button`
  ${controlBase}
  min-width: 36px;
  min-height: 36px;
  padding: 0;
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AttachmentGrid = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
`;

const AttachmentFigure = styled.figure`
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--bg);
`;

const AttachmentImage = styled.img`
  display: block;
  width: 100%;
  max-height: 240px;
  object-fit: cover;
`;

const AttachmentCaption = styled.figcaption`
  padding: 0.55rem 0.7rem;
  font-size: 0.85rem;
  color: var(--text-soft);
`;

const NoAttachmentText = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: var(--muted);
`;
