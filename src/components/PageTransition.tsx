import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * PageTransition
 * - Wrap each page with this component to enable enter/exit animations.
 * - Simple horizontal slide + fade (320ms).
 *
 * Usage:
 * <AnimatePresence exitBeforeEnter>
 *   <PageTransition key={location.pathname}>
 *     <YourPage />
 *   </PageTransition>
 * </AnimatePresence>
 */

const variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

type Props = {
  children: ReactNode;
  // optional override
  duration?: number;
};

export default function PageTransition({ children, duration = 0.32 }: Props) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, ease: "easeOut" }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
