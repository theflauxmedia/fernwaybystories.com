import { SITE_LOGO } from "./favicons";
import { BUSINESS, SEO, SITE_URL, isActiveSocialUrl, pageUrl } from "./site";
import { absoluteAssetUrl } from "./seo";

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
const restaurantId = `${SITE_URL}/#restaurant`;

function realSocialUrls() {
  return [BUSINESS.social.instagram, BUSINESS.social.facebook].filter(isActiveSocialUrl);
}

export function getStructuredDataGraph() {
  const sameAs = realSocialUrls();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BUSINESS.name,
        alternateName: ["Fernway", "Stories Bar & Kitchen"],
        url: SITE_URL,
        slogan: BUSINESS.tagline,
        logo: {
          "@type": "ImageObject",
          url: absoluteAssetUrl(SITE_LOGO),
        },
        image: absoluteAssetUrl(SEO.ogImage),
        description: SEO.defaultDescription,
        telephone: BUSINESS.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.address.line1,
          addressLocality: BUSINESS.address.city,
          addressRegion: BUSINESS.address.region,
          postalCode: BUSINESS.address.postalCode,
          addressCountry: "IN",
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: BUSINESS.name,
        description: SEO.defaultDescription,
        inLanguage: "en-IN",
        publisher: { "@id": organizationId },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: pageUrl("/contact"),
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          name: "Reserve a Table",
        },
      },
      {
        "@type": "Restaurant",
        "@id": restaurantId,
        name: BUSINESS.name,
        url: SITE_URL,
        image: [
          absoluteAssetUrl(SEO.ogImage),
          absoluteAssetUrl("/food/1.webp"),
          absoluteAssetUrl("/ambience/14.webp"),
        ],
        logo: absoluteAssetUrl(SITE_LOGO),
        description: SEO.defaultDescription,
        slogan: BUSINESS.tagline,
        servesCuisine: ["Global comfort food", "Cocktails", "Vegetarian", "Shisha"],
        priceRange: "₹₹₹",
        telephone: BUSINESS.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.address.line1,
          addressLocality: BUSINESS.address.city,
          addressRegion: BUSINESS.address.region,
          postalCode: BUSINESS.address.postalCode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS.coordinates.lat,
          longitude: BUSINESS.coordinates.lng,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "13:00",
            closes: "06:00",
          },
        ],
        hasMap: BUSINESS.mapsUrl,
        menu: pageUrl("/menu"),
        acceptsReservations: true,
        petsAllowed: true,
        parentOrganization: { "@id": organizationId },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
    ],
  };
}
