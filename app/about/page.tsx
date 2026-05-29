import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import RevealOnScroll from "../components/RevealOnScroll";
import ReserveTableLink from "../components/ReserveTableLink";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "The Fernway Experience",
  description:
    "Discover the story behind Fernway by Stories — a rooftop lounge in Bengaluru built for unhurried evenings, thoughtful food, and nature-inspired ambience.",
  path: "/about",
  image: "/ambience/2.webp",
  imageAlt: "Fernway by Stories rooftop ambience, Bengaluru",
  keywords: ["about Fernway", "rooftop lounge story", "Fernway experience Bengaluru"],
});

const philosophy = [
  "Nature-inspired rooftop ambience",
  "Comfort-driven global menu",
  "Music that enhances, never overwhelms",
  "Service that feels warm and personal",
];

const dayFlow = [
  { label: "Afternoon", desc: "Soft light, quiet corners, and a gentle start above the city." },
  { label: "Evening", desc: "The rooftop comes alive — music, plates, and the first toast." },
  { label: "Late Night", desc: "Unhurried hours under the sky until the city sleeps below." },
];

const spacePhotos = [
  { label: "The rooftop deck", src: "/ambience/3.webp", featured: true },
  { label: "Bar & lounge", src: "/ambience/4.webp", featured: false },
  { label: "Private corners", src: "/ambience/5.webp", featured: false },
] as const;

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero label="The Fernway Experience" title="About" />

        <section className="section-bg-cream">
          <div className="section-wrap section-pad grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealOnScroll>
              <div className="relative img-overlay" style={{ aspectRatio: "3/4", border: "1px solid var(--border-light)" }}>
                <Image
                  src="/ambience/2.webp"
                  alt="Fernway by Stories rooftop ambience"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,17,13,0.45) 0%, transparent 55%)" }} />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <div className="flex flex-col gap-6">
                <div className="divider" />
                <p className="section-label">Our Story</p>
                <h2 className="heading-display" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                  A rooftop lounge shaped by{" "}
                  <em style={{ color: "var(--gold)", fontStyle: "italic" }}>stories</em>
                </h2>
                <p className="body-text">
                Fernway was envisioned as a modern rooftop retreat — inspired by nature, designed for
connection, and rooted in the Stories hospitality ethos. A place where guests can step away
from the pace of the city and enjoy meaningful moments over food, drinks, and conversation.
                </p>
                <p className="body-text">
                  Every detail — from the greenery and warm light to the menu and music — is designed so you can
                  arrive, unwind, and leave with moments that linger.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="section-bg-sand">
          <div className="section-wrap section-pad">
            <RevealOnScroll>
              <div className="about-philosophy">
                <header className="about-philosophy-intro">
                  <div className="divider" />
                  <p className="section-label">Philosophy</p>
                  <h2 className="heading-display about-philosophy-title">
                    Thoughtfully <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Crafted</em>
                  </h2>
                  <p className="body-text about-philosophy-lead">
                    Our kitchen and bar share one approach: global comfort food and drinks that feel familiar yet
                    considered — nothing fussy, everything intentional.
                  </p>
                </header>
                <ul className="about-philosophy-list">
                  {philosophy.map((item) => (
                    <li key={item}>
                      <span className="about-philosophy-marker" aria-hidden="true">
                        ◈
                      </span>
                      <span className="body-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="about-space-section section-bg-cream">
          <div className="section-wrap section-pad">
            <div className="about-space">
              <RevealOnScroll>
                <header className="about-space-intro">
                  <div className="divider" />
                  <p className="section-label">The Space</p>
                  <h2 className="heading-display about-space-title">
                    Designed for <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Every Mood</em>
                  </h2>
                  <p className="body-text about-space-lead">
                    Fernway evolves with the hours — calm afternoons, golden sunsets, and softly energized nights.
                    Intimate seating, open views, and warm lighting create a setting that adapts effortlessly to
                    every mood.
                  </p>
                </header>
              </RevealOnScroll>

              <RevealOnScroll delay={80}>
                <div className="about-space-timeline" role="list" aria-label="How the space changes through the day">
                  {dayFlow.map(({ label, desc }, i) => (
                    <article key={label} className="about-space-moment" role="listitem">
                      <span className="about-space-moment-time">{label}</span>
                      <p className="about-space-moment-desc">{desc}</p>
                      {i < dayFlow.length - 1 ? (
                        <span className="about-space-moment-connector" aria-hidden="true" />
                      ) : null}
                    </article>
                  ))}
                </div>
              </RevealOnScroll>

              {/* <div className="about-space-bento">
                {spacePhotos.map(({ label, src, featured }, i) => (
                  <RevealOnScroll key={label} delay={120 + i * 90}>
                    <figure
                      className={`about-space-figure img-overlay ${featured ? "about-space-figure--featured" : ""}`}
                    >
                      <Image
                        src={src}
                        alt={`Fernway — ${label}`}
                        fill
                        className="object-cover about-space-figure-img"
                        sizes={
                          featured
                            ? "(max-width: 899px) 100vw, 58vw"
                            : "(max-width: 899px) 100vw, 42vw"
                        }
                      />
                      <figcaption className="about-space-figure-caption">
                        <span className="about-space-figure-label">{label}</span>
                      </figcaption>
                    </figure>
                  </RevealOnScroll>
                ))}
              </div> */}
            </div>
          </div>
        </section>

        <section className="section-bg-dark">
          <div className="section-wrap section-pad flex flex-col items-center text-center gap-8">
            <RevealOnScroll>
              <h2 className="heading-display" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--text-dark)" }}>
                Come see it for <em style={{ color: "var(--gold)", fontStyle: "italic" }}>yourself</em>
              </h2>
              <div className="flex gap-5 flex-wrap justify-center">
                <ReserveTableLink className="btn-gold">
                  Reserve a Table
                </ReserveTableLink>
                <Link href="/menu" className="btn-ghost">
                  View Menu
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
