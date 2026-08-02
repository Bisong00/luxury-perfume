"use client";

interface ShippingFormProps {
  data: {
    address: string;
    city: string;
    country: string;
    postcode: string;
  };

  updateData: (
    data: Partial<ShippingFormProps["data"]>
  ) => void;

  previousStep: () => void;

  nextStep: () => void;
}


export default function ShippingForm({
  data,
  updateData,
  previousStep,
  nextStep,
}: ShippingFormProps) {


  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    if (
      !data.address ||
      !data.city ||
      !data.country ||
      !data.postcode
    ) {

      alert(
        "Please complete your shipping details"
      );

      return;
    }


    nextStep();

  }



  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      <div>

        <p className="
          uppercase
          tracking-[0.35em]
          text-[#B88A44]
        ">
          Step 2
        </p>


        <h2 className="
          mt-3
          text-4xl
          font-light
        ">
          Shipping Address
        </h2>


        <p className="
          mt-4
          text-neutral-500
        ">
          Where should we deliver your fragrance?
        </p>

      </div>



      <input
        type="text"
        placeholder="Street Address"
        value={data.address}
        onChange={(e)=>
          updateData({
            address:e.target.value
          })
        }
        className="
          w-full
          rounded-xl
          border
          p-4
          outline-none
          focus:border-[#B88A44]
        "
      />



      <div className="
        grid
        gap-6
        md:grid-cols-2
      ">


        <input
          type="text"
          placeholder="City"
          value={data.city}
          onChange={(e)=>
            updateData({
              city:e.target.value
            })
          }
          className="
            rounded-xl
            border
            p-4
            outline-none
            focus:border-[#B88A44]
          "
        />



        <input
          type="text"
          placeholder="Country"
          value={data.country}
          onChange={(e)=>
            updateData({
              country:e.target.value
            })
          }
          className="
            rounded-xl
            border
            p-4
            outline-none
            focus:border-[#B88A44]
          "
        />

      </div>




      <input
        type="text"
        placeholder="Postal Code"
        value={data.postcode}
        onChange={(e)=>
          updateData({
            postcode:e.target.value
          })
        }
        className="
          w-full
          rounded-xl
          border
          p-4
          outline-none
          focus:border-[#B88A44]
        "
      />





      <div className="
        flex
        justify-between
      ">


        <button
          type="button"
          onClick={previousStep}
          className="
            rounded-full
            border
            px-10
            py-4
            transition
            hover:bg-neutral-100
          "
        >
          Back
        </button>



        <button
          type="submit"
          className="
            rounded-full
            bg-black
            px-10
            py-4
            text-white
            transition
            hover:bg-[#B88A44]
          "
        >
          Continue
        </button>


      </div>


    </form>

  );
}