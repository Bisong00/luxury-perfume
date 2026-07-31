export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name"
  | "best-seller"
  | "featured";

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
}

export interface ShopSearchParams {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: SortOption;
}

export interface FilterOption {
  name: string;
  slug: string;
}

export interface ShopSidebarProps {
  brands: FilterOption[];
  categories: FilterOption[];
}