interface ProductCountProps {
  totalProducts: number;
}

export default function ProductCount({
  totalProducts,
}: ProductCountProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        {totalProducts} Product{totalProducts !== 1 ? "s" : ""}
      </h2>

      <p className="text-sm text-neutral-500">
        Showing our luxury fragrance collection
      </p>
    </div>
  );
}