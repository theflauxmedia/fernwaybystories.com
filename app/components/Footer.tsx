import Link from "next/link";
import Image from "next/image";
import { SITE_LOGO } from "@/lib/favicons";
import ReserveTableLink from "./ReserveTableLink";
import { BUSINESS } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner section-wrap">
        <div className="site-footer-grid">
          {/* Brand */}
          <div className="site-footer-brand">
            <div className="flex items-center gap-4">
              <div className="site-footer-logo">
                <Image src={SITE_LOGO} alt="" fill className="object-contain" />
              </div>
              <div>
                <p className="site-footer-title">Fernway</p>
                <p className="site-footer-byline" style={{ marginTop: "0.35rem" }}>
                  by Stories
                </p>
              </div>
            </div>
            <p className="site-footer-tagline">{BUSINESS.tagline}</p>
            <div className="site-footer-actions">
              <ReserveTableLink className="btn-gold">
                Reserve a Table
              </ReserveTableLink>
              <a
                href={BUSINESS.whatsapp}
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <p className="site-footer-byline">By Stories Bar &amp; Kitchen</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="site-footer-col-title">Explore</p>
            <nav className="site-footer-nav-grid" aria-label="Footer">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="footer-link">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="site-footer-col-title">Visit</p>
            <div className="site-footer-contact">
              <address className="footer-link not-italic leading-relaxed">
                {BUSINESS.address.line1}
                <br />
                {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
              </address>
              <p className="site-footer-hours">{BUSINESS.hours}</p>
              <a href={`tel:${BUSINESS.phone}`} className="footer-link">
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={BUSINESS.mapsUrl}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                Open in Maps →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer-bar section-wrap">
        <p>© {new Date().getFullYear()} Fernway by Stories</p>
        <p>Bengaluru, India</p>
      </div>
    </footer>
  );
}
