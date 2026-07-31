"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { SORT_OPTIONS } from "@/constants/shop";

const SORT_VALUES = {
  "Newest": "newest",
  "Price: Low to High": "price-asc",
  "Price: High to Low": "price-desc",
  "Best Sellers": "best-seller",
} as const;


export default function SortDropdown() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const currentSort =
    searchParams.get("sort") ?? "newest";


  function handleSort(
    value: string
  ) {

    const params =
      new URLSearchParams(
        searchParams.toString()
      );


    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set(
        "sort",
        value
      );
    }


    router.push(
      `${pathname}?${params.toString()}`
    );
  }


  return (
    <select

      value={currentSort}

      onChange={(e) =>
        handleSort(
          e.target.value
        )
      }

      className="
        rounded-xl
        border
        border-neutral-300
        bg-white
        px-4
        py-2
        text-sm
        outline-none
        transition
        focus:border-[#B88A44]
      "

    >

      {SORT_OPTIONS.map(
        (option) => (

          <option

            key={option}

            value={
              SORT_VALUES[option]
            }

          >

            {option}

          </option>

        )
      )}

    </select>
  );
}