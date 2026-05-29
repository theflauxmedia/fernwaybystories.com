import type { Metadata } from "next";
import "./globals.css";
import { Cormorant, DM_Sans } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import { getStructuredDataGraph } from "@/lib/json-ld";
import { rootMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

const jsonLd = getStructuredDataGraph();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`h-full ${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="LLM site summary" />
        <meta name="theme-color" content="#2C3669" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="ICBM" content="12.8346, 77.6641" />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
