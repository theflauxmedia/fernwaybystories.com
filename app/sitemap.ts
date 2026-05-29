import type { MetadataRoute } from "next";
import { SITE_ROUTES } from "@/lib/seo";
import { pageUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITE_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: pageUrl(path === "/" ? "" : path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
