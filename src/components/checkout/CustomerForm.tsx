"use client";

interface CustomerFormProps {

  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  updateData: (
    data: Partial<CustomerFormProps["data"]>
  ) => void;

  nextStep: () => void;

}


export default function CustomerForm({

  data,

  updateData,

  nextStep,

}: CustomerFormProps) {



  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phone
    ) {

      alert(
        "Please complete all customer details"
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

        <p
          className="
            uppercase
            tracking-[0.35em]
            text-[#B88A44]
          "
        >
          Step 1
        </p>


        <h2
          className="
            mt-3
            text-4xl
            font-light
          "
        >
          Customer Information
        </h2>


        <p
          className="
            mt-4
            text-neutral-500
          "
        >
          Tell us where we can contact you.
        </p>


      </div>




      <div
        className="
          grid
          gap-6
          md:grid-cols-2
        "
      >


        <input

          type="text"

          placeholder="First Name"

          value={data.firstName}

          onChange={(e)=>
            updateData({
              firstName:
              e.target.value
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

          placeholder="Last Name"

          value={data.lastName}

          onChange={(e)=>
            updateData({
              lastName:
              e.target.value
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

        type="email"

        placeholder="Email Address"

        value={data.email}

        onChange={(e)=>
          updateData({
            email:
            e.target.value
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





      <input

        type="tel"

        placeholder="Phone Number"

        value={data.phone}

        onChange={(e)=>
          updateData({
            phone:
            e.target.value
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






      <div
        className="
          flex
          justify-end
        "
      >

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