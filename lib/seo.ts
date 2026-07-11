import type { Metadata } from "next";
import { siteIcons } from "./favicons";
import { BUSINESS, SEO, SITE_URL, pageUrl } from "./site";

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export const SITE_ROUTES: {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.85 },
  { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.8 },
  { path: "/events", changeFrequency: "weekly", priority: 0.85 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
];

export function absoluteAssetUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getOgImageUrl(image?: string) {
  return absoluteAssetUrl(image ?? SEO.ogImage);
}

type PageMetaInput = {
  /** Short page title (appended to site name unless titleAbsolute) */
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  /** Use for homepage to avoid duplicate branding in <title> */
  titleAbsolute?: boolean;
};

export function buildOpenGraphTitle(title: string, titleAbsolute?: boolean) {
  if (titleAbsolute) return title;
  if (title.includes("Fernway")) return title;
  return `${title} | ${BUSINESS.name}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  imageAlt,
  titleAbsolute,
}: PageMetaInput): Metadata {
  const canonical = pageUrl(path);
  const ogImage = getOgImageUrl(image);
  const ogTitle = buildOpenGraphTitle(title, titleAbsolute);

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    keywords: [...SEO.keywords, ...keywords],
    authors: [{ name: BUSINESS.name, url: SITE_URL }],
    creator: BUSINESS.name,
    publisher: BUSINESS.name,
    category: "food & drink",
    alternates: {
      canonical,
      languages: { "en-IN": canonical },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      alternateLocale: ["en_US"],
      url: canonical,
      siteName: BUSINESS.name,
      title: ogTitle,
      description,
      countryName: "India",
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? `${BUSINESS.name} — ${title}`,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: {
        url: ogImage,
        alt: imageAlt ?? `${BUSINESS.name} — ${title}`,
      },
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: siteIcons,
  manifest: "/manifest.webmanifest",
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${BUSINESS.name}`,
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "food & drink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    countryName: "India",
    images: [
      {
        url: getOgImageUrl(),
        secureUrl: getOgImageUrl(),
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} — open-air lounge in Bengaluru`,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: {
      url: getOgImageUrl(),
      alt: `${BUSINESS.name} — open-air lounge in Bengaluru`,
    },
  },
  other: {
    "apple-mobile-web-app-title": BUSINESS.shortName,
    "mobile-web-app-capable": "yes",
  },
};
