"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCartUIStore } from "@/store/cart-ui.store";


interface NavbarClientProps {
  mobileAuth: React.ReactNode;
}


interface NavLink {
  name: string;
  href?: string;
  section?: string;
}


const links: NavLink[] = [
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


export default function NavbarClient({
  mobileAuth,
}: NavbarClientProps) {


  const pathname = usePathname();
  const router = useRouter();


  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);



  const open = useCartUIStore(
    (state) => state.open
  );

  const openCart = useCartUIStore(
    (state) => state.openCart
  );

  const closeCart = useCartUIStore(
    (state) => state.closeCart
  );



  const scrollToSection = (
    sectionId: string
  ) => {

    setMobileOpen(false);


    if (pathname !== "/") {

      router.push(
        `/#${sectionId}`
      );

      return;
    }


    const section =
      document.getElementById(
        sectionId
      );


    if (!section) return;


    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  };





  useEffect(() => {

    if (pathname !== "/") return;


    const sections = [
      "collection",
      "about",
      "contact",
    ];



    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                setActiveSection(
                  entry.target.id
                );

              }

            }
          );

        },
        {
          threshold: 0.35,
        }
      );



    sections.forEach(
      (id) => {

        const section =
          document.getElementById(id);


        if (section) {

          observer.observe(section);

        }

      }
    );



    return () =>
      observer.disconnect();


  }, [pathname]);






  return (
    <>


      {/* DESKTOP NAVIGATION */}

      <nav
        className="
          hidden
          md:flex
          items-center
          gap-8
          text-sm
          font-medium
        "
      >

        {links.map(
          (link) =>

            link.href ? (

              <Link
                key={link.name}
                href={link.href}
                className="
                  transition
                  hover:text-[#B88A44]
                "
              >
                {link.name}
              </Link>


            ) : (

              <button
                key={link.name}
                type="button"
                onClick={() =>
                  scrollToSection(
                    link.section!
                  )
                }
                className={`
                  transition
                  hover:text-[#B88A44]

                  ${
                    activeSection === link.section
                      ? "font-semibold text-[#B88A44]"
                      : ""
                  }
                `}
              >

                {link.name}

              </button>

            )

        )}



        <CartButton
          onClick={openCart}
        />


      </nav>







      {/* MOBILE CONTROLS */}

      <div
        className="
          flex
          items-center
          gap-4
          md:hidden
        "
      >

        <CartButton
          onClick={openCart}
        />


        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
          "
        >

          {
            mobileOpen
              ? <X size={24}/>
              : <Menu size={24}/>
          }


        </button>


      </div>








      {/* MOBILE MENU */}

      {
        mobileOpen && (

          <div
            className="
              absolute
              left-0
              top-full
              w-full
              border-t
              bg-white
              shadow-xl
              md:hidden
            "
          >

            <div
              className="
                flex
                flex-col
                gap-6
                p-6
              "
            >



              {links.map(
                (link) =>

                  link.href ? (

                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="
                        text-lg
                        font-medium
                        transition
                        hover:text-[#B88A44]
                      "
                    >
                      {link.name}
                    </Link>


                  ) : (

                    <button
                      key={link.name}
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          link.section!
                        )
                      }
                      className="
                        text-left
                        text-lg
                        font-medium
                        transition
                        hover:text-[#B88A44]
                      "
                    >
                      {link.name}

                    </button>

                  )

              )}




              {/* AUTH SECTION */}

              {mobileAuth}



            </div>


          </div>

        )
      }





      <CartDrawer
        open={open}
        onClose={closeCart}
      />


    </>
  );
}