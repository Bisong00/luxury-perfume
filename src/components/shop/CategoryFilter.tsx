"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";


interface Category {
  id: string;
  name: string;
  slug: string;
}


interface CategoryFilterProps {
  categories: Category[];
}



export default function CategoryFilter({
  categories,
}: CategoryFilterProps) {


  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const selectedCategory =
    searchParams.get("category") ?? "";



  function handleChange(
    slug: string
  ) {

    const params =
      new URLSearchParams(
        searchParams.toString()
      );



    if (
      selectedCategory === slug
    ) {

      params.delete(
        "category"
      );

    } else {

      params.set(
        "category",
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
        Categories
      </h3>



      <div className="
        space-y-2
      ">



        {categories.map(
          (category) => (

          <label

            key={category.id}

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
                selectedCategory ===
                category.slug
              }

              onChange={() =>
                handleChange(
                  category.slug
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
              {category.name}
            </span>



          </label>

        ))}


      </div>


    </div>

  );

}