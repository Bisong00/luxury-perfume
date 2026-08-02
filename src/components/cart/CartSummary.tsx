"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import { useCartUIStore } from "@/store/cart-ui.store";

import { formatPrice } from "@/utils/currency";


export default function CartSummary() {


  const subtotal = useCartStore(
    (state) => state.subtotal()
  );


  const totalItems = useCartStore(
    (state) => state.totalItems()
  );


  const closeCart = useCartUIStore(
    (state) => state.closeCart
  );



  const shipping =
    subtotal >= 150 ? 0 : 15;


  const tax =
    subtotal * 0.2;


  const total =
    subtotal +
    shipping +
    tax;




  function handleCloseCart(){

    closeCart();

  }





  return (

    <div

      className="
        border-t
        border-neutral-200
        px-5
        py-4
        bg-white
      "

    >



      <div className="space-y-3">



        <div
          className="
            flex
            justify-between
            text-sm
          "
        >

          <span className="text-neutral-500">
            Items ({totalItems})
          </span>


          <span className="font-medium">
            {formatPrice(subtotal)}
          </span>


        </div>




        <div
          className="
            flex
            justify-between
            text-sm
          "
        >

          <span className="text-neutral-500">
            Shipping
          </span>


          <span>

            {
              shipping === 0
              ?
              "Free"
              :
              formatPrice(shipping)
            }

          </span>


        </div>




        <div
          className="
            flex
            justify-between
            text-sm
          "
        >

          <span className="text-neutral-500">
            Tax
          </span>


          <span>
            {formatPrice(tax)}
          </span>


        </div>





        <div

          className="
            flex
            justify-between
            border-t
            pt-3
            text-lg
            font-bold
          "

        >

          <span>
            Total
          </span>


          <span>
            {formatPrice(total)}
          </span>


        </div>



      </div>






      <Link

        href="/checkout"

        onClick={handleCloseCart}

        className="
          mt-4
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-black
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-[#B88A44]
          hover:scale-[1.02]
        "

      >

        Proceed to Checkout


        <ArrowRight size={18}/>


      </Link>






      <Link

        href="/shop"

        onClick={handleCloseCart}

        className="
          mt-3
          block
          rounded-xl
          py-2
          text-center
          text-sm
          text-neutral-500
          transition-all
          duration-300
          hover:bg-neutral-100
          hover:text-black
        "

      >

        Continue Shopping


      </Link>



    </div>

  );

}