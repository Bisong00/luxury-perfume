import SearchBar from "./SearchBar";
import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

interface FilterItem {
  id: string | number;
  name: string;
  slug: string;
}

interface ShopSidebarProps {
  brands?: FilterItem[];
  categories?: FilterItem[];
}

export default function ShopSidebar({ 
  brands = [], 
  categories = [] 
}: ShopSidebarProps) {
  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm">
      <div>
        <h2 className="sr-only">Search and Filters</h2>
        <SearchBar />
      </div>

      <div className="mt-8 divide-y divide-neutral-100">
        <div className="pb-8">
          <CategoryFilter categories={categories} />
        </div>

        <div className="py-8">
          <BrandFilter brands={brands} />
        </div>

        <div className="pt-8">
          <PriceFilter />
        </div>
      </div>
    </div>
  );
}