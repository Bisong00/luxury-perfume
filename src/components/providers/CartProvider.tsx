"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart.store";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return children;
}