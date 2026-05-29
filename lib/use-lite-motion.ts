"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

/** Mobile / touch viewports — lighter animations, no blur, native scroll */
export function getLiteMotionMediaQuery() {
  return "(prefers-reduced-motion: reduce), (max-width: 1023px), (pointer: coarse)";
}

export function matchesLiteMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(getLiteMotionMediaQuery()).matches;
}

function subscribeLiteMotion(onStoreChange: () => void) {
  const mq = window.matchMedia(getLiteMotionMediaQuery());
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getLiteMotionSnapshot() {
  return matchesLiteMotion();
}

function getLiteMotionServerSnapshot() {
  return false;
}

export function useLiteMotion() {
  const reduced = useReducedMotion();
  const lite = useSyncExternalStore(
    subscribeLiteMotion,
    getLiteMotionSnapshot,
    getLiteMotionServerSnapshot,
  );

  return Boolean(reduced) || lite;
}
