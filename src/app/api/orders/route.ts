import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(
req:Request
){

try{


const body =
await req.json();



const {
customer,
items,
total,
razorpayPaymentId,
razorpayOrderId
}=body;



const order =
await prisma.order.create({

data:{


name:
customer.name,


email:
customer.email,


phone:
customer.phone,


address:
customer.address,


subtotal:
total,


shipping:0,


tax:0,


total,


status:"paid",


razorpayPaymentId,

razorpayOrderId,


items:{
create:

items.map(
(item:any)=>({

productId:
item.id,


name:
item.name,


price:
item.price,


quantity:
item.quantity,


image:
item.image

})
)

}


}


});



return NextResponse.json(
order
);


}
catch(error){

console.log(error);


return NextResponse.json(
{
error:"Order failed"
},
{
status:500
}
);

}

}