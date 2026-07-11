"use client";

import { useEffect, useRef } from "react";

const MIN_STRENGTH = 0.5;
const FADE_RATIO = 0.8;

function getTintStrength(hero: HTMLElement) {
  const rect = hero.getBoundingClientRect();
  const fadeDistance = hero.offsetHeight * FADE_RATIO;
  const scrolled = Math.max(0, -rect.top);
  const progress = Math.min(1, scrolled / fadeDistance);
  return 1 - progress * (1 - MIN_STRENGTH);
}

export default function HeroScrollOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const hero = overlay.closest(".hero-section");
    if (!(hero instanceof HTMLElement)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const strength = reducedMotion.matches ? 1 : getTintStrength(hero);
        overlay.style.setProperty("--hero-tint-strength", String(strength));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    reducedMotion.addEventListener("change", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return <div ref={overlayRef} className="hero-bg-overlay" aria-hidden="true" />;
}
