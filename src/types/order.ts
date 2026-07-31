export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
}


export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}


export interface Order {
  id: string;

  customer: CustomerDetails;

  items: OrderItem[];

  subtotal: number;

  shipping: number;

  tax: number;

  total: number;

  status:
    | "pending"
    | "paid"
    | "shipped"
    | "completed"
    | "cancelled";

  createdAt: Date;
}