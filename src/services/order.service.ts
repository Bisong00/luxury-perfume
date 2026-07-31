import { prisma } from "@/lib/prisma";
import { OrderItem } from "@/types/order";

interface CreateOrderInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postcode: string;

  subtotal: number;
  shipping: number;
  tax: number;
  total: number;

  items: OrderItem[];
}

export async function createOrder(
  data: CreateOrderInput
) {
  return prisma.order.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      country: data.country,
      postcode: data.postcode,

      subtotal: data.subtotal,
      shipping: data.shipping,
      tax: data.tax,
      total: data.total,

      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      },
    },
    include: {
      items: true,
    },
  });
}