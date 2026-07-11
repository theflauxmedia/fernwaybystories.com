"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLiteMotion } from "@/lib/use-lite-motion";

export type ImageItem = {
  id: number | string;
  title: string;
  desc: string;
  url: string;
  span: string;
};

export interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[];
  title?: string;
  description?: string;
  className?: string;
  variant?: "cream" | "sand";
  /** Eager-load first N images in this section */
  eagerCount?: number;
}

function ImageModal({ item, onClose }: { item: ImageItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="gallery-lightbox fixed inset-0 z-[70] flex items-center justify-center bg-[var(--bg-dark-deep)]/92 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.url}
          alt={item.title}
          width={1600}
          height={1200}
          className="max-h-[90vh] h-auto w-full rounded-sm border border-[rgba(var(--gold-rgb),0.2)] object-contain"
          sizes="100vw"
          priority
        />
      </motion.div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/50 p-2.5 text-white/90 transition-colors hover:bg-black/70"
        aria-label="Close image view"
      >
        <X size={28} />
      </button>
    </motion.div>
  );
}

function BentoTile({
  item,
  index,
  eager,
  lite,
  onSelect,
}: {
  item: ImageItem;
  index: number;
  eager?: boolean;
  lite: boolean;
  onSelect: (item: ImageItem) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(Boolean(eager));

  useEffect(() => {
    if (load) return;
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [load]);

  return (
    <motion.div
      ref={rootRef}
      role="button"
      tabIndex={0}
      whileHover={lite ? undefined : { scale: 1.012 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className={cn("gallery-bento-tile", item.span)}
      aria-label={`View photo ${index + 1}`}
    >
      {load ? (
        <Image
          src={item.url}
          alt={item.title}
          fill
          className="gallery-bento-tile-img object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          loading={eager ? "eager" : "lazy"}
        />
      ) : (
        <div className="gallery-bento-tile-placeholder" aria-hidden="true" />
      )}
    </motion.div>
  );
}

/** Vertical bento grid — use on /gallery only */
export default function InteractiveImageBentoGallery({
  imageItems,
  title,
  description,
  className,
  variant = "cream",
  eagerCount = 2,
}: InteractiveImageBentoGalleryProps) {
  const showHeader = Boolean(title || description);
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);
  const lite = useLiteMotion();

  return (
    <section
      className={cn(
        "gallery-bento-section w-full overflow-x-hidden",
        variant === "sand" ? "gallery-bento-section--sand" : "gallery-bento-section--cream",
        className,
      )}
      aria-label={title ?? "Gallery"}
    >
      <div className="section-wrap gallery-bento-wrap">
        {showHeader ? (
          <header className="gallery-bento-header">
            {title ? <h2 className="gallery-bento-heading">{title}</h2> : null}
            {description ? <p className="gallery-bento-lead">{description}</p> : null}
          </header>
        ) : null}

        <div className="gallery-bento-grid">
          {imageItems.map((item, i) => (
            <BentoTile
              key={item.id}
              item={item}
              index={i}
              eager={i < eagerCount}
              lite={lite}
              onSelect={setSelectedItem}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
