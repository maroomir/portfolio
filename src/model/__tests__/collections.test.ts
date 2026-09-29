import { describe, expect, it } from 'vitest';
import { countBy, groupBy, orderByUsage, rankTop } from '../collections';

describe('collections', () => {
  it('countBy skips empty keys and counts occurrences', () => {
    const counts = countBy(['a', 'b', 'a', undefined, ''], (v) => v);
    expect([...counts.entries()]).toEqual([['a', 2], ['b', 1]]);
  });

  it('groupBy preserves item order inside each bucket', () => {
    const groups = groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? 'even' : 'odd'));
    expect(groups.get('odd')).toEqual([1, 3]);
    expect(groups.get('even')).toEqual([2, 4]);
  });

  it('rankTop orders by count desc and keeps insertion order on ties', () => {
    const counts = new Map([['x', 1], ['y', 3], ['z', 1]]);
    expect(rankTop(counts, 2)).toEqual(['y', 'x']);
    expect(rankTop(counts, 10)).toEqual(['y', 'x', 'z']);
  });

  it('orderByUsage sorts by count then original index', () => {
    const counts = new Map([['b', 2], ['c', 2]]);
    expect(orderByUsage(['a', 'b', 'c'], counts)).toEqual(['b', 'c', 'a']);
  });
});
