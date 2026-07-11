"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeLuxury, easeOutSoft } from "@/lib/motion";
import { useLiteMotion } from "@/lib/use-lite-motion";

type PageHeroProps = {
  label: string;
  title: string;
};

export default function PageHero({ label, title }: PageHeroProps) {
  const reduced = useReducedMotion();
  const lite = useLiteMotion();

  return (
    <section className="page-hero relative flex flex-col items-center justify-end overflow-hidden text-center">
      <motion.div
        className="relative z-[1] flex flex-col items-center gap-4 px-6 pb-2"
        initial={reduced ? false : { opacity: 0, y: lite ? 12 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: lite ? 0.45 : 0.85,
          ease: lite ? easeOutSoft : easeLuxury,
        }}
      >
        <div className="divider mx-auto" style={{ opacity: 0.85 }} />
        <p className="section-label page-hero-label">{label}</p>
        <h1 className="page-hero-title">{title}</h1>
      </motion.div>
    </section>
  );
}
