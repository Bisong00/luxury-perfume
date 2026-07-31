import { prisma } from "@/lib/prisma";

export async function getAllProducts() {
  return prisma.product.findMany({
    include: {
      brand: true,
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      featured: true,
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
  });
}

export async function getBestSellers() {
  return prisma.product.findMany({
    where: {
      bestSeller: true,
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
  });
}

export async function getNewArrivals() {
  return prisma.product.findMany({
    where: {
      newArrival: true,
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
  });
}

export async function getAllBrands() {
  return prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getProductsByBrand(slug: string) {
  return prisma.product.findMany({
    where: {
      brand: {
        slug,
      },
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
  });
}

export async function getProductsByCategory(slug: string) {
  return prisma.product.findMany({
    where: {
      category: {
        slug,
      },
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
  });
}

export async function searchProducts(query: string) {
  return prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
  });
}