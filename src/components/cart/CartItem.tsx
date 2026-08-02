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


  const increaseQuantity =
    useCartStore(
      (state) => state.increaseQuantity
    );


  const decreaseQuantity =
    useCartStore(
      (state) => state.decreaseQuantity
    );


  const removeItem =
    useCartStore(
      (state) => state.removeItem
    );



  return (

    <div
      className="
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-4
        transition
        hover:shadow-md
      "
    >


      <div
        className="
          flex
          gap-5
        "
      >



        <Link
          href={`/shop/${item.slug}`}
          className="
            relative
            h-32
            w-28
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
            sizes="112px"
            className="
              object-cover
            "
          />

        </Link>





        <div
          className="
            flex
            flex-1
            flex-col
          "
        >



          <div
            className="
              flex
              justify-between
              gap-3
            "
          >

            <div>


              <p
                className="
                  text-xs
                  uppercase
                  tracking-widest
                  text-[#B88A44]
                "
              >
                {item.brand}
              </p>



              <Link
                href={`/shop/${item.slug}`}
                className="
                  mt-1
                  block
                  text-lg
                  font-semibold
                  hover:text-[#B88A44]
                "
              >

                {item.name}

              </Link>


            </div>





            <button

              onClick={() =>
                removeItem(item.id)
              }

              className="
                text-neutral-400
                transition
                hover:text-red-500
              "

            >

              <Trash2 size={18}/>

            </button>


          </div>





          <div
            className="
              mt-3
              flex
              items-center
              justify-between
            "
          >


            <div>


              <p
                className="
                  text-lg
                  font-bold
                "
              >

                {formatPrice(item.price)}

              </p>


              <p
                className="
                  text-sm
                  text-neutral-500
                "
              >

                Total:
                {" "}
                {formatPrice(
                  item.price *
                  item.quantity
                )}

              </p>


            </div>





            <div
              className="
                flex
                items-center
                overflow-hidden
                rounded-full
                border
              "
            >


              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }

                className="
                  p-2
                  transition
                  hover:bg-neutral-100
                "
              >

                <Minus size={15}/>

              </button>





              <span
                className="
                  w-10
                  text-center
                  font-semibold
                "
              >

                {item.quantity}

              </span>





              <button

                onClick={() =>
                  increaseQuantity(item.id)
                }

                className="
                  p-2
                  transition
                  hover:bg-neutral-100
                "

              >

                <Plus size={15}/>

              </button>



            </div>



          </div>



        </div>



      </div>



    </div>


  );

}