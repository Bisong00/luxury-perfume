"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

interface CartButtonProps {
  onClick?: () => void;
}

export default function CartButton({
  onClick,
}: CartButtonProps) {

  const items = useCartStore(
    (state) => state.items
  );

  const hydrated = useCartStore(
    (state) => state.hydrated
  );

  const totalItems = hydrated
    ? items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      )
    : 0;


  return (
    <button
      onClick={onClick}
      aria-label="Shopping cart"
      className="
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        transition
        hover:bg-neutral-100
        active:scale-95
      "
    >

      <ShoppingBag
        size={22}
        strokeWidth={1.8}
      />


      {totalItems > 0 && (

        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-black
            text-[10px]
            font-semibold
            text-white
          "
        >
          {totalItems > 99
            ? "99+"
            : totalItems}
        </span>

      )}

    </button>
  );
}