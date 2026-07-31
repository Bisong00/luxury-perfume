import SearchBar from "./SearchBar";
import ProductCount from "./ProductCount";
import SortDropdown from "./SortDropdown";

interface ProductToolbarProps {
  totalProducts: number;
}

export default function ProductToolbar({
  totalProducts,
}: ProductToolbarProps) {

  return (
    <div className="
      space-y-5
    ">

      <SearchBar />


      <div className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-5
        shadow-sm
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <ProductCount
          totalProducts={
            totalProducts
          }
        />


        <SortDropdown />

      </div>

    </div>
  );
}