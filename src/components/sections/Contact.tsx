"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message.");
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <section
      id="contact"
      className="bg-[#faf9f7] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="text-sm uppercase tracking-[0.35em] text-[#B88A44]">
            Contact Us
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            We'd Love To Hear From You
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-neutral-500">
            Questions about fragrances, orders, wholesale or collaborations?
            Send us a message and we'll respond as soon as possible.
          </p>

        </div>

        <div className="grid gap-14 lg:grid-cols-2">

          {/* Left Side */}

          <div className="space-y-8">

            <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-sm">

              <Mail className="text-[#B88A44]" size={30} />

              <div>
                <h3 className="font-semibold">
                  Email
                </h3>

                <p className="text-neutral-500">
                  xxxxxxxxxxxxxxxxx
                </p>
              </div>

            </div>

            <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-sm">

              <Phone className="text-[#B88A44]" size={30} />

              <div>
                <h3 className="font-semibold">
                  Phone
                </h3>

                <p className="text-neutral-500">
                  +xxxxxxxxxxxxx
                </p>
              </div>

            </div>

            <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-sm">

              <MapPin className="text-[#B88A44]" size={30} />

              <div>
                <h3 className="font-semibold">
                  Address
                </h3>

                <p className="text-neutral-500">
                  xxxxxxxxxxxxxxxxxx
                </p>
              </div>

            </div>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-10 shadow-sm space-y-6"
          >

            <input
              required
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full rounded-xl border p-4 outline-none focus:border-[#B88A44]"
            />

            <input
              type="email"
              required
              placeholder="Your Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl border p-4 outline-none focus:border-[#B88A44]"
            />

            <input
              required
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject: e.target.value,
                })
              }
              className="w-full rounded-xl border p-4 outline-none focus:border-[#B88A44]"
            />

            <textarea
              required
              rows={6}
              placeholder="Message..."
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className="w-full rounded-xl border p-4 outline-none focus:border-[#B88A44]"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 font-semibold text-white transition hover:bg-[#B88A44]"
            >
              <Send size={20} />

              {loading
                ? "Sending..."
                : "Send Message"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}