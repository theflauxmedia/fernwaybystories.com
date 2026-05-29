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
  { title: "Rooftop at Dusk", desc: "Bengaluru skyline as evening settles in." },
  { title: "Open Sky", desc: "Where the city meets the horizon." },
  { title: "Evening Light", desc: "Soft glow over the terrace." },
  { title: "The Deck", desc: "Space to linger under the stars." },
  { title: "Night Ambience", desc: "Mood, music, and open air." },
  { title: "City Views", desc: "Panoramas from above Mayaganahalli." },
  { title: "Golden Hour", desc: "Sunset hues across the rooftop." },
  { title: "The Lounge", desc: "Unhurried corners to gather." },
  { title: "After Dark", desc: "When Fernway comes alive." },
  { title: "Sky-lit Tables", desc: "Dining beneath Bengaluru nights." },
  { title: "Terrace Nights", desc: "An open-air escape in the city." },
  { title: "The Atmosphere", desc: "Every detail, intentionally set." },
  { title: "Under the Stars", desc: "Where stories unfold outdoors." },
  { title: "Evening Escape", desc: "Your rooftop sanctuary awaits." },
];

const foodMeta = [
  { title: "From the Kitchen", desc: "Artisan plates, plated with care." },
  { title: "Chef's Selection", desc: "Seasonal flavours, bold and refined." },
  { title: "Small Plates", desc: "Meant for sharing and pairing." },
  { title: "Craft & Kitchen", desc: "Where food meets the open sky." },
  { title: "The Pass", desc: "Fresh from kitchen to table." },
  { title: "Signature Bites", desc: "Curated for rooftop evenings." },
  { title: "Shared Plates", desc: "Pass, pair, and savour." },
  { title: "Main Event", desc: "Hearty plates for long nights." },
  { title: "Coastal Notes", desc: "Inspired plates with global soul." },
  { title: "Sweet Finish", desc: "Desserts to close the evening." },
  { title: "Bar Bites", desc: "Perfect beside a curated pour." },
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
      title: folder === "ambience" ? "The Rooftop" : "The Kitchen",
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
export const foodGalleryItems = buildItems("food", 12, foodMeta);

/** Homepage gallery strip — mix of ambience & food */
export const fernwayGalleryItems: ImageItem[] = [
  ambienceGalleryItems[8],
  foodGalleryItems[0],
  ambienceGalleryItems[3],
  foodGalleryItems[2],
  ambienceGalleryItems[6],
  foodGalleryItems[4],
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
 * Art-directed desktop layout for /gallery food section (12 images, 4-col grid):
 *
 * Row 1: [0·tall][1·wide][1][2 ]
 * Row 2: [0·tall][3 ][4 ][5 ]
 * Row 3: [6 ][7 ][8·wide][8]
 * Row 4: [9·wide][9][10 ][11]
 */
const FOOD_GALLERY_SPANS: string[] = [
  "lg:row-span-2",                              // 0 — tall accent
  "sm:col-span-2 lg:col-span-2",               // 1 — wide opener
  "",                                            // 2
  "",                                            // 3
  "",                                            // 4
  "",                                            // 5
  "",                                            // 6
  "",                                            // 7
  "lg:col-span-2",                              // 8 — wide
  "sm:col-span-2 lg:col-span-2",               // 9 — wide closer
  "",                                            // 10
  "",                                            // 11
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
