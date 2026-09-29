import styled from '@emotion/styled';
import { content } from '@/data/repository';
import type { ReleaseStatus } from '@/data/schema';
import type { SortOrder } from '@/model/project';
import { ControlButton, Select, TextInput, ToggleGroup, ToggleLabel } from '@/ui/Control';
import { useProjectExplorer } from '@/features/project-explorer/useProjectExplorer';
import { mq } from '@/theme/mq';

export interface IProjectControlsSectionProps {
  readonly showStatusFilter: boolean;
  readonly showSort: boolean;
  /** AND/OR toggle; hidden on phones regardless (they always match with AND). */
  readonly showMatchMode: boolean;
}

/** Search box, status/sort selects and the AND/OR match toggle. */
export function ProjectControlsSection({ showStatusFilter, showSort, showMatchMode }: IProjectControlsSectionProps) {
  const copy = content.projects;
  const { filter, mobileSearch } = useProjectExplorer();
  const { state, dispatch } = filter;

  return (
    <Controls>
      {mobileSearch.isOpen && (
        <MobileSearchBar role="search">
          <MobileSearchInput
            value={state.query}
            onChange={(e) => dispatch({ type: 'setQuery', query: e.target.value })}
            placeholder={copy.searchPlaceholder}
            aria-label="모바일 프로젝트 검색"
            autoFocus
          />
          <MobileSearchClose type="button" aria-label="검색 닫기" onClick={mobileSearch.close}>
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

      {showStatusFilter && (
        <Select
          value={state.status}
          onChange={(e) => dispatch({ type: 'setStatus', status: e.target.value as ReleaseStatus | 'all' })}
          aria-label="공개 여부 필터"
        >
          <option value="all">전체</option>
          <option value="public">공개</option>
          <option value="private">비공개</option>
        </Select>
      )}

      {showSort && (
        <Select value={state.sort} onChange={(e) => dispatch({ type: 'setSort', sort: e.target.value as SortOrder })} aria-label="정렬 필터">
          <option value="newest">최신</option>
          <option value="oldest">오래된</option>
        </Select>
      )}

      {showMatchMode && (
        <MatchModeToggle role="tablist" aria-label="필터 매칭 모드">
          <ToggleLabel>매칭</ToggleLabel>
          <ControlButton type="button" role="tab" $active={state.mode === 'and'} aria-selected={state.mode === 'and'} onClick={() => dispatch({ type: 'setMode', mode: 'and' })}>
            AND
          </ControlButton>
          <ControlButton type="button" role="tab" $active={state.mode === 'or'} aria-selected={state.mode === 'or'} onClick={() => dispatch({ type: 'setMode', mode: 'or' })}>
            OR
          </ControlButton>
        </MatchModeToggle>
      )}
    </Controls>
  );
}

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

const MatchModeToggle = styled(ToggleGroup)`
  margin-left: 0.5rem;

  ${mq.sm} {
    display: none;
  }
`;
