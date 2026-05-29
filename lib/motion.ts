/** Shared Framer Motion presets — luxury easing */
export const easeLuxury = [0.16, 1, 0.3, 1] as const;
export const easeOutSoft = [0.22, 1, 0.36, 1] as const;

/** Desktop — scroll reveal (opacity + transform only; no filter blur) */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeLuxury },
  },
};

/** Mobile / touch — GPU-only, shorter */
export const fadeUpLite = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOutSoft },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutSoft },
  },
};

export const fadeInLite = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: easeOutSoft },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.06) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerContainerLite = (stagger = 0.05, delayChildren = 0.04) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: easeLuxury },
  },
};

export const fadeUpSoft = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutSoft },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeLuxury },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.5, ease: easeLuxury },
};

export const pageTransitionLite = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.28, ease: easeOutSoft },
};

export function pickFadeUp(lite: boolean) {
  return lite ? fadeUpLite : fadeUp;
}

export function pickStagger(lite: boolean, stagger = 0.08, delay = 0.06) {
  return lite ? staggerContainerLite(0.05, 0.04) : staggerContainer(stagger, delay);
}
