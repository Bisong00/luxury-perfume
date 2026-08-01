"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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


interface NavbarClientProps {
  mobileAuth: React.ReactNode;
}



export default function NavbarClient({
  mobileAuth,
}: NavbarClientProps) {


  const pathname = usePathname();
  const router = useRouter();


  const [activeSection,setActiveSection] = useState("");
  const [mobileOpen,setMobileOpen] = useState(false);



  const open =
    useCartUIStore(
      (state)=>state.open
    );


  const openCart =
    useCartUIStore(
      (state)=>state.openCart
    );


  const closeCart =
    useCartUIStore(
      (state)=>state.closeCart
    );





  const scrollToSection = (
    sectionId:string
  )=>{


    setMobileOpen(false);



    if(pathname !== "/"){

      router.push(
        `/#${sectionId}`
      );

      return;
    }



    const section =
      document.getElementById(
        sectionId
      );



    if(section){

      section.scrollIntoView({
        behavior:"smooth",
        block:"start",
      });

    }

  };







  useEffect(()=>{


    if(pathname !== "/")
      return;



    const sections=[
      "collection",
      "about",
      "contact"
    ];



    const observer =
      new IntersectionObserver(
        (entries)=>{


          entries.forEach(
            (entry)=>{


              if(entry.isIntersecting){

                setActiveSection(
                  entry.target.id
                );

              }

            }
          );


        },
        {
          threshold:0.35
        }

      );



    sections.forEach(
      (id)=>{


        const section =
          document.getElementById(id);



        if(section){

          observer.observe(section);

        }


      }
    );



    return ()=>observer.disconnect();



  },[pathname]);







return (

<>

{/* DESKTOP MENU */}

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


{
links.map((link)=>

"href" in link ? (

<Link

key={link.name}

href={link.href ?? "/"}

className="
transition
hover:text-[#B88A44]
"

>

{link.name}

</Link>


):(


<button

key={link.name}

onClick={()=>
scrollToSection(
link.section ?? ""
)
}

className={`
transition
hover:text-[#B88A44]

${
activeSection === link.section
?
"text-[#B88A44] font-semibold"
:
""
}

`}

>

{link.name}

</button>


)

)



}


<CartButton
onClick={openCart}
/>


</nav>





{/* MOBILE ICONS */}


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

aria-label="menu"

onClick={()=>
setMobileOpen(!mobileOpen)
}

>

{
mobileOpen
?
<X size={28}/>
:
<Menu size={28}/>
}

</button>



</div>







{/* MOBILE DROPDOWN */}


{
mobileOpen && (


<div

className="
absolute
left-0
top-full
z-50
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


{
links.map((link)=>

"href" in link ? (


<Link

key={link.name}

href={link.href ?? "/"}

onClick={()=>
setMobileOpen(false)
}

className="
text-lg
font-medium
"

>

{link.name}

</Link>



):(


<button

key={link.name}

onClick={()=>
scrollToSection(
link.section ?? ""
)
}

className="
text-left
text-lg
font-medium
"

>

{link.name}

</button>


)

)

}




{/* LOGIN REGISTER */}

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