/** Generic counting/grouping helpers shared by the domain selectors. */

export type CountMap = ReadonlyMap<string, number>;

export function countBy<T>(items: readonly T[], keyOf: (item: T) => string | undefined): CountMap {
  const counts = new Map<string, number>();
  for (const item of items) {
    const key = keyOf(item);
    if (!key) {
      continue;
    }
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

export function groupBy<T>(
  items: readonly T[],
  keyOf: (item: T) => string | undefined,
): ReadonlyMap<string, readonly T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = keyOf(item);
    if (!key) {
      continue;
    }
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(key, [item]);
    }
  }
  return groups;
}

/** Keys ordered by descending count; ties keep insertion order. */
export function rankTop(counts: CountMap, limit: number): string[] {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => key);
}

/** Reorder `items` by descending usage count, keeping the original order for ties. */
export function orderByUsage(items: readonly string[], counts: CountMap): string[] {
  return items
    .map((item, index) => ({ item, index, count: counts.get(item) ?? 0 }))
    .sort((a, b) => b.count - a.count || a.index - b.index)
    .map((entry) => entry.item);
}
