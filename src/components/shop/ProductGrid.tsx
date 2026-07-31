import ProductCard from "./ProductCard";

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;

  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;

  brand: {
    name: string;
  };

  category: {
    name: string;
  };

  images: ProductImage[];
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {

  if (!products.length) {
    return (
      <div className="rounded-3xl bg-white p-24 text-center shadow-sm">

        <h2 className="text-3xl font-bold">
          No Products Found
        </h2>

        <p className="mt-4 text-neutral-500">
          Try changing your filters or search criteria.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-8
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}