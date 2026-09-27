import styled from "@emotion/styled";
import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import data from "@/data/data.json";
import Chip from '@/components/Chip';
import { keyframes } from "@emotion/react";
import { HudLabel } from "@/styles/hud";

function Projects() {
  const { projects } = data;
  type ProjectItem = (typeof projects)[number];

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const langFilter = params.get('lang') ?? '';
  const techFilter = params.get('tech') ?? '';
  const agencyFilter = params.get('agency') ?? '';

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'public' | 'private'>('all');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [activeTechs, setActiveTechs] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<'and' | 'or'>('and');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const navigate = useNavigate();
  const [agencySelected, setAgencySelected] = useState<string>(agencyFilter);

  useEffect(() => {
    setAgencySelected(agencyFilter);
  }, [agencyFilter]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(max-width: 600px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else if ((mql as any).addListener) (mql as any).addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else if ((mql as any).removeListener) (mql as any).removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (!selectedProject || typeof window === 'undefined') return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedProject]);

  const shouldIgnoreCardOpen = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(target.closest('a, button, input, select, textarea, [data-no-modal="true"]'));
  };

  const openProjectModal = (project: ProjectItem, target: EventTarget | null) => {
    if (shouldIgnoreCardOpen(target)) return;
    setSelectedProject(project);
  };

  const closeProjectModal = () => setSelectedProject(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const getDateKey = (p: any) => {
      const d = p.release?.date ?? '';
      const digits = d.toString().replace(/\D/g, '');
      return digits ? parseInt(digits, 10) : 0;
    };
    const sorted = [...projects].sort((a, b) => {
      const pinnedDiff = Number(Boolean((b as any).pinned)) - Number(Boolean((a as any).pinned));
      if (pinnedDiff !== 0) return pinnedDiff;
      const ka = getDateKey(a);
      const kb = getDateKey(b);
      if (sort === 'newest') return kb - ka;
      return ka - kb;
    });
    const mode = isMobile ? 'and' : filterMode;
    return sorted.filter((p) => {
      const statusOk = status === 'all' || p.release?.status === status;
      const text = ((p as any).title + ' ' + (p as any).description).toLowerCase();
      const textOk = q === '' || text.includes(q);
      const langOk = !langFilter || ((p as any).ability?.language === langFilter);
    const urlTechs = techFilter ? techFilter.split(',').map(s => decodeURIComponent(s)) : [];
    const effective = [...urlTechs, ...activeTechs];

    const agencyOk = !agencySelected || ((p as any).agency?.name ?? '').toLowerCase() === agencySelected.toLowerCase();

    let techOk = true;
    if (effective.length === 0) {
      techOk = true;
    } else if (mode === 'and') {
      // AND: 모든 선택된 기술을 포함해야 통과
      techOk = effective.every((t: string) => ((p as any).ability?.framework?.includes(t) || (p as any).ability?.language === t));
    } else {
      // OR: 하나라도 포함하면 통과
      techOk = effective.some((t: string) => ((p as any).ability?.framework?.includes(t) || (p as any).ability?.language === t));
    }

    return statusOk && textOk && langOk && agencyOk && techOk;
  });
  }, [projects, query, status, sort, langFilter, techFilter, activeTechs, agencySelected, filterMode, isMobile]);

  return (
    <Container>
      <Seo title={`프로젝트 | ${data.home?.name} 포트폴리오`} description="프로젝트 목록을 검색하고 필터링할 수 있습니다." />
      <Content>
        <TitleRow>
          <Heading>
            <HudLabel>Project frames · {String(filtered.length).padStart(2, '0')} / {projects.length}</HudLabel>
            <Title>Projects</Title>
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="프로젝트 검색..."
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="프로젝트 검색..."
            aria-label="프로젝트 검색"
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'all' | 'public' | 'private')}
            aria-label="공개 여부 필터"
          >
            <option value="all">전체</option>
            <option value="public">공개</option>
            <option value="private">비공개</option>
          </Select>
          <SortSelect value={sort} onChange={(e) => setSort(e.target.value as 'newest' | 'oldest')} aria-label="정렬 필터">
            <option value="newest">최신</option>
            <option value="oldest">오래된</option>
          </SortSelect>

          <FilterModeToggle role="tablist" aria-label="필터 매칭 모드">
            <ModeLabel>매칭</ModeLabel>
            <ModeButton
              type="button"
              $active={filterMode === 'and'}
              onClick={() => setFilterMode('and')}
              role="tab"
              aria-selected={filterMode === 'and'}
            >
              AND
            </ModeButton>
            <ModeButton
              type="button"
              $active={filterMode === 'or'}
              onClick={() => setFilterMode('or')}
              role="tab"
              aria-selected={filterMode === 'or'}
            >
              OR
            </ModeButton>
          </FilterModeToggle>
        </Controls>

        <ActiveFilters>
          {/* URL 기반 agency 필터 또는 내부 선택된 agency 표시 */}
          {agencySelected && (
            <Chip
              active
              onClick={() => {
                // clear agency from state and URL
                setAgencySelected('');
                const newParams = new URLSearchParams(location.search);
                newParams.delete('agency');
                navigate(`${location.pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`, { replace: true });
              }}
              aria-pressed={false}
            >
              {agencySelected}
            </Chip>
          )}

          {/* URL 기반 tech 필터 표시 (읽기 전용) */}
          {techFilter && (
            <Chip readonly aria-hidden>
              URL 필터: {decodeURIComponent(techFilter)}
            </Chip>
          )}

          {/* 활성화된 태그 필터(토글로 적용/해제 가능) */}
          {activeTechs.map((t) => (
            <Chip
              key={t}
              active={activeTechs.includes(t)}
              onClick={() => setActiveTechs(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
              aria-pressed={activeTechs.includes(t)}
            >
              {t}
            </Chip>
          ))}
          {activeTechs.length > 0 && (
            <ClearButton onClick={() => setActiveTechs([])}>필터 초기화</ClearButton>
          )}
        </ActiveFilters>

        <ProjectGrid>
          {filtered.map((project) => (
            <Card
              key={project.name}
              role="button"
              tabIndex={0}
              onClick={(e) => openProjectModal(project, e.target)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProjectModal(project, e.target);
                }
              }}
              aria-label={`${project.title} 상세 보기`}
            >
              <FrameMeta>
                <span>FRAME {String(projects.indexOf(project) + 1).padStart(3, '0')}</span>
                <span>{project.release.date}</span>
              </FrameMeta>
              <ProjectHeader>
                <h3>{project.title}</h3>
                <HeaderRight>
                  {(project as any).pinned && <PinnedBadge>PINNED</PinnedBadge>}
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
                  {project.ability.framework.map((framework, idx) => (
                    <Chip
                      key={idx}
                      active={activeTechs.includes(framework)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTechs(prev => prev.includes(framework) ? prev.filter(x => x !== framework) : [...prev, framework]);
                      }}
                      aria-pressed={activeTechs.includes(framework)}
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

        {selectedProject && (
          <ModalOverlay role="dialog" aria-modal="true" aria-label={`${selectedProject.title} 상세 모달`} onClick={closeProjectModal}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitleGroup>
                  <h2>{selectedProject.title}</h2>
                  <ModalMeta>
                    {(selectedProject as any).pinned && <PinnedBadge>PINNED</PinnedBadge>}
                    <Status $status={selectedProject.release.status}>
                      {selectedProject.release.status === 'public' ? 'PUBLIC' : 'PRIVATE'}
                    </Status>
                  </ModalMeta>
                </ModalTitleGroup>
                <ModalCloseButton type="button" aria-label="모달 닫기" onClick={closeProjectModal}>
                  ✕
                </ModalCloseButton>
              </ModalHeader>

              <ModalBody>
                <Description>{selectedProject.description}</Description>
                <ReleaseDate>{selectedProject.release.date}</ReleaseDate>

                {(selectedProject as any).attachments?.length > 0 ? (
                  <AttachmentGrid>
                    {(selectedProject as any).attachments.map((attachment: any, idx: number) => (
                      <AttachmentFigure key={`${selectedProject.name}-attachment-${idx}`}>
                        <AttachmentImage src={attachment.src} alt={attachment.caption || `${selectedProject.title} 첨부 이미지 ${idx + 1}`} loading="lazy" />
                        {attachment.caption && <AttachmentCaption>{attachment.caption}</AttachmentCaption>}
                      </AttachmentFigure>
                    ))}
                  </AttachmentGrid>
                ) : (
                  <NoAttachmentText>첨부된 이미지가 없습니다.</NoAttachmentText>
                )}
              </ModalBody>
            </ModalCard>
          </ModalOverlay>
        )}
      </Content>
    </Container>
  );
}

export default Projects;


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
