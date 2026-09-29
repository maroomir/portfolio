import type { ReleaseStatus } from '@/data/schema';
import type { MatchMode, SortOrder } from '@/model/project';

/** UI-owned filter state. URL-owned parts (lang, tech, agency) live in the search params. */
export interface IFilterState {
  readonly query: string;
  readonly status: ReleaseStatus | 'all';
  readonly sort: SortOrder;
  readonly mode: MatchMode;
  readonly activeTechs: readonly string[];
}

export type FilterAction =
  | { type: 'setQuery'; query: string }
  | { type: 'setStatus'; status: IFilterState['status'] }
  | { type: 'setSort'; sort: SortOrder }
  | { type: 'setMode'; mode: MatchMode }
  | { type: 'toggleTech'; tech: string }
  | { type: 'clearTechs' };

export const INITIAL_FILTER_STATE: IFilterState = {
  query: '',
  status: 'all',
  sort: 'newest',
  mode: 'and',
  activeTechs: [],
};

export function filterReducer(state: IFilterState, action: FilterAction): IFilterState {
  switch (action.type) {
    case 'setQuery':
      return { ...state, query: action.query };
    case 'setStatus':
      return { ...state, status: action.status };
    case 'setSort':
      return { ...state, sort: action.sort };
    case 'setMode':
      return { ...state, mode: action.mode };
    case 'toggleTech': {
      const isActive = state.activeTechs.includes(action.tech);
      const activeTechs = isActive
        ? state.activeTechs.filter((tech) => tech !== action.tech)
        : [...state.activeTechs, action.tech];
      return { ...state, activeTechs };
    }
    case 'clearTechs':
      return { ...state, activeTechs: [] };
  }
}

/** "a,b%2Cc" -> ['a', 'b,c']; an absent or empty param yields []. */
export function parseTechParam(raw: string | null): string[] {
  if (!raw) {
    return [];
  }
  return raw.split(',').map((tech) => decodeURIComponent(tech)).filter(Boolean);
}
