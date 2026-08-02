"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cart.store";


interface PaymentFormProps {
  previousStep: () => void;
}


export default function PaymentForm({
  previousStep,
}: PaymentFormProps) {


  const router = useRouter();


  const items = useCartStore(
    (state) => state.items
  );


  const clearCart = useCartStore(
    (state) => state.clearCart
  );


  const [loading, setLoading] =
    useState(false);



  const payNow = async () => {


    try {


      setLoading(true);



      const razorpayKey =
        process.env
        .NEXT_PUBLIC_RAZORPAY_KEY_ID;



      if (!razorpayKey) {

        throw new Error(
          "Razorpay key is missing"
        );

      }




      const total =
        items.reduce(
          (sum, item) =>
            sum +
            item.price *
            item.quantity,

          0
        );




      const response =
        await fetch(
          "/api/create-payment-order",
          {

            method: "POST",

            headers: {

              "Content-Type":
              "application/json",

            },


            body: JSON.stringify({

              amount: total,

            }),

          }

        );



      const order =
        await response.json();




      if (!order.id) {

        throw new Error(
          "Failed to create payment order"
        );

      }





      const options = {


        key:
          razorpayKey,



        amount:
          order.amount,



        currency:
          "INR",



        name:
          "LUXE Perfume",



        description:
          "Luxury Fragrance Purchase",



        order_id:
          order.id,




        handler:
          async (
            paymentResponse:any
          ) => {


            const verify =
              await fetch(
                "/api/verify-payment",
                {

                  method:"POST",


                  headers:{

                    "Content-Type":
                    "application/json",

                  },


                  body:JSON.stringify({

                    razorpay_order_id:
                    paymentResponse
                    .razorpay_order_id,


                    razorpay_payment_id:
                    paymentResponse
                    .razorpay_payment_id,


                    razorpay_signature:
                    paymentResponse
                    .razorpay_signature,


                    items,


                    amount:
                    total,

                  }),

                }

              );




            const result =
              await verify.json();




            if(result.success){


              clearCart();



              router.push(
                "/checkout/success"
              );


            }
            else{


              alert(
                "Payment verification failed"
              );


            }


          },




        theme:{

          color:
          "#B88A44",

        },


      };




      const razorpay =
        new window.Razorpay(
          options
        );



      razorpay.open();



    }
    catch(error:any){


      console.error(error);



      alert(
        error.message ||
        "Payment failed"
      );



    }
    finally{


      setLoading(false);


    }


  };





  return (

    <div
      className="
        space-y-8
      "
    >


      <div>


        <h2
          className="
            text-2xl
            font-semibold
          "
        >
          Payment
        </h2>


        <p
          className="
            mt-2
            text-sm
            text-neutral-500
          "
        >
          Complete your order securely using Razorpay.
        </p>


      </div>





      <div
        className="
          flex
          gap-4
        "
      >


        <button
          type="button"
          onClick={previousStep}
          className="
            flex-1
            rounded-full
            border
            py-4
            font-medium
            transition
            hover:bg-neutral-100
          "
        >
          Back
        </button>




        <button
          type="button"
          onClick={payNow}
          disabled={loading}
          className="
            flex-1
            rounded-full
            bg-black
            py-4
            font-semibold
            text-white
            transition
            hover:bg-[#B88A44]
            disabled:opacity-50
          "
        >

          {
            loading
            ?
            "Opening Payment..."
            :
            "Pay Now"
          }


        </button>



      </div>



    </div>

  );

}