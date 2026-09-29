/**
 * Ordered route table shared by AppRoutes, Navbar and swipe/keyboard navigation.
 * The array order defines the left/right navigation sequence.
 */
export interface IRouteEntry {
  readonly path: string;
  readonly label: string;
}

export const ROUTES: readonly IRouteEntry[] = [
  { path: '/', label: '홈' },
  { path: '/about', label: '소개' },
  { path: '/projects', label: '프로젝트' },
];

export const ROUTE_PATHS: readonly string[] = ROUTES.map((route) => route.path);
