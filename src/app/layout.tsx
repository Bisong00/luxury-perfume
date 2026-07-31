import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/providers/CartProvider";


export const metadata: Metadata = {
  title: "Luxury Perfume Store",
  description:
    "Discover luxury fragrances from the world's finest perfume houses.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


return (

<html lang="en">


<body className="bg-[#faf9f7] text-neutral-900">


<CartProvider>


{/* Razorpay Checkout */}

<Script

src="https://checkout.razorpay.com/v1/checkout.js"

strategy="afterInteractive"

/>



<AnnouncementBar />


<Navbar />


<main>

{children}

</main>


<Footer />


<Toaster

position="top-right"

richColors

closeButton

/>


</CartProvider>


</body>


</html>

);

}