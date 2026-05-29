import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import RevealOnScroll from "../components/RevealOnScroll";
import EventEnquiryForm from "./EventEnquiryForm";
import { createPageMetadata } from "@/lib/seo";
import {
  EVENTS_OVERVIEW_HEADLINE,
  EVENTS_OVERVIEW_INTRO,
  eventTypes,
  PRIVATE_DINING_INTRO,
} from "@/lib/events-data";

export const metadata: Metadata = createPageMetadata({
  title: "Events & Private Dining",
  description:
    "Evenings at Fernway — DJ nights, themed evenings, weekend sessions, and private celebrations on our Bengaluru rooftop. Submit an event enquiry online.",
  path: "/events",
  image: "/ambience/6.webp",
  imageAlt: "Events and private dining at Fernway by Stories rooftop",
  keywords: ["rooftop events Bengaluru", "private dining Bangalore", "DJ lounge Mayaganahalli"],
});

export default function EventsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero label="Events & Private Dining" title="Events" />

        {/* Section 1: Events overview */}
        <section className="events-overview section-bg-cream" aria-labelledby="events-overview-heading">
          <div className="section-wrap section-pad">
            <RevealOnScroll>
              <header className="events-overview-intro">
                <div className="divider" />
                <p className="section-label">Experiences</p>
                <h2 id="events-overview-heading" className="heading-display events-overview-title">
                  {EVENTS_OVERVIEW_HEADLINE}
                </h2>
                <p className="body-text events-overview-lead">{EVENTS_OVERVIEW_INTRO}</p>
              </header>
            </RevealOnScroll>

            <div className="events-cards-grid">
              {eventTypes.map((evt, i) => (
                <RevealOnScroll key={evt.id} delay={i * 80}>
                  <article className="events-card gallery-card img-overlay">
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      className="object-cover events-card-img"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="events-card-caption">
                      <h3 className="events-card-title">{evt.title}</h3>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Private dining */}
        <section className="events-private section-bg-sand" aria-labelledby="events-private-heading">
          <div className="section-wrap section-pad">
            <div className="events-private-grid">
              <RevealOnScroll>
                <div className="events-private-copy">
                  <div className="divider" />
                  <p className="section-label">Private Dining &amp; Celebrations</p>
                  <h2 id="events-private-heading" className="heading-display events-private-title">
                    Celebrate <em style={{ color: "var(--gold)", fontStyle: "italic" }}>With Us</em>
                  </h2>
                  <p className="body-text events-private-lead">{PRIVATE_DINING_INTRO}</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={120}>
                <figure className="events-private-photo img-overlay">
                  <Image
                    src="/ambience/10.webp"
                    alt="Private dining and celebrations at Fernway"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,17,13,0.5) 0%, transparent 55%)",
                    }}
                  />
                </figure>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Section 3: Enquiry form */}
        <section className="events-enquiry section-bg-dark" aria-labelledby="events-enquiry-heading">
          <div className="section-wrap section-pad">
            <div className="events-enquiry-layout">
              <RevealOnScroll>
                <div className="events-enquiry-intro">
                  <p className="section-label">Enquiries</p>
                  <h2
                    id="events-enquiry-heading"
                    className="heading-display events-enquiry-title"
                  >
                    Plan your <em style={{ color: "var(--gold)", fontStyle: "italic" }}>event</em>
                  </h2>
                  <p className="events-enquiry-lead">
                    Share your date, guest count, and vision — our team will respond within 24 hours.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={100}>
                <EventEnquiryForm />
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
