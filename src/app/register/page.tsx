"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function RegisterPage() {

  const router = useRouter();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }



  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);
    setError("");


    try {

      const response =
        await fetch(
          "/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(form),
          }
        );



      const data =
        await response.json();



      if (!response.ok) {

        throw new Error(
          data.message ||
          "Registration failed"
        );

      }



      router.push("/login");



    } catch(error:any) {

      setError(
        error.message
      );


    } finally {

      setLoading(false);

    }

  }




  return (

    <section
      className="
        min-h-screen
        bg-[#faf8f6]
        flex
        items-center
        justify-center
        px-6
      "
    >


      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-10
          shadow-sm
        "
      >


        <h1
          className="
            text-3xl
            font-bold
            text-center
          "
        >
          Create Account
        </h1>


        <p
          className="
            mt-3
            text-center
            text-neutral-500
          "
        >
          Join the LUXE fragrance experience
        </p>



        <form
          onSubmit={handleSubmit}
          className="
            mt-8
            space-y-5
          "
        >



          <input
            required
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
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
            required
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
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
            required
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              p-4
              outline-none
              focus:border-[#B88A44]
            "
          />



          {
            error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )
          }



          <button
            disabled={loading}
            className="
              w-full
              rounded-xl
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
              ? "Creating..."
              : "Create Account"
            }

          </button>



        </form>




        <p
          className="
            mt-6
            text-center
            text-sm
            text-neutral-500
          "
        >

          Already have an account?

          <Link
            href="/login"
            className="
              ml-2
              text-black
              hover:text-[#B88A44]
            "
          >
            Login
          </Link>

        </p>



      </div>


    </section>

  );

}