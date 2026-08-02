"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

    setError("");
    setSuccess("");

    if (form.password.length < 8) {
      return setError(
        "Password must be at least 8 characters."
      );
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1800);

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
        shadow-xl
        p-10
      "
      >
        <h1 className="text-4xl font-light text-center">
          Create Account
        </h1>

        <p className="mt-4 text-center text-neutral-500">
          Join the LUXE fragrance experience
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
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
              transition
              focus:border-[#B88A44]
            "
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              p-4
              outline-none
              transition
              focus:border-[#B88A44]
            "
          />

          <div className="relative">
            <input
              required
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                p-4
                pr-14
                outline-none
                focus:border-[#B88A44]
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
              "
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              required
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                p-4
                pr-14
                outline-none
                focus:border-[#B88A44]
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
              "
            >
              {showConfirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <p className="text-sm text-neutral-500">
            Password must contain at least 8
            characters.
          </p>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-green-600">
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          <button
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
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
            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-500">
          Already have an account?

          <Link
            href="/login"
            className="
              ml-2
              font-semibold
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