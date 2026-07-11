import type { ImageItem } from "@/components/ui/bento-gallery";

// Compact spans used on the homepage scroll strip
const HOMEPAGE_SPANS = [
  "md:col-span-2 md:row-span-2 min-h-[18rem] min-w-[18rem]",
  "min-h-[15rem] min-w-[15rem]",
  "min-h-[15rem] min-w-[15rem]",
  "min-h-[17rem] min-w-[16rem]",
  "min-h-[15rem] min-w-[15rem]",
  "md:col-span-2 min-h-[15rem] min-w-[20rem]",
  "min-h-[16rem] min-w-[15rem]",
  "min-h-[18rem] min-w-[17rem]",
];

const ambienceMeta = [
  { title: "Dusk on the Road", desc: "Bengaluru skyline as evening settles in." },
  { title: "Open Sky", desc: "Where the city meets the horizon." },
  { title: "Evening Light", desc: "Soft glow over the terrace." },
  { title: "The Deck", desc: "Space to linger under the stars." },
  { title: "Night Ambience", desc: "Mood, music, and open air." },
  { title: "City Views", desc: "Panoramas from above Mayaganahalli." },
  { title: "Golden Hour", desc: "Sunset hues across open-air seating." },
  { title: "The Lounge", desc: "Unhurried corners to gather." },
  { title: "After Dark", desc: "When Fernway comes alive." },
  { title: "Sky-lit Tables", desc: "Dining beneath Bengaluru nights." },
  { title: "Terrace Nights", desc: "An open-air escape in the city." },
  { title: "The Atmosphere", desc: "Every detail, intentionally set." },
  { title: "Under the Stars", desc: "Where stories unfold outdoors." },
  { title: "Evening Escape", desc: "Your open-air sanctuary awaits." },
];

const foodMeta = [
  { title: "From the Kitchen", desc: "Artisan plates, plated with care." },
  { title: "Chef's Selection", desc: "Seasonal flavours, bold and refined." },
  { title: "Signature Bites", desc: "Curated for open-air evenings." },
  { title: "Tonight's Spread", desc: "A taste of Fernway by Stories." },
];

function buildItems(
  folder: "ambience" | "food",
  count: number,
  meta: { title: string; desc: string }[],
): ImageItem[] {
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const copy = meta[i] ?? {
      title: folder === "ambience" ? "Open Air" : "The Kitchen",
      desc: folder === "ambience" ? "Evenings at Fernway." : "Plates from our kitchen.",
    };
    return {
      id: `${folder}-${index}`,
      title: copy.title,
      desc: copy.desc,
      url: `/${folder}/${index}.webp`,
      span: HOMEPAGE_SPANS[i % HOMEPAGE_SPANS.length],
    };
  });
}

export const ambienceGalleryItems = buildItems("ambience", 14, ambienceMeta);
ambienceGalleryItems[3].url = "/ambience/11.webp";
ambienceGalleryItems[5].url = "/ambience/12.webp";
ambienceGalleryItems[6].url = "/ambience/13.webp";
ambienceGalleryItems[8].url = "/ambience/15.webp";
export const foodGalleryItems = buildItems("food", 4, foodMeta);

/** Homepage gallery strip — new kitchen shots + ambience highlights */
export const fernwayGalleryItems: ImageItem[] = [
  foodGalleryItems[0],
  foodGalleryItems[1],
  ambienceGalleryItems[8],
  foodGalleryItems[2],
  ambienceGalleryItems[3],
  foodGalleryItems[3],
];

/** Full gallery page — all venue photos */
export const fernwayGalleryPageItems: ImageItem[] = [
  ...ambienceGalleryItems,
  ...foodGalleryItems,
];

/**
 * Art-directed desktop layout for /gallery ambience section (14 images, 4-col grid):
 *
 * Row 1: [0·hero][0][1 ][2 ]
 * Row 2: [0·hero][0][3 ][4 ]
 * Row 3: [5·panoramic  ][5][5][6 ]
 * Row 4: [7 ][8·hero][8][9 ]
 * Row 5: [10][8·hero][8][11]
 * Row 6: [12·wide][12][13·wide][13]
 */
const AMBIENCE_GALLERY_SPANS: string[] = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2", // 0 — opening hero
  "",                                             // 1
  "",                                             // 2
  "",                                             // 3
  "",                                             // 4
  "sm:col-span-2 lg:col-span-3",                // 5 — panoramic band
  "",                                             // 6
  "",                                             // 7
  "sm:col-span-2 lg:col-span-2 lg:row-span-2", // 8 — mid-gallery hero
  "",                                             // 9
  "",                                             // 10
  "",                                             // 11
  "sm:col-span-2 lg:col-span-2",                // 12 — closing wide
  "sm:col-span-2 lg:col-span-2",                // 13 — closing wide
];

/**
 * Art-directed desktop layout for /gallery food section (4 images, 4-col grid):
 *
 * Row 1: [0·hero][0][1 ]
 * Row 2: [0·hero][2 ][3·wide]
 */
const FOOD_GALLERY_SPANS: string[] = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2", // 0 — hero
  "",                                             // 1
  "",                                             // 2
  "sm:col-span-2 lg:col-span-2",                // 3 — wide closer
];

export function withAmbienceGallerySpans(items: ImageItem[]): ImageItem[] {
  return items.map((item, i) => ({
    ...item,
    span: AMBIENCE_GALLERY_SPANS[i] ?? "",
  }));
}

export function withFoodGallerySpans(items: ImageItem[]): ImageItem[] {
  return items.map((item, i) => ({
    ...item,
    span: FOOD_GALLERY_SPANS[i] ?? "",
  }));
}

/** Full /gallery page — ambience + food in one bento grid */
const GALLERY_PAGE_SPANS: string[] = [
  ...AMBIENCE_GALLERY_SPANS,
  ...FOOD_GALLERY_SPANS,
];

export function withGalleryPageSpans(items: ImageItem[]): ImageItem[] {
  return items.map((item, i) => ({
    ...item,
    span: GALLERY_PAGE_SPANS[i] ?? "",
  }));
}
