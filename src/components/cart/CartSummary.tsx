"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/utils/currency";

export default function CartSummary() {

  const subtotal = useCartStore(
    (state) => state.subtotal()
  );

  const totalItems = useCartStore(
    (state) => state.totalItems()
  );


  const shipping =
    subtotal >= 150 ? 0 : 15;

  const tax =
    subtotal * 0.2;

  const total =
    subtotal +
    shipping +
    tax;


  return (
    <div className="
      border-t
      border-neutral-200
      p-6
    ">

      <div className="space-y-4">


        <div className="
          flex
          justify-between
          text-sm
        ">

          <span className="text-neutral-500">
            Items ({totalItems})
          </span>

          <span className="font-medium">
            {formatPrice(subtotal)}
          </span>

        </div>


        <div className="
          flex
          justify-between
          text-sm
        ">

          <span className="text-neutral-500">
            Shipping
          </span>

          <span className="font-medium">
            {shipping === 0
              ? "Free"
              : formatPrice(shipping)}
          </span>

        </div>


        <div className="
          flex
          justify-between
          text-sm
        ">

          <span className="text-neutral-500">
            Tax (20%)
          </span>

          <span className="font-medium">
            {formatPrice(tax)}
          </span>

        </div>


        <div className="
          border-t
          pt-4
          flex
          justify-between
        ">

          <span className="text-lg font-semibold">
            Total
          </span>

          <span className="text-2xl font-bold">
            {formatPrice(total)}
          </span>

        </div>

      </div>


      {shipping > 0 && (

        <p className="
          mt-4
          text-center
          text-xs
          text-neutral-500
        ">
          Spend{" "}
          {formatPrice(150 - subtotal)}
          {" "}more for free shipping.
        </p>

      )}


      <Link
        href="/checkout"
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-black
          py-4
          font-semibold
          text-white
          transition
          hover:bg-[#B88A44]
        "
      >
        Proceed to Checkout

        <ArrowRight size={18}/>

      </Link>


      <Link
        href="/shop"
        className="
          mt-3
          block
          text-center
          text-sm
          text-neutral-500
          hover:text-black
        "
      >
        Continue Shopping
      </Link>


    </div>
  );
}