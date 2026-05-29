"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RevealOnScroll from "../components/RevealOnScroll";
import ReserveTableLink from "../components/ReserveTableLink";
import { MENU_INTRO, menuCategories, type Diet } from "@/lib/menu-data";
import { easeLuxury, easeOutSoft } from "@/lib/motion";
import { useLiteMotion } from "@/lib/use-lite-motion";

function DietBadge({ diet }: { diet: Diet }) {
  if (diet === "both") return null;

  const isVeg = diet === "v";
  return (
    <span
      className={`menu-diet-badge ${isVeg ? "menu-diet-badge--v" : "menu-diet-badge--nv"}`}
      title={isVeg ? "Vegetarian" : "Non-vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      {isVeg ? "V" : "NV"}
    </span>
  );
}

export default function MenuTabs() {
  const [active, setActive] = useState(menuCategories[0].id);
  const current = menuCategories.find((c) => c.id === active)!;
  const lite = useLiteMotion();

  return (
    <>
      <section className="section-bg-cream menu-intro-section">
        <div className="section-wrap section-pad-sm">
          <RevealOnScroll>
            <div className="menu-intro">
              <div className="divider" />
              <p className="section-label">Our Menu</p>
              <p className="body-text menu-intro-lead">{MENU_INTRO}</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-bg-sand menu-list-section">
        <div className="section-wrap menu-list-wrap">
          <div className="menu-tabs-row" role="tablist" aria-label="Menu categories">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active === cat.id}
                aria-controls={`menu-panel-${cat.id}`}
                id={`menu-tab-${cat.id}`}
                onClick={() => setActive(cat.id)}
                className={`menu-tab ${active === cat.id ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              id={`menu-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`menu-tab-${current.id}`}
              className="menu-panel"
              initial={{ opacity: 0, y: lite ? 6 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: lite ? -4 : -8 }}
              transition={{ duration: lite ? 0.22 : 0.4, ease: lite ? easeOutSoft : easeLuxury }}
            >
              <p className="menu-panel-label section-label">{current.label}</p>
              <ul className="menu-panel-list">
                {current.items.map((item) => (
                  <li key={item.name} className="menu-item">
                    <div className="menu-item-heading">
                      <h3 className="menu-item-name">{item.name}</h3>
                      <DietBadge diet={item.diet} />
                    </div>
                    <p className="menu-item-desc">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <p className="menu-list-footnote">
            Menu subject to seasonal availability · <span className="menu-diet-legend-v">V</span> Vegetarian ·{" "}
            <span className="menu-diet-legend-nv">NV</span> Non-vegetarian
          </p>
        </div>
      </section>

      <section className="section-bg-cream menu-cta-section">
        <div className="section-wrap menu-cta-inner flex flex-col items-center text-center">
          <RevealOnScroll>
            <div className="flex flex-col items-center gap-8">
              <h2 className="heading-display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                Ready to <em style={{ color: "var(--gold)", fontStyle: "italic" }}>dine?</em>
              </h2>
              <ReserveTableLink className="btn-dark">
                Reserve a Table
              </ReserveTableLink>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
