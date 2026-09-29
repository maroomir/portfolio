import styled from '@emotion/styled';
import Chip from '@/ui/Chip';
import { ControlButton } from '@/ui/Control';
import { useProjectExplorer } from '@/features/project-explorer/useProjectExplorer';
import { mq } from '@/theme/mq';

export type IProjectActiveFiltersSectionProps = Record<string, never>;

/** Chips for the URL agency/tech filters and the toggled tech tags, plus a clear button. */
export function ProjectActiveFiltersSection() {
  const { filter } = useProjectExplorer();
  const { state, dispatch, url, clearAgency } = filter;

  return (
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
      {state.activeTechs.map((tech) => (
        <Chip key={tech} active onClick={() => dispatch({ type: 'toggleTech', tech })} aria-pressed>
          {tech}
        </Chip>
      ))}
      {state.activeTechs.length > 0 && (
        <ClearButton onClick={() => dispatch({ type: 'clearTechs' })}>필터 초기화</ClearButton>
      )}
    </ActiveFilters>
  );
}

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
