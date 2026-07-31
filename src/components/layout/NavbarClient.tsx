"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCartUIStore } from "@/store/cart-ui.store";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Collections",
    section: "collection",
  },
  {
    name: "About",
    section: "about",
  },
  {
    name: "Contact",
    section: "contact",
  },
];

export default function NavbarClient() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("");

  const open = useCartUIStore((state) => state.open);
  const openCart = useCartUIStore((state) => state.openCart);
  const closeCart = useCartUIStore((state) => state.closeCart);

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["collection", "about", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <nav
        className="
          flex
          items-center
          gap-8
          text-sm
          font-medium
        "
      >
        {links.map((link) =>
          "href" in link ? (
            <Link
              key={link.name}
              href={link.href ?? "/"}
              className="transition hover:text-[#B88A44]"
            >
              {link.name}
            </Link>
          ) : (
            <button
              key={link.name}
              type="button"
              onClick={() => scrollToSection(link.section)}
              className={`
                cursor-pointer
                transition
                hover:text-[#B88A44]
                ${
                  activeSection === link.section
                    ? "text-[#B88A44] font-semibold"
                    : ""
                }
              `}
            >
              {link.name}
            </button>
          )
        )}

        <CartButton onClick={openCart} />
      </nav>

      <CartDrawer
        open={open}
        onClose={closeCart}
      />
    </>
  );
}