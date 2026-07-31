import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AccountPage() {


  const user =
    await getCurrentUser();



  if(!user){

    redirect("/login");

  }



  return (

    <section
      className="
        min-h-screen
        bg-[#F8F7F4]
        px-6
        py-20
      "
    >


      <div
        className="
          mx-auto
          max-w-6xl
        "
      >


        <div
          className="
            mb-12
            rounded-3xl
            bg-white
            p-8
            shadow
          "
        >


          <h1
            className="
              text-4xl
              font-light
            "
          >
            My Account
          </h1>


          <p
            className="
              mt-3
              text-neutral-600
            "
          >
            Welcome back, {user.name}
          </p>


          <p
            className="
              mt-1
              text-sm
              text-neutral-500
            "
          >
            {user.email}
          </p>


        </div>






        <h2
          className="
            mb-6
            text-3xl
            font-light
          "
        >
          My Orders
        </h2>





        {
          user.orders.length === 0 ? (

            <div
              className="
                rounded-3xl
                bg-white
                p-10
                text-center
                shadow
              "
            >

              <p
                className="
                  text-neutral-500
                "
              >
                You have no orders yet.
              </p>


            </div>


          ) : (


            <div
              className="
                space-y-8
              "
            >


            {
              user.orders.map(
                (order)=>(
                  
                  <div
                    key={order.id}
                    className="
                      rounded-3xl
                      bg-white
                      p-8
                      shadow
                    "
                  >


                    <div
                      className="
                        flex
                        flex-col
                        justify-between
                        gap-4
                        md:flex-row
                      "
                    >


                      <div>

                        <h3
                          className="
                            text-xl
                            font-semibold
                          "
                        >

                          Order #{order.id.slice(-8)}

                        </h3>


                        <p
                          className="
                            mt-2
                            text-sm
                            text-neutral-500
                          "
                        >

                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}

                        </p>


                      </div>




                      <div
                        className="
                          text-right
                        "
                      >

                        <p
                          className="
                            font-semibold
                            text-[#B88A44]
                          "
                        >
                          ₹{order.total}
                        </p>


                        <span
                          className="
                            mt-2
                            inline-block
                            rounded-full
                            bg-green-100
                            px-4
                            py-1
                            text-sm
                            text-green-700
                          "
                        >

                          {order.status}

                        </span>


                      </div>


                    </div>





                    <div
                      className="
                        mt-8
                        border-t
                        pt-6
                      "
                    >

                    {
                      order.items.map(
                        (item)=>(
                          
                          <div
                            key={item.id}
                            className="
                              flex
                              items-center
                              justify-between
                              py-3
                            "
                          >

                            <div>

                              <p
                                className="
                                  font-medium
                                "
                              >
                                {item.name}
                              </p>


                              <p
                                className="
                                  text-sm
                                  text-neutral-500
                                "
                              >

                                Quantity:
                                {" "}
                                {item.quantity}

                              </p>

                            </div>



                            <p>

                              ₹
                              {item.price *
                              item.quantity}

                            </p>


                          </div>


                        )
                      )
                    }


                    </div>




                  </div>

                )

              )
            }


            </div>


          )
        }




      </div>


    </section>

  );

}