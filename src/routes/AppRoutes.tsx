import About from "@/pages/About";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes
