import type { Metadata } from "next";
import type { MetadataRoute } from "next";

/** Favicon assets from public/favicon_io (favicon.io export) */
export const FAVICON_DIR = "/favicon_io";

export const FAVICONS = {
  ico: `${FAVICON_DIR}/favicon.ico`,
  png16: `${FAVICON_DIR}/favicon-16x16.png`,
  png32: `${FAVICON_DIR}/favicon-32x32.png`,
  apple: `${FAVICON_DIR}/apple-touch-icon.png`,
  android192: `${FAVICON_DIR}/android-chrome-192x192.png`,
  android512: `${FAVICON_DIR}/android-chrome-512x512.png`,
} as const;

/** Main site logo — nav, footer, structured data (not favicon assets) */
export const SITE_LOGO = "/logo.png";

export const siteIcons: Metadata["icons"] = {
  icon: [
    { url: FAVICONS.ico, sizes: "any" },
    { url: FAVICONS.png16, sizes: "16x16", type: "image/png" },
    { url: FAVICONS.png32, sizes: "32x32", type: "image/png" },
  ],
  apple: [{ url: FAVICONS.apple, sizes: "180x180", type: "image/png" }],
};

export const manifestIcons: NonNullable<MetadataRoute.Manifest["icons"]> = [
  {
    src: FAVICONS.android192,
    sizes: "192x192",
    type: "image/png",
    purpose: "any",
  },
  {
    src: FAVICONS.android512,
    sizes: "512x512",
    type: "image/png",
    purpose: "any",
  },
  {
    src: FAVICONS.android512,
    sizes: "512x512",
    type: "image/png",
    purpose: "maskable",
  },
];
