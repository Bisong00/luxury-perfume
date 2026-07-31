"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Redirect to account page
      router.push("/account");

      // Refresh server components so the
      // authentication cookie is recognized
      router.refresh();

    } catch (err: any) {
      setError(
        err.message || "Something went wrong."
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
          Welcome Back
        </h1>

        <p
          className="
            mt-3
            text-center
            text-neutral-500
          "
        >
          Sign in to your LUXE account
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
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

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
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
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Signing in..."
              : "Login"}
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
          Don't have an account?

          <Link
            href="/register"
            className="
              ml-2
              font-medium
              text-black
              transition
              hover:text-[#B88A44]
            "
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}