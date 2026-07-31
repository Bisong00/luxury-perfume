import Link from "next/link";
import { CheckCircle2 } from "lucide-react";


export default function CheckoutSuccessPage(){

return (

<section className="
flex
min-h-screen
items-center
justify-center
bg-[#F8F7F4]
px-6
">


<div className="
max-w-xl
rounded-3xl
bg-white
p-10
text-center
shadow-lg
">


<div className="
mx-auto
flex
h-24
w-24
items-center
justify-center
rounded-full
bg-green-100
">

<CheckCircle2
size={56}
className="text-green-600"
/>

</div>


<h1 className="
mt-8
text-4xl
font-bold
">

Thank You!

</h1>


<p className="
mt-4
text-lg
text-neutral-600
">

Your order has been placed successfully.

</p>


<p className="
mt-2
text-sm
text-neutral-500
">

Payment received successfully.

</p>



<div className="
mt-10
space-y-4
">


<Link
href="/shop"
className="
block
rounded-2xl
bg-black
px-6
py-4
text-white
hover:bg-[#B88A44]
"
>

Continue Shopping

</Link>



<Link
href="/"
className="
block
rounded-2xl
border
px-6
py-4
hover:border-[#B88A44]
"
>

Return Home

</Link>


</div>


</div>


</section>

);

}