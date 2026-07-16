/** Business details from brand content brief */
export const SITE_URL = "https://fernwaybystories.com";

export const BUSINESS = {
  name: "Fernway by Stories",
  shortName: "Fernway",
  tagline: "Bengaluru Mysore Highway has a new iconic landmark.",
  phone: "+918047162244",
  phoneDisplay: "080-471-62244",
  whatsappPhone: "+919606919636",
  whatsapp: "https://wa.me/919606919636",
  reserveTableUrl: "https://widget.reservego.co/reserveOutlets/69f84d68d1e0f45432ca2e77",
  address: {
    line1: "Q88J+78G, Mayaganahalli",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "562128",
    country: "India",
    full: "Q88J+78G, Mayaganahalli, Bengaluru, Karnataka 562128",
  },
  hours: "Daily · 1pm – 6am",
  hoursLong: "Daily · 1pm – Late Night",
  hoursDisplay: "1pm – 6am",
  coordinates: {
    lat: 12.765757250040997,
    lng: 77.33076492952316,
  },
  mapsUrl: "https://maps.app.goo.gl/PeFS3Mi8kk8QcRhAA",
  mapsDirectionsUrl: "https://maps.app.goo.gl/PeFS3Mi8kk8QcRhAA",
  mapsEmbed:
    "https://maps.google.com/maps?q=12.765757250040997,77.33076492952316&z=16&output=embed",
  social: {
    instagram: "https://www.instagram.com/fernwaybystories",
    facebook: "https://www.facebook.com/",
  },
  bookingPartners: [
    {
      id: "eazydiner",
      name: "EazyDiner",
      href: "https://www.eazydiner.com/bengaluru/fernway-by-stories-bangalore-central-jp-nagar-713458",
      logo: "/partners/eazydiner.svg",
      logoWidth: 108,
      logoHeight: 22,
    },
    {
      id: "swiggy-dineout",
      name: "Swiggy Dineout",
      href: "https://www.swiggy.com/restaurants/bangalore/mayaganahalli/fernway-by-stories-1375475/dineout",
      logo: "/partners/swiggy-dineout.svg",
      logoWidth: 128,
      logoHeight: 26,
    },
  ],
} as const;

const PLACEHOLDER_SOCIAL_HOSTS = new Set(["www.facebook.com", "facebook.com"]);

export function isActiveSocialUrl(url: string) {
  try {
    const { hostname, pathname } = new URL(url);
    if (PLACEHOLDER_SOCIAL_HOSTS.has(hostname) && (pathname === "/" || pathname === "")) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function getActiveSocialLinks() {
  return [
    { name: "Instagram", href: BUSINESS.social.instagram },
    { name: "Facebook", href: BUSINESS.social.facebook },
  ].filter((link) => isActiveSocialUrl(link.href));
}

export const SEO = {
  defaultTitle: "Fernway by Stories | Open-Air Lounge, Bengaluru",
  defaultDescription:
    "Fernway by Stories — Bengaluru Mysore Highway has a new iconic landmark. Open-air seating, curated cocktails, globally inspired comfort food, and relaxed evenings under the open sky. Reserve your table.",
  keywords: [
    "Fernway by Stories",
    "Fernway Mayaganahalli",
    "Bengaluru Mysore Highway restaurant",
    "open-air lounge Bengaluru",
    "restaurant Mayaganahalli",
    "Stories Bar Kitchen",
    "private dining Bengaluru",
    "bar Bengaluru",
    "events Bengaluru",
    "shisha lounge Bengaluru",
    "pet friendly restaurant Bengaluru",
  ],
  ogImage: "/ambience/1.webp",
} as const;

export function pageUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
