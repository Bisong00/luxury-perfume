"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";


interface Brand {
  id: string;
  name: string;
  slug: string;
}


interface BrandFilterProps {
  brands: Brand[];
}


export default function BrandFilter({
  brands,
}: BrandFilterProps) {


  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const selectedBrand =
    searchParams.get("brand") ?? "";



  function handleChange(
    slug: string
  ) {

    const params =
      new URLSearchParams(
        searchParams.toString()
      );


    if (
      selectedBrand === slug
    ) {

      params.delete("brand");

    } else {

      params.set(
        "brand",
        slug
      );

    }


    router.push(
      `${pathname}?${params.toString()}`
    );

  }



  return (

    <div>


      <h3 className="
        mb-5
        text-lg
        font-semibold
      ">
        Brands
      </h3>



      <div className="
        space-y-2
      ">


        {brands.map(
          (brand) => (

          <label
            key={brand.id}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-lg
              p-2
              transition
              hover:bg-neutral-100
            "
          >


            <input

              type="checkbox"

              checked={
                selectedBrand === brand.slug
              }

              onChange={() =>
                handleChange(
                  brand.slug
                )
              }

              className="
                h-4
                w-4
                accent-black
              "

            />



            <span className="
              text-sm
              text-neutral-700
            ">
              {brand.name}
            </span>



          </label>

        ))}


      </div>


    </div>

  );

}