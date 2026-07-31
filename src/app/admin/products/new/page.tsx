import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Add Product
        </h1>

        <p className="mt-3 text-neutral-500">
          Create a new luxury fragrance.
        </p>
      </div>

      <ProductForm
        brands={brands}
        categories={categories}
      />
    </>
  );
}