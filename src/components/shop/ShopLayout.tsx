import ProductGrid from "./ProductGrid";
import ProductToolbar from "./ProductToolbar";
import ShopSidebar from "./ShopSidebar";

interface FilterItem {
  id: string;
  name: string;
  slug: string;
}

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


interface ShopLayoutProps {
  products: Product[];
  brands: FilterItem[];
  categories: FilterItem[];
}


export default function ShopLayout({
  products,
  brands,
  categories,
}: ShopLayoutProps) {


  return (
    <section className="
      min-h-screen
      bg-[#F8F7F4]
    ">

      <div className="
        mx-auto
        max-w-7xl
        px-6
        py-16
      ">


        <div className="
          mb-16
          text-center
        ">

          <p className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.35em]
            text-[#B88A44]
          ">
            Luxury Fragrances
          </p>


          <h1 className="
            mt-4
            text-5xl
            font-bold
          ">
            Shop Collection
          </h1>


          <p className="
            mx-auto
            mt-5
            max-w-2xl
            text-neutral-500
          ">
            Discover timeless fragrances crafted by the world's finest perfume houses.
          </p>

        </div>



        <div className="
          grid
          gap-12
          lg:grid-cols-[290px_1fr]
        ">


          <aside className="
            hidden
            lg:block
          ">

            <div className="
              sticky
              top-28
            ">

              <ShopSidebar
                brands={brands}
                categories={categories}
              />

            </div>

          </aside>




          <main>


            <ProductToolbar
              totalProducts={
                products.length
              }
            />



            <div className="
              mt-10
            ">

              {products.length > 0 ? (

                <ProductGrid
                  products={products}
                />

              ) : (

                <div className="
                  rounded-3xl
                  bg-white
                  p-10
                  text-center
                ">

                  <h2 className="
                    text-xl
                    font-semibold
                  ">
                    No fragrances found
                  </h2>


                  <p className="
                    mt-2
                    text-neutral-500
                  ">
                    Try changing your filters.
                  </p>


                </div>

              )}

            </div>


          </main>


        </div>


      </div>


    </section>
  );
}