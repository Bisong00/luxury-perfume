"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Eye,
} from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/utils/currency";

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;

  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;

  brand: {
    name: string;
  };

  category: {
    name: string;
  };

  images: ProductImage[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const addItem = useCartStore(
    (state) => state.addItem
  );

  const image =
    product.images?.[0]?.url ??
    "/products/placeholder.jpg";

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image,
      quantity: 1,
      price: Number(product.price),
      brand: product.brand.name,
    });
  };

  return (
    <motion.article
      layout
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-neutral-200
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}

      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">

          <Image
            src={image}
            alt={
              product.images?.[0]?.alt ??
              product.name
            }
            fill
            sizes="
              (max-width:640px)100vw,
              (max-width:1024px)50vw,
              25vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/30
              via-transparent
              to-transparent
              opacity-0
              transition
              duration-500
              group-hover:opacity-100
            "
          />

        </div>
      </Link>

      {/* FLOATING BUTTONS */}

      <div
        className="
          absolute
          right-5
          top-5
          flex
          flex-col
          gap-3
          opacity-0
          transition
          duration-300
          group-hover:opacity-100
        "
      >

        <button
          type="button"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-lg
            transition
            hover:bg-black
            hover:text-white
          "
        >
          <Heart size={18} />
        </button>

        <button
          type="button"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-lg
            transition
            hover:bg-black
            hover:text-white
          "
        >
          <Eye size={18} />
        </button>

      </div>

      {/* BADGES */}

      <div
        className="
          absolute
          left-5
          top-5
          flex
          flex-col
          gap-2
        "
      >

        {product.bestSeller && (
          <span
            className="
              rounded-full
              bg-black
              px-4
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-widest
              text-white
            "
          >
            Best Seller
          </span>
        )}

        {product.newArrival && (
          <span
            className="
              rounded-full
              bg-[#B88A44]
              px-4
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-widest
              text-white
            "
          >
            New
          </span>
        )}

        {product.featured && (
          <span
            className="
              rounded-full
              bg-emerald-600
              px-4
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-widest
              text-white
            "
          >
            Featured
          </span>
        )}

      </div>

      {/* DETAILS */}

      <div className="flex flex-col p-6">

        <p
          className="
            text-xs
            uppercase
            tracking-[0.35em]
            text-[#B88A44]
          "
        >
          {product.brand.name}
        </p>

        <Link href={`/shop/${product.slug}`}>
          <h3
            className="
              mt-2
              text-xl
              font-semibold
              transition-colors
              duration-300
              group-hover:text-[#B88A44]
            "
          >
            {product.name}
          </h3>
        </Link>

        <p
          className="
            mt-3
            line-clamp-2
            min-h-[48px]
            text-sm
            leading-6
            text-neutral-500
          "
        >
          {product.description}
        </p>

        <div className="mt-5">

          {product.stock > 0 ? (
            <span className="text-sm font-medium text-green-600">
              In Stock ({product.stock})
            </span>
          ) : (
            <span className="text-sm font-medium text-red-500">
              Out of Stock
            </span>
          )}

        </div>

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >

          <span className="text-2xl font-bold">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#B88A44]
              disabled:bg-neutral-400
              disabled:hover:scale-100
            "
          >
            <ShoppingBag size={20} />
          </button>

        </div>

      </div>
    </motion.article>
  );
}