"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";

export default function SearchBar() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch =
    searchParams.get("search") ?? "";

  const [search, setSearch] =
    useState(currentSearch);


  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);


  function handleSearch(value: string) {

    setSearch(value);

    const params =
      new URLSearchParams(
        searchParams.toString()
      );


    if (value.trim()) {
      params.set(
        "search",
        value
      );
    } else {
      params.delete("search");
    }


    router.push(
      `${pathname}?${params.toString()}`
    );
  }


  function clearSearch() {

    setSearch("");

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.delete("search");

    router.push(
      `${pathname}?${params.toString()}`
    );
  }


  return (
    <div className="relative">

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-neutral-400
        "
      />


      <input

        type="search"

        value={search}

        onChange={(e) =>
          handleSearch(
            e.target.value
          )
        }

        placeholder="Search fragrances..."

        className="
          w-full
          rounded-2xl
          border
          border-neutral-300
          bg-white
          py-3
          pl-11
          pr-11
          text-sm
          outline-none
          transition
          focus:border-[#B88A44]
          focus:ring-2
          focus:ring-[#B88A44]/20
        "

      />


      {search && (

        <button

          onClick={clearSearch}

          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            hover:bg-neutral-100
          "

        >

          <X size={16}/>

        </button>

      )}

    </div>
  );
}