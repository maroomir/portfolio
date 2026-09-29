import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import NotFound from '@/pages/NotFound';
import { siteConfig } from '@/config/site.config';
import { Page } from './Page';

/** One route per site.config page plus the 404 fallback, each wrapped in the page transition. */
function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {siteConfig.pages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={
              <PageTransition key={location.pathname}>
                <Page spec={page} />
              </PageTransition>
            }
          />
        ))}
        <Route
          path="*"
          element={
            <PageTransition key={location.pathname}>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
