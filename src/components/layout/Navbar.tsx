import Link from "next/link";

import NavbarClient from "./NavbarClient";
import AuthButtons from "./AuthButtons";
import MobileAuth from "./MobileAuth";


export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-neutral-200
        bg-white/90
        backdrop-blur
      "
    >

      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* Logo */}
        <Link
          href="/"
          className="
            text-xl
            font-bold
            tracking-[0.25em]
          "
        >
          LUXE
        </Link>


        <div className="flex items-center gap-4">


          <NavbarClient
            mobileAuth={
              <MobileAuth />
            }
          />


          {/* Desktop Auth */}
          <div className="hidden md:flex">
            <AuthButtons />
          </div>


        </div>


      </div>


    </header>
  );
}