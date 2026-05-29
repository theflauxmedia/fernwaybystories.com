/** Business details from brand content brief */
export const SITE_URL = "https://fernwaybystories.com";

export const BUSINESS = {
  name: "Fernway by Stories",
  shortName: "Fernway",
  tagline: "A Rooftop Escape in the Heart of the City",
  phone: "+919606919636",
  phoneDisplay: "+91 96069 19636",
  whatsapp: "https://wa.me/919606919636",
  address: {
    line1: "Q88J+78G, Mayaganahalli",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "562128",
    country: "India",
    full: "Q88J+78G, Mayaganahalli, Bengaluru, Karnataka 562128",
  },
  hours: "Daily · 6pm – 6am",
  hoursLong: "Daily · Afternoon – Late Night",
  mapsUrl: "https://maps.google.com/?q=Q88J+78G,Mayaganahalli,Bengaluru,Karnataka+562128",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0!2d77.6641!3d12.8346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzA0LjYiTiA3N8KwMzknNTAuOCJF!5e0!3m2!1sen!2sin!4v1&output=embed",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
} as const;

export const SEO = {
  defaultTitle: "Fernway by Stories | Rooftop Lounge, Bengaluru",
  defaultDescription:
    "Fernway by Stories — a rooftop escape in the heart of Bengaluru. Curated cocktails, globally inspired comfort food, and relaxed evenings under the open sky. Reserve your table.",
  keywords: [
    "Fernway by Stories",
    "Fernway rooftop Bengaluru",
    "rooftop lounge Bangalore",
    "rooftop restaurant Mayaganahalli",
    "Stories Bar Kitchen",
    "private dining Bengaluru",
    "rooftop bar Bangalore",
    "events rooftop Bengaluru",
    "shisha lounge Bengaluru",
  ],
  ogImage: "/ambience/1.webp",
} as const;

export function pageUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
