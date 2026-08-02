"use client";

import { useState } from "react";

import CheckoutStepper from "@/components/checkout/CheckoutStepper";

import CustomerForm from "@/components/checkout/CustomerForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import ReviewOrder from "@/components/checkout/ReviewOrder";

import CheckoutSummary from "@/components/checkout/CheckoutSummary";



export default function CheckoutPage() {


  const [step,setStep] =
  useState(1);



  const [checkoutData,setCheckoutData] =
  useState({

    firstName:"",
    lastName:"",
    email:"",
    phone:"",

    address:"",
    city:"",
    country:"",
    postcode:"",

  });



  function updateData(
    data:any
  ){

    setCheckoutData(
      prev=>({
        ...prev,
        ...data,
      })
    );

  }



  function nextStep(){

    setStep(
      prev =>
      Math.min(
        prev + 1,
        4
      )
    );

  }



  function previousStep(){

    setStep(
      prev =>
      Math.max(
        prev - 1,
        1
      )
    );

  }





  return (

    <main
      className="
        min-h-screen
        bg-[#faf9f7]
        py-20
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >


        <CheckoutStepper
          currentStep={step}
        />



        <div
          className="
            mt-12
            grid
            gap-10
            lg:grid-cols-[1fr_420px]
          "
        >



          <section
            className="
              rounded-3xl
              bg-white
              p-10
            "
          >



            {step === 1 && (

              <CustomerForm

                data={checkoutData}

                updateData={
                  updateData
                }

                nextStep={
                  nextStep
                }

              />

            )}



            {step === 2 && (

              <ShippingForm

                data={checkoutData}

                updateData={
                  updateData
                }

                previousStep={
                  previousStep
                }

                nextStep={
                  nextStep
                }

              />

            )}




            {step === 3 && (

              <PaymentForm

                previousStep={
                  previousStep
                }

              />

            )}





            {step === 4 && (

              <ReviewOrder

                checkoutData={
                  checkoutData
                }

                previousStep={
                  previousStep
                }

              />

            )}



          </section>




          <CheckoutSummary />


        </div>


      </div>


    </main>

  );

}