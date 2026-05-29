import type { MetadataRoute } from "next";
import { manifestIcons } from "@/lib/favicons";
import { BUSINESS, SEO } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: BUSINESS.shortName,
    description: SEO.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0f110d",
    theme_color: "#1a1c18",
    lang: "en-IN",
    orientation: "portrait-primary",
    categories: ["food", "lifestyle"],
    icons: manifestIcons,
  };
}
