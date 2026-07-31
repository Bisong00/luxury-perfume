"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import {
  useCartStore,
  CartItem as CartItemType,
} from "@/store/cart.store";

import { formatPrice } from "@/utils/currency";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({
  item,
}: CartItemProps) {

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );


  return (
    <div className="
      flex
      gap-4
      border-b
      border-neutral-200
      pb-6
    ">

      <Link
        href={`/shop/${item.slug}`}
        className="
          relative
          h-24
          w-20
          shrink-0
          overflow-hidden
          rounded-xl
          bg-neutral-100
        "
      >

        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />

      </Link>


      <div className="flex flex-1 flex-col">

        <Link
          href={`/shop/${item.slug}`}
          className="font-semibold hover:text-[#B88A44]"
        >
          {item.name}
        </Link>


        <p className="text-sm text-neutral-500">
          {item.brand}
        </p>


        <div className="
          mt-3
          flex
          items-center
          justify-between
        ">

          <div>

            <p className="font-semibold">
              {formatPrice(item.price)}
            </p>

            <p className="text-sm text-neutral-500">
              Total:{" "}
              {formatPrice(
                item.price *
                item.quantity
              )}
            </p>

          </div>


          <button
            onClick={() =>
              removeItem(item.id)
            }
            className="
              text-neutral-400
              hover:text-red-500
            "
          >
            <Trash2 size={18}/>
          </button>

        </div>


        <div className="
          mt-4
          flex
          items-center
          overflow-hidden
          rounded-xl
          border
          w-fit
        ">

          <button
            onClick={() =>
              decreaseQuantity(item.id)
            }
            className="
              p-2
              hover:bg-neutral-100
            "
          >
            <Minus size={15}/>
          </button>


          <span className="
            w-10
            text-center
            font-medium
          ">
            {item.quantity}
          </span>


          <button
            onClick={() =>
              increaseQuantity(item.id)
            }
            className="
              p-2
              hover:bg-neutral-100
            "
          >
            <Plus size={15}/>
          </button>

        </div>

      </div>

    </div>
  );
}