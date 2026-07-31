import Link from "next/link";

import NavbarClient from "./NavbarClient";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
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
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            text-2xl
            font-bold
            tracking-[0.3em]
            transition
            hover:text-[#B88A44]
          "
        >
          LUXE
        </Link>

        <div className="flex items-center gap-8">
          {/* Navigation + Cart */}
          <NavbarClient />

          {/* Login/Register OR My Account/Logout */}
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}