"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LOGO } from "@/lib/favicons";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BUSINESS } from "@/lib/site";
import { easeLuxury, easeOutSoft, pickFadeUp, pickStagger } from "@/lib/motion";
import { useLiteMotion } from "@/lib/use-lite-motion";
import ReserveTableLink from "./ReserveTableLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenPath(next ? pathname : null),
    [pathname],
  );
  const reduced = useReducedMotion();
  const lite = useLiteMotion();

  const drawerVariants = {
    closed: { x: "-100%" },
    open: {
      x: 0,
      transition: { duration: lite ? 0.32 : 0.55, ease: lite ? easeOutSoft : easeLuxury },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: lite ? 0.22 : 0.4 } },
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <header className="nav-bar fixed top-0 left-0 right-0 z-50">
        <div className="nav-inner">
          <div className="nav-inner-side nav-inner-side--start">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="nav-menu-btn"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <Link href="/" className="nav-logo-link" aria-label="Fernway by Stories">
            <div className="nav-logo">
              <Image
                src={NAV_LOGO}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 768px) 6.5rem, 9.25rem"
                priority
              />
            </div>
          </Link>

          <div className="nav-inner-side nav-inner-side--end">
            <ReserveTableLink className="nav-reserve">Reserve</ReserveTableLink>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex"
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <motion.aside
              className="nav-drawer-panel"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <header className="nav-drawer-header">
                <p className="section-label" style={{ margin: 0 }}>
                  Navigate
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="nav-drawer-close"
                  aria-label="Close menu"
                >
                  Close
                </button>
              </header>

              <motion.nav
                className="nav-drawer-links"
                aria-label="Main"
                variants={reduced ? undefined : pickStagger(lite, 0.06, 0.12)}
                initial={reduced ? false : "hidden"}
                animate={reduced ? false : "visible"}
              >
                {links.map(({ href, label }) => (
                  <motion.div key={href} variants={reduced ? undefined : pickFadeUp(lite)}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`nav-drawer-link ${pathname === href ? "is-active" : ""}`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <footer className="nav-drawer-footer">
                <div className="nav-drawer-meta">
                  <span className="nav-drawer-meta-label">Hours</span>
                  <span className="nav-drawer-meta-value">{BUSINESS.hours}</span>
                </div>
                <div className="nav-drawer-meta">
                  <span className="nav-drawer-meta-label">Call</span>
                  <a href={`tel:${BUSINESS.phone}`} className="nav-drawer-meta-value">
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
                <ReserveTableLink
                  onClick={() => setOpen(false)}
                  className="nav-drawer-cta"
                >
                  Reserve a Table
                </ReserveTableLink>
              </footer>
            </motion.aside>

            <motion.button
              type="button"
              className="nav-drawer-overlay flex-1 h-full border-0 cursor-default"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
