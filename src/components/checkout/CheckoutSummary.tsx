"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/utils/currency";

export default function CheckoutSummary() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());

  if (!mounted) {
    return (
      <aside
        className="
          h-fit
          rounded-3xl
          bg-white
          p-8
          shadow-sm
        "
      >
        <h2 className="text-2xl font-bold">
          Order Summary
        </h2>

        <div className="mt-8 animate-pulse space-y-4">
          <div className="h-5 rounded bg-neutral-200" />
          <div className="h-5 rounded bg-neutral-200" />
          <div className="h-5 rounded bg-neutral-200" />
          <div className="h-8 rounded bg-neutral-300" />
        </div>
      </aside>
    );
  }

  const shipping = subtotal >= 150 ? 0 : 15;
  const tax = subtotal * 0.2;
  const total = subtotal + shipping + tax;

  return (
    <aside
      className="
        h-fit
        rounded-3xl
        bg-white
        p-8
        shadow-sm
      "
    >
      <h2 className="text-2xl font-bold">
        Order Summary
      </h2>

      <div className="mt-8 space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="
              flex
              justify-between
              gap-4
              text-sm
            "
          >
            <div>
              <p className="font-medium">
                {item.name}
              </p>

              <p className="text-neutral-500">
                Qty: {item.quantity}
              </p>
            </div>

            <span className="font-semibold">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div
        className="
          mt-8
          space-y-4
          border-t
          pt-6
        "
      >
        <div className="flex justify-between">
          <span className="text-neutral-500">
            Subtotal
          </span>

          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">
            Shipping
          </span>

          <span>
            {shipping === 0
              ? "Free"
              : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">
            Tax
          </span>

          <span>{formatPrice(tax)}</span>
        </div>

        <div
          className="
            flex
            justify-between
            border-t
            pt-5
            text-xl
            font-bold
          "
        >
          <span>Total</span>

          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Link
        href="/shop"
        className="
          mt-6
          block
          text-center
          text-sm
          text-neutral-500
          hover:text-black
        "
      >
        Continue Shopping
      </Link>
    </aside>
  );
}