"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Subscribed successfully!");

      setEmail("");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="bg-[#1A1A1A] py-28 text-white"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="uppercase tracking-[0.4em] text-[#C7A463]">
          Stay Connected
        </p>

        <h2 className="my-8 text-5xl font-light">
          Receive Exclusive Offers
        </h2>

        <p className="mb-12 text-neutral-300">
          Subscribe to receive updates on new arrivals,
          limited editions and luxury collections.
        </p>

        <div className="flex flex-col gap-5 md:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full bg-white px-8 py-5 text-black outline-none"
          />

          <button
            onClick={subscribe}
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </div>
    </section>
  );
}