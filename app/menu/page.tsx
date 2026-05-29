import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import MenuTabs from "./MenuTabs";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Menu",
  description:
    "Our menu at Fernway by Stories — small plates, mains, vegetarian selection, desserts, cocktails, and shisha on our Bengaluru rooftop.",
  path: "/menu",
  image: "/food/1.webp",
  imageAlt: "Food and drinks at Fernway by Stories rooftop kitchen",
  keywords: ["Fernway menu", "rooftop food Bangalore", "cocktails shisha Bengaluru"],
});

export default function MenuPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero label="Our Menu" title="Menu" />
        <MenuTabs />
      </main>
      <Footer />
    </>
  );
}
