import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <p className="mt-2 text-neutral-500">
            Manage your perfume catalog.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="
            rounded-xl
            bg-black
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-[#B88A44]
          "
        >
          + Add Product
        </Link>
      </div>


      <div className="rounded-3xl bg-white p-6 shadow-sm overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b text-left text-sm text-neutral-500">

              <th className="pb-4">
                Product
              </th>

              <th className="pb-4">
                Brand
              </th>

              <th className="pb-4">
                Category
              </th>

              <th className="pb-4">
                Price
              </th>

              <th className="pb-4">
                Stock
              </th>

              <th className="pb-4 text-right">
                Actions
              </th>

            </tr>
          </thead>


          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b"
              >

                <td className="py-4 font-medium">
                  {product.name}
                </td>


                <td>
                  {product.brand.name}
                </td>


                <td>
                  {product.category.name}
                </td>


                <td>
                  ${Number(product.price).toFixed(2)}
                </td>


                <td>
                  {product.stock}
                </td>


                <td
                  className="
                    flex
                    justify-end
                    gap-3
                    py-4
                  "
                >

                  <Link
                    href={`/admin/products/${product.id}`}
                    className="
                      rounded-lg
                      bg-blue-600
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-white
                      transition
                      hover:bg-blue-700
                    "
                  >
                    Edit
                  </Link>


                  <DeleteProductButton
                    id={product.id}
                  />

                </td>

              </tr>

            ))}


            {products.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="
                    py-10
                    text-center
                    text-neutral-500
                  "
                >
                  No products found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
    </>
  );
}