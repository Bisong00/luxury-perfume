export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;

  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;

  brand: Brand;
  category: Category;

  images: ProductImage[];
}