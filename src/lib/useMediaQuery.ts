import { useEffect, useState } from 'react';

/** True while the CSS media query matches; false during SSR or when matchMedia is unavailable. */
export function useMediaQuery(query: string): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => setIsMatch(event.matches);
    setIsMatch(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return isMatch;
}
