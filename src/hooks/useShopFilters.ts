"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export function useShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(
    key: string,
    value?: string
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/shop?${params.toString()}`);
  }

  return {
    search: searchParams.get("search") ?? "",

    brand: searchParams.get("brand") ?? "",

    category:
      searchParams.get("category") ?? "",

    sort:
      searchParams.get("sort") ?? "",

    price:
      searchParams.get("price") ?? "",

    updateFilter,
  };
}