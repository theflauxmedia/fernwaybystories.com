"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { ImageItem } from "@/components/ui/bento-gallery";
import { easeLuxury, easeOutSoft, fadeUpLite, fadeUpSoft, pickStagger } from "@/lib/motion";
import { useLiteMotion } from "@/lib/use-lite-motion";

type HomeGalleryPreviewProps = {
  imageItems: ImageItem[];
  label?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function HomeGalleryPreview({
  imageItems,
  label = "Gallery",
  title = "Moments That Linger",
  description = "",
  ctaHref = "/gallery",
  ctaLabel = "View Full Gallery",
}: HomeGalleryPreviewProps) {
  const [selected, setSelected] = useState<ImageItem | null>(null);
  const lite = useLiteMotion();
  const reduced = useReducedMotion();

  const itemVariants = lite ? fadeUpLite : fadeUpSoft;

  return (
    <section className="home-bento-section section-bg-cream border-t border-[color-mix(in_srgb,var(--gold)_12%,transparent)] overflow-x-hidden">
      <div className="section-wrap home-bento-inner">
        <motion.header
          className="home-bento-intro"
          initial={reduced ? false : { opacity: 0, y: lite ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: lite ? 0.15 : 0.4 }}
          transition={{ duration: lite ? 0.4 : 0.75, ease: lite ? easeOutSoft : easeLuxury }}
        >
          <div className="divider" />
          <p className="section-label">{label}</p>
          <h2 className="home-bento-intro-title">{title}</h2>
          {description ? <p className="home-bento-intro-desc">{description}</p> : null}
        </motion.header>

        {reduced ? (
          <div className="home-bento-grid">
            {imageItems.map((item, i) => (
              <div
                key={item.id}
                className={i === 0 ? "home-bento-item home-bento-item--featured" : "home-bento-item"}
              >
                <button
                  type="button"
                  className="gallery-card group relative h-full w-full min-h-0 cursor-pointer overflow-hidden rounded-sm border border-[rgba(var(--gold-rgb),0.14)] bg-[#faf6ed] text-left"
                  onClick={() => setSelected(item)}
                  aria-label={`View ${item.title}`}
                >
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="gallery-card-img object-cover"
                    sizes={i === 0 ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 50vw, 33vw"}
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                  <div className="gallery-card-caption gallery-card-caption--compact">
                    <h3 className="gallery-card-title">{item.title}</h3>
                    <p className="gallery-card-desc">{item.desc}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
        <motion.div
          className="home-bento-grid"
          variants={pickStagger(lite, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: lite ? 0.06 : 0.12 }}
        >
          {imageItems.map((item, i) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={i === 0 ? "home-bento-item home-bento-item--featured" : "home-bento-item"}
            >
              <button
                type="button"
                className="gallery-card group relative h-full w-full min-h-0 cursor-pointer overflow-hidden rounded-sm border border-[rgba(var(--gold-rgb),0.14)] bg-[#faf6ed] text-left"
                onClick={() => setSelected(item)}
                aria-label={`View ${item.title}`}
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="gallery-card-img object-cover"
                  sizes={i === 0 ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 50vw, 33vw"}
                  loading={i < 2 ? "eager" : "lazy"}
                />
                <div className="gallery-card-caption gallery-card-caption--compact">
                  <h3 className="gallery-card-title">{item.title}</h3>
                  <p className="gallery-card-desc">{item.desc}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
        )}

        <div className="home-bento-footer">
          {ctaHref && ctaLabel ? (
            <Link href={ctaHref} className="btn-dark inline-flex">
              {ctaLabel}
            </Link>
          ) : null}
          <p className="home-bento-hint">
            Click any image to expand ·{" "}
            <Link href="/gallery" className="underline-offset-4 hover:underline">
              View full gallery
            </Link>
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gallery-lightbox fixed inset-0 z-[70] flex items-center justify-center bg-[var(--bg-dark-deep)]/92 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: lite ? 0.98 : 0.92, y: lite ? 8 : 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: lite ? 0.98 : 0.92, y: lite ? 8 : 24 }}
              transition={{ duration: lite ? 0.22 : 0.35 }}
              className="relative h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.url}
                alt={selected.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/40 p-2 text-white/90"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
