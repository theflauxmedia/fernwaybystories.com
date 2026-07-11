"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

function shouldDisableSmoothScroll() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  // Native touch scrolling is smoother on phones than Lenis + rAF loop
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (window.matchMedia("(max-width: 1023px)").matches) return true;
  return false;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (shouldDisableSmoothScroll()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      infinite: false,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const syncLock = () => {
      const locked = document.body.style.overflow === "hidden";
      if (locked) lenis.stop();
      else lenis.start();
    };

    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return children;
}
