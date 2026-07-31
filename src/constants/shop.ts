export const SORT_OPTIONS = [
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Best Sellers",
] as const;



export const PRICE_RANGES = [
  {
    label: "All Prices",
    min: 0,
    max: Infinity,
  },

  {
    label: "Under £100",
    min: 0,
    max: 100,
  },

  {
    label: "£100 - £200",
    min: 100,
    max: 200,
  },

  {
    label: "£200 - £300",
    min: 200,
    max: 300,
  },

  {
    label: "£300+",
    min: 300,
    max: Infinity,
  },

] as const;