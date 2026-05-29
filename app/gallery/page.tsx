import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import RevealOnScroll from "../components/RevealOnScroll";
import ReserveTableLink from "../components/ReserveTableLink";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";
import {
  ambienceGalleryItems,
  foodGalleryItems,
  withAmbienceGallerySpans,
  withFoodGallerySpans,
} from "@/lib/gallery-items";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Moments that linger — explore rooftop ambience and food photography at Fernway by Stories, Mayaganahalli, Bengaluru.",
  path: "/gallery",
  image: "/ambience/3.webp",
  imageAlt: "Gallery of Fernway by Stories rooftop and kitchen",
  keywords: ["Fernway photos", "rooftop gallery Bengaluru", "restaurant ambience Bangalore"],
});

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-hidden">
        <PageHero label="Moments That Linger" title="Gallery" />

        <section className="gallery-page-intro">
          <RevealOnScroll>
            <div className="section-wrap gallery-page-intro-inner">
              <div className="divider mx-auto" />
              <p className="section-label">The Experience</p>
              <h2 className="heading-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                A glimpse of <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Fernway</em>
              </h2>
              <p className="body-text" style={{ maxWidth: "48ch" }}>
                Rooftop ambience and plates from the kitchen — explore the full collection below.
              </p>
            </div>
          </RevealOnScroll>
        </section>

        <InteractiveImageBentoGallery
          title="Ambience"
          description="Open sky, warm light, and the energy of Bengaluru after dark."
          imageItems={withAmbienceGallerySpans(ambienceGalleryItems)}
          variant="cream"
          eagerCount={4}
        />

        <InteractiveImageBentoGallery
          title="Food & Drinks"
          description="Globally inspired comfort — from small plates to late-night bites."
          imageItems={withFoodGallerySpans(foodGalleryItems)}
          variant="sand"
          eagerCount={0}
        />

        <section className="gallery-page-cta">
          <div className="section-wrap flex flex-col items-center text-center gap-8">
            <RevealOnScroll>
              <div className="divider-dark mx-auto" />
              <h2
                className="heading-display"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-dark)" }}
              >
                See it for <em style={{ color: "var(--gold)", fontStyle: "italic" }}>yourself</em>
              </h2>
              <p className="body-text mx-auto" style={{ maxWidth: "44ch", color: "rgba(242,237,228,0.55)" }}>
                Reserve your table and experience the rooftop in person.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <ReserveTableLink className="btn-gold">
                  Reserve a Table
                </ReserveTableLink>
                <Link href="/about" className="btn-ghost">
                  The Fernway Experience
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
