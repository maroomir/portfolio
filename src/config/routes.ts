import { siteConfig } from './site.config';

/**
 * Ordered route table derived from site.config pages.
 * Shared by AppRoutes, Navbar and swipe/keyboard navigation; the order defines the left/right sequence.
 */
export interface IRouteEntry {
  readonly path: string;
  readonly label: string;
}

export const ROUTES: readonly IRouteEntry[] = siteConfig.pages.map((page) => ({
  path: page.path,
  label: page.navLabel,
}));

export const ROUTE_PATHS: readonly string[] = ROUTES.map((route) => route.path);
