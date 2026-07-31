import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Delete existing data
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();

  // Categories
  const men = await prisma.category.create({
    data: {
      name: "Men's Fragrances",
      slug: "mens-fragrances",
      description: "Luxury fragrances for men",
      image: "/categories/men.jpg",
    },
  });

  const women = await prisma.category.create({
    data: {
      name: "Women's Fragrances",
      slug: "womens-fragrances",
      description: "Luxury fragrances for women",
      image: "/categories/women.jpg",
    },
  });

  const unisex = await prisma.category.create({
    data: {
      name: "Unisex",
      slug: "unisex",
      description: "Fragrances for everyone",
      image: "/categories/unisex.jpg",
    },
  });

  // Brands
  const dior = await prisma.brand.create({
    data: {
      name: "Dior",
      slug: "dior",
      logo: "/brands/dior.png",
    },
  });

  const chanel = await prisma.brand.create({
    data: {
      name: "Chanel",
      slug: "chanel",
      logo: "/brands/chanel.png",
    },
  });

  const tomFord = await prisma.brand.create({
    data: {
      name: "Tom Ford",
      slug: "tom-ford",
      logo: "/brands/tomford.png",
    },
  });

  // Products
  await prisma.product.create({
    data: {
      name: "Bleu de Chanel",
      slug: "bleu-de-chanel",
      description: "Fresh woody aromatic fragrance.",
      price: 185,
      stock: 25,
      featured: true,
      bestSeller: true,
      newArrival: false,
      categoryId: men.id,
      brandId: chanel.id,

      images: {
        create: [
          {
            url: "/products/bleu.jpg",
            alt: "Bleu de Chanel",
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Dior Sauvage Elixir",
      slug: "dior-sauvage-elixir",
      description: "Powerful spicy fragrance.",
      price: 210,
      stock: 18,
      featured: true,
      bestSeller: true,
      newArrival: true,
      categoryId: men.id,
      brandId: dior.id,

      images: {
        create: [
          {
            url: "/products/sauvage.jpg",
            alt: "Sauvage Elixir",
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Tom Ford Oud Wood",
      slug: "tom-ford-oud-wood",
      description: "Rich oud, sandalwood and vanilla.",
      price: 325,
      stock: 12,
      featured: true,
      bestSeller: false,
      newArrival: true,
      categoryId: unisex.id,
      brandId: tomFord.id,

      images: {
        create: [
          {
            url: "/products/oudwood.jpg",
            alt: "Oud Wood",
          },
        ],
      },
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });