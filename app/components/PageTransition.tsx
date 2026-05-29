"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pageTransition, pageTransitionLite } from "@/lib/motion";
import { useLiteMotion } from "@/lib/use-lite-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const lite = useLiteMotion();

  if (reduced) {
    return <>{children}</>;
  }

  const variant = lite ? pageTransitionLite : pageTransition;

  if (lite) {
    return <div className="page-transition-root">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="page-transition-root" {...variant}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
