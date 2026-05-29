export type Diet = "v" | "non-v" | "both";

export type MenuItem = {
  name: string;
  desc: string;
  diet: Diet;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const MENU_INTRO =
  "A curated selection of global comfort dishes and crafted beverages — designed to be shared, savoured, and enjoyed at your own pace.";

export const menuCategories: MenuCategory[] = [
  {
    id: "starters",
    label: "Small Plates & Starters",
    items: [
      { name: "Crispy Lotus Stem", desc: "Chilli caramel, sesame, spring onion", diet: "v" },
      { name: "Prawn Skewers", desc: "Lemongrass marinade, citrus dip", diet: "non-v" },
      { name: "Truffle Fries", desc: "Parmesan, herbs, house aioli", diet: "v" },
      { name: "Chicken Satay", desc: "Peanut glaze, pickled cucumber", diet: "non-v" },
    ],
  },
  {
    id: "mains",
    label: "Main Dishes",
    items: [
      { name: "Butter Chicken Bowl", desc: "Basmati rice, naan crumble, pickled onion", diet: "non-v" },
      { name: "Grilled Fish", desc: "Herb butter, seasonal greens", diet: "non-v" },
      { name: "Mushroom Risotto", desc: "Aged parmesan, truffle oil", diet: "v" },
    ],
  },
  {
    id: "vegetarian",
    label: "Vegetarian Selection",
    items: [
      { name: "Paneer Tikka", desc: "Smoked yogurt, mint chutney", diet: "v" },
      { name: "Buddha Bowl", desc: "Quinoa, roasted vegetables, tahini", diet: "v" },
      { name: "Avocado Toast", desc: "Sourdough, chilli oil, micro greens", diet: "v" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Chocolate Fondant", desc: "Vanilla bean ice cream", diet: "v" },
      { name: "Seasonal Fruit Tart", desc: "Pastry cream, berry coulis", diet: "v" },
    ],
  },
  {
    id: "cocktails",
    label: "Cocktails & Beverages",
    items: [
      { name: "Fernway Signature", desc: "House blend, citrus, botanicals", diet: "both" },
      { name: "Smoked Old Fashioned", desc: "Whisky, bitters, orange zest", diet: "both" },
      { name: "Zero Proof Spritz", desc: "Botanicals, soda, fresh herbs", diet: "both" },
    ],
  },
  {
    id: "shisha",
    label: "Shisha Selection",
    items: [
      { name: "Classic Mint", desc: "Cool, refreshing finish", diet: "both" },
      { name: "Double Apple", desc: "Traditional blend", diet: "both" },
      { name: "Seasonal Fusion", desc: "Ask your server for today's pairing", diet: "both" },
    ],
  },
];
