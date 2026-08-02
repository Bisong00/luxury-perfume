import { notFound } from "next/navigation";

import ProductDetails from "@/components/shop/ProductDetails";
import ProductGrid from "@/components/shop/ProductGrid";

import {
  getProductBySlug,
  getRelatedProducts,
} from "@/services/product.service";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category.id,
    product.id
  );

  return (
    <main>

      <ProductDetails product={product} />

      {relatedProducts.length > 0 && (

        <section className="bg-[#faf9f7] pb-24">

          <div className="mx-auto max-w-7xl px-6">

            <div className="mb-14 text-center">

              <p className="uppercase tracking-[0.35em] text-[#B88A44] text-sm">
                You May Also Like
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                Related Fragrances
              </h2>

            </div>

            <ProductGrid
              products={relatedProducts}
            />

          </div>

        </section>

      )}

    </main>
  );
}