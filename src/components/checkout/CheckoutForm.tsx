"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cart.store";


export default function CheckoutForm() {

  const router = useRouter();

  const items = useCartStore(
    state => state.items
  );

  const clearCart = useCartStore(
    state => state.clearCart
  );


  const [loading,setLoading] =
    useState(false);


  const [form,setForm] =
    useState({
      name:"",
      email:"",
      phone:"",
      address:"",
    });



  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]:
      e.target.value
    });

  };



  const payNow = async()=>{


    if(
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address
    ){

      alert(
        "Please complete all details"
      );

      return;

    }



    try{


      setLoading(true);



      const total =
        items.reduce(
          (sum,item)=>
          sum +
          item.price *
          item.quantity,

          0
        );



      const response =
      await fetch(
        "/api/create-payment-order",
        {

          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },


          body:JSON.stringify({
            amount:total,
            customer:form
          })

        }
      );



      const order =
      await response.json();



      if(!order.id){

        throw new Error(
          "Order failed"
        );

      }



      const options = {

        key:
        process.env
        .NEXT_PUBLIC_RAZORPAY_KEY_ID!,


        amount:
        order.amount,


        currency:"INR",


        name:
        "LUXE Perfume",


        description:
        "Luxury Fragrance Purchase",


        order_id:
        order.id,



        handler:
        async(response:any)=>{


          const verify =
          await fetch(
          "/api/verify-payment",
          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },


            body:JSON.stringify({

              razorpay_order_id:
              response.razorpay_order_id,


              razorpay_payment_id:
              response.razorpay_payment_id,


              razorpay_signature:
              response.razorpay_signature,


              customer:form,


              items,


              amount:total

            })

          });



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



        prefill:{

          name:
          form.name,


          email:
          form.email,


          contact:
          form.phone

        },



        theme:{

          color:
          "#B88A44"

        }

      };



      const razorpay =
      new window.Razorpay(
        options
      );


      razorpay.open();



    }
    catch(error){

      console.error(error);


      alert(
        "Payment failed"
      );

    }
    finally{

      setLoading(false);

    }

  };




  return (

    <div className="space-y-4">


      <input
      name="name"
      placeholder="Full Name"
      onChange={handleChange}
      className="w-full rounded-lg border p-4"
      />


      <input
      name="email"
      placeholder="Email"
      onChange={handleChange}
      className="w-full rounded-lg border p-4"
      />


      <input
      name="phone"
      placeholder="Phone"
      onChange={handleChange}
      className="w-full rounded-lg border p-4"
      />


      <input
      name="address"
      placeholder="Address"
      onChange={handleChange}
      className="w-full rounded-lg border p-4"
      />


      <button
      onClick={payNow}
      disabled={loading}
      className="
      w-full
      rounded-full
      bg-black
      py-4
      text-white
      transition
      hover:bg-[#B88A44]
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

  );

}