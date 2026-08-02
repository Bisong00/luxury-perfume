"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";

import { useCartStore } from "@/store/cart.store";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";


interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}


export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {


  const items = useCartStore(
    (state) => state.items
  );


  const hydrated = useCartStore(
    (state) => state.hydrated
  );



  useEffect(() => {

    if(!open) return;


    document.body.style.overflow = "hidden";


    const handleKey = (
      e: KeyboardEvent
    ) => {

      if(e.key === "Escape"){
        onClose();
      }

    };


    window.addEventListener(
      "keydown",
      handleKey
    );



    return () => {

      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKey
      );

    };


  },[
    open,
    onClose
  ]);




  const itemCount = hydrated
    ?
    items.reduce(
      (sum,item)=>
      sum + item.quantity,
      0
    )
    :
    0;




  return (

    <AnimatePresence>


      {
        open && (

          <>


            {/* Overlay */}

            <motion.div

              initial={{
                opacity:0
              }}

              animate={{
                opacity:1
              }}

              exit={{
                opacity:0
              }}

              onClick={onClose}

              className="
                fixed
                inset-0
                z-40
                bg-black/40
                backdrop-blur-sm
              "

            />




            {/* Drawer */}

            <motion.aside


              initial={{
                x:"100%"
              }}


              animate={{
                x:0
              }}


              exit={{
                x:"100%"
              }}


              transition={{
                duration:0.3
              }}


              className="
                fixed
                right-0
                top-0
                z-50
                flex
                h-screen
                w-full
                max-w-md
                flex-col
                bg-white
                shadow-2xl
              "

            >





              {/* Header */}

              <div

                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  px-5
                  py-3
                "

              >


                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <ShoppingBag
                    size={20}
                  />


                  <div>

                    <h2
                      className="
                        text-lg
                        font-semibold
                      "
                    >
                      Shopping Cart
                    </h2>


                    <p
                      className="
                        text-xs
                        text-neutral-500
                      "
                    >

                      {itemCount} items

                    </p>


                  </div>


                </div>




                <button

                  onClick={onClose}

                  className="
                    rounded-full
                    p-2
                    hover:bg-neutral-100
                  "

                >

                  <X
                    size={20}
                  />

                </button>


              </div>







              {/* Cart Items Area */}

              <div

                className="
                  flex-1
                  overflow-y-auto
                  px-5
                  py-5
                "

              >



                {
                  items.length === 0

                  ?

                  (

                    <div

                      className="
                        flex
                        h-full
                        flex-col
                        items-center
                        justify-center
                        text-center
                      "

                    >

                      <ShoppingBag

                        size={55}

                        className="
                          text-neutral-300
                        "

                      />


                      <h3

                        className="
                          mt-5
                          text-lg
                          font-semibold
                        "

                      >

                        Your cart is empty

                      </h3>


                      <p

                        className="
                          mt-2
                          text-sm
                          text-neutral-500
                        "

                      >

                        Start exploring luxury fragrances.

                      </p>


                    </div>

                  )


                  :


                  (

                    <div

                      className="
                        space-y-5
                      "

                    >

                      {
                        items.map(
                          (item)=>(

                            <CartItem

                              key={
                                item.id
                              }

                              item={
                                item
                              }

                            />

                          )
                        )
                      }


                    </div>

                  )

                }



              </div>







              {/* Summary */}

              {
                items.length > 0 && (

                  <CartSummary />

                )
              }



            </motion.aside>


          </>

        )
      }


    </AnimatePresence>

  );

}