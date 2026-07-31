import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

import { useCartStore } from "@/store/cart.store";


export default function CheckoutPage() {

  return (
    <main
      className="
        mx-auto
        grid
        max-w-7xl
        gap-10
        px-6
        py-20
        lg:grid-cols-2
      "
    >

      <section>

        <h1
          className="
            mb-8
            text-4xl
            font-light
          "
        >
          Checkout
        </h1>


        <CheckoutForm />

      </section>



      <section>

        <CheckoutSummary />

      </section>


    </main>
  );
}