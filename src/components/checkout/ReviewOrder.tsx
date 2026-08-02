"use client";

import { formatPrice } from "@/utils/currency";
import { useCartStore } from "@/store/cart.store";


interface ReviewOrderProps {

  checkoutData: {

    firstName:string;
    lastName:string;
    email:string;
    phone:string;

    address:string;
    city:string;
    country:string;
    postcode:string;

  };


  previousStep:()=>void;

}



export default function ReviewOrder({

  checkoutData,

  previousStep,

}:ReviewOrderProps){


  const items =
    useCartStore(
      state => state.items
    );



  const subtotal =
    useCartStore(
      state => state.subtotal()
    );



  const shipping =
    subtotal >= 150
    ? 0
    : 15;



  const tax =
    subtotal * 0.2;



  const total =
    subtotal +
    shipping +
    tax;



  return (

    <div className="space-y-10">


      <div>

        <p className="
          uppercase
          tracking-[0.35em]
          text-[#B88A44]
        ">
          Step 4
        </p>


        <h2 className="
          mt-3
          text-4xl
          font-light
        ">
          Review Your Order
        </h2>


        <p className="
          mt-4
          text-neutral-500
        ">
          Confirm your details before completing payment.
        </p>


      </div>





      {/* CUSTOMER DETAILS */}

      <section
        className="
          rounded-3xl
          border
          p-8
        "
      >

        <h3 className="
          text-xl
          font-semibold
        ">
          Customer Information
        </h3>


        <div className="
          mt-5
          space-y-2
          text-neutral-600
        ">

          <p>
            {checkoutData.firstName}{" "}
            {checkoutData.lastName}
          </p>


          <p>
            {checkoutData.email}
          </p>


          <p>
            {checkoutData.phone}
          </p>

        </div>


      </section>





      {/* SHIPPING */}


      <section
        className="
          rounded-3xl
          border
          p-8
        "
      >

        <h3 className="
          text-xl
          font-semibold
        ">
          Shipping Address
        </h3>


        <div className="
          mt-5
          text-neutral-600
        ">


          <p>
            {checkoutData.address}
          </p>


          <p>
            {checkoutData.city},{" "}
            {checkoutData.country}
          </p>


          <p>
            {checkoutData.postcode}
          </p>


        </div>


      </section>






      {/* PRODUCTS */}


      <section
        className="
          rounded-3xl
          border
          p-8
        "
      >

        <h3 className="
          text-xl
          font-semibold
        ">
          Products
        </h3>



        <div
          className="
            mt-6
            space-y-5
          "
        >

          {
            items.map(item => (

              <div
                key={item.id}
                className="
                  flex
                  justify-between
                "
              >


                <div>

                  <p className="font-medium">
                    {item.name}
                  </p>


                  <p className="
                    text-sm
                    text-neutral-500
                  ">
                    Quantity: {item.quantity}
                  </p>


                </div>



                <p className="font-semibold">

                  {
                    formatPrice(
                      item.price *
                      item.quantity
                    )
                  }

                </p>


              </div>

            ))
          }


        </div>


      </section>







      {/* TOTAL */}


      <section
        className="
          rounded-3xl
          bg-[#faf9f7]
          p-8
        "
      >

        <div className="
          space-y-4
        ">


          <div className="
            flex
            justify-between
          ">
            <span>
              Subtotal
            </span>

            <span>
              {formatPrice(subtotal)}
            </span>

          </div>




          <div className="
            flex
            justify-between
          ">

            <span>
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




          <div className="
            flex
            justify-between
          ">

            <span>
              Tax
            </span>

            <span>
              {formatPrice(tax)}
            </span>

          </div>




          <div className="
            flex
            justify-between
            border-t
            pt-5
            text-xl
            font-bold
          ">

            <span>
              Total
            </span>


            <span>
              {formatPrice(total)}
            </span>


          </div>


        </div>


      </section>






      {/* BUTTONS */}


      <div className="
        flex
        justify-between
      ">


        <button

          onClick={previousStep}

          className="
            rounded-full
            border
            px-10
            py-4
          "

        >

          Back

        </button>




        <button

          className="
            rounded-full
            bg-black
            px-10
            py-4
            text-white
            hover:bg-[#B88A44]
          "

        >

          Continue To Payment

        </button>



      </div>


    </div>

  );

}