"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pickFadeUp, pickStagger } from "@/lib/motion";
import { useLiteMotion } from "@/lib/use-lite-motion";
import { cn } from "@/lib/utils";

type RevealOnScrollProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Stagger direct children */
  stagger?: boolean;
  amount?: number;
};

export default function RevealOnScroll({
  children,
  delay = 0,
  className,
  stagger = false,
  amount = 0.12,
}: RevealOnScrollProps) {
  const reduced = useReducedMotion();
  const lite = useLiteMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const viewportAmount = lite ? Math.min(amount, 0.08) : amount;
  const margin = lite ? "0px 0px -4% 0px" : "0px 0px -8% 0px";

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount, margin }}
      variants={stagger ? pickStagger(lite, 0.1, delay / 1000) : pickFadeUp(lite)}
      transition={stagger ? undefined : { delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const lite = useLiteMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div variants={pickFadeUp(lite)} className={className}>
      {children}
    </motion.div>
  );
}
