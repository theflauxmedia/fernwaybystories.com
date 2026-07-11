import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import RevealOnScroll from "../components/RevealOnScroll";
import ContactForm from "./ContactForm";
import { createPageMetadata } from "@/lib/seo";
import PartnerBookingLinks from "../components/PartnerBookingLinks";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact & Reservations",
  description:
    "Reserve your table at Fernway by Stories, Mayaganahalli, Bengaluru. Open daily 1pm–6am. Call +91 96069 19636 or confirm your reservation online.",
  path: "/contact",
  image: "/ambience/1.webp",
  imageAlt: "Contact and reservations at Fernway by Stories",
  keywords: ["reserve table Fernway", "Fernway phone number", "open-air dining Bengaluru"],
});

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero label="Get in Touch" title="Contact" />

        <section className="section-bg-cream">
          <div className="section-wrap section-pad grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-3">
              <RevealOnScroll>
                <div className="flex flex-col gap-5 mb-12">
                  <div className="divider" />
                  <p className="section-label">Reservations</p>
                  <h2 className="heading-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                    Reserve Your Table
                  </h2>
                  <p className="body-text" style={{ maxWidth: "48ch" }}>
                    Share your details and we&apos;ll confirm your reservation. For events and private dining, visit our{" "}
                    <Link href="/events" style={{ color: "var(--gold)", textDecoration: "underline" }}>
                      events page
                    </Link>
                    .
                  </p>
                  <PartnerBookingLinks variant="light" />
                </div>
              </RevealOnScroll>
              <ContactForm />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-12">
              <RevealOnScroll delay={150}>
                <div className="flex flex-col gap-5">
                  <p className="section-label">Location</p>
                  <address className="not-italic body-text">
                    {BUSINESS.address.line1}
                    <br />
                    {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
                    <br />
                    {BUSINESS.address.country}
                  </address>
                  <a
                    href={BUSINESS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark"
                    style={{ alignSelf: "flex-start" }}
                  >
                    Open in Maps
                  </a>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="flex flex-col gap-4">
                  <p className="section-label">Hours</p>
                  <p className="body-text">{BUSINESS.hoursLong}</p>
                  <p className="heading-display" style={{ fontSize: "1.5rem" }}>
                    {BUSINESS.hoursDisplay}
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={250}>
                <div className="flex flex-col gap-4">
                  <p className="section-label">Contact</p>
                  <a href={`tel:${BUSINESS.phone}`} className="body-text hover:underline" style={{ color: "var(--text-light)" }}>
                    {BUSINESS.phoneDisplay}
                  </a>
                  <a
                    href={BUSINESS.whatsapp}
                    className="body-text hover:underline"
                    style={{ color: "var(--text-light)" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <div className="flex gap-4 pt-2">
                    <a
                      href={BUSINESS.social.instagram}
                      className="section-label hover:underline"
                      style={{ color: "var(--gold)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                    <a
                      href={BUSINESS.social.facebook}
                      className="section-label hover:underline"
                      style={{ color: "var(--gold)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className="section-bg-sand">
          <div className="section-wrap section-pad">
            <RevealOnScroll>
              <div className="relative w-full overflow-hidden" style={{ height: "360px", border: "1px solid var(--border-light)" }}>
                <iframe
                  src={BUSINESS.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "saturate(0.2) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Fernway by Stories location map"
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
