import About from "@/pages/About";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition key={location.pathname}><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition key={location.pathname}><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition key={location.pathname}><Projects /></PageTransition>} />
        <Route path="*" element={<PageTransition key={location.pathname}><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes
