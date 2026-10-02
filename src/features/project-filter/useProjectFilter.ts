import { useCallback, useMemo, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { IProject } from '@/data/schema';
import {
  compareByRelease,
  matchesCriteria,
  withFrameNumbers,
  type IFramedProject,
  type IProjectFilterCriteria,
} from '@/model/project';
import {
  INITIAL_FILTER_STATE,
  filterReducer,
  parseTechParam,
  type FilterAction,
  type IFilterState,
} from './filterReducer';

interface IUseProjectFilterOptions {
  /** Small screens hide the AND/OR toggle and always match with AND. */
  readonly forceAndMode: boolean;
}

export interface IProjectFilter {
  readonly state: IFilterState;
  readonly dispatch: (action: FilterAction) => void;
  /** Filters carried by the URL, set from About page links. */
  readonly url: { readonly language: string; readonly techs: readonly string[]; readonly agency: string };
  readonly clearAgency: () => void;
  readonly visible: readonly IFramedProject[];
}

/**
 * Combines UI filter state with URL-carried filters and returns the visible,
 * sorted project list with its original frame numbers.
 */
export function useProjectFilter(
  projects: readonly IProject[],
  { forceAndMode }: IUseProjectFilterOptions,
): IProjectFilter {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(filterReducer, INITIAL_FILTER_STATE);

  const language = searchParams.get('lang') ?? '';
  const techParam = searchParams.get('tech');
  const agency = searchParams.get('agency') ?? '';
  const urlTechs = useMemo(() => parseTechParam(techParam), [techParam]);

  const clearAgency = useCallback(() => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.delete('agency');
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const criteria: IProjectFilterCriteria = useMemo(
    () => ({
      query: state.query,
      status: state.status,
      language,
      agency,
      techs: [...urlTechs, ...state.activeTechs],
      mode: forceAndMode ? 'and' : state.mode,
    }),
    [state.query, state.status, state.activeTechs, state.mode, language, agency, urlTechs, forceAndMode],
  );

  const framed = useMemo(() => withFrameNumbers(projects), [projects]);
  const visible = useMemo(() => {
    const compare = compareByRelease(state.sort);
    return [...framed]
      .sort((a, b) => compare(a.project, b.project))
      .filter((frame) => matchesCriteria(frame.project, criteria));
  }, [framed, state.sort, criteria]);

  return {
    state,
    dispatch,
    url: { language, techs: urlTechs, agency },
    clearAgency,
    visible,
  };
}
