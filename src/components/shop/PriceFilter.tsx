"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { PRICE_RANGES } from "@/constants/shop";


export default function PriceFilter() {


  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();



  const selectedMin =
    searchParams.get("minPrice") ?? "";


  const selectedMax =
    searchParams.get("maxPrice") ?? "";



  function handleChange(
    min: number,
    max: number
  ) {


    const params =
      new URLSearchParams(
        searchParams.toString()
      );



    if (
      min === 0 &&
      max === Infinity
    ) {

      params.delete(
        "minPrice"
      );

      params.delete(
        "maxPrice"
      );


    } else {


      params.set(
        "minPrice",
        String(min)
      );


      if (
        max !== Infinity
      ) {

        params.set(
          "maxPrice",
          String(max)
        );

      } else {

        params.delete(
          "maxPrice"
        );

      }

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
        Price
      </h3>



      <div className="
        space-y-2
      ">



        {PRICE_RANGES.map(
          (range) => {


            const checked =

              selectedMin ===
              String(range.min)

              &&

              (
                range.max === Infinity
                  ? selectedMax === ""
                  : selectedMax ===
                    String(range.max)
              );



            return (

              <label

                key={range.label}

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

                  type="radio"

                  name="price"

                  checked={
                    checked
                  }

                  onChange={() =>
                    handleChange(
                      range.min,
                      range.max
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
                  {range.label}
                </span>



              </label>

            );

          }

        )}



      </div>


    </div>

  );

}