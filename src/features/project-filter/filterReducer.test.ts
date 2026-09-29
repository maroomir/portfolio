import { describe, expect, it } from 'vitest';
import { INITIAL_FILTER_STATE, filterReducer, parseTechParam } from './filterReducer';

describe('filterReducer', () => {
  it('toggles techs on and off without mutating previous state', () => {
    const on = filterReducer(INITIAL_FILTER_STATE, { type: 'toggleTech', tech: 'ROS2' });
    expect(on.activeTechs).toEqual(['ROS2']);
    expect(INITIAL_FILTER_STATE.activeTechs).toEqual([]);
    const off = filterReducer(on, { type: 'toggleTech', tech: 'ROS2' });
    expect(off.activeTechs).toEqual([]);
  });

  it('clears techs but keeps the other fields', () => {
    const state = { ...INITIAL_FILTER_STATE, query: 'x', activeTechs: ['a', 'b'] };
    expect(filterReducer(state, { type: 'clearTechs' })).toEqual({ ...state, activeTechs: [] });
  });

  it('sets scalar fields', () => {
    const state = filterReducer(INITIAL_FILTER_STATE, { type: 'setStatus', status: 'public' });
    expect(filterReducer(state, { type: 'setSort', sort: 'oldest' })).toMatchObject({ status: 'public', sort: 'oldest' });
  });
});

describe('parseTechParam', () => {
  it('splits on commas and decodes each entry', () => {
    expect(parseTechParam('ROS2,Open%20CV')).toEqual(['ROS2', 'Open CV']);
    expect(parseTechParam(null)).toEqual([]);
    expect(parseTechParam('')).toEqual([]);
  });
});
