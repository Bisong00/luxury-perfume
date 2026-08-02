import { prisma } from "@/lib/prisma";
import { ProductFilters } from "@/types/shop";

function serializeProduct(product: any) {
  return {
    ...product,

    price: Number(product.price),

    brand: {
      id: product.brand.id,
      name: product.brand.name,
      slug: product.brand.slug,
    },

    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
    },

    images: product.images.map((image: any) => ({
      id: image.id,
      url: image.url,
      alt: image.alt,
    })),
  };
}

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(serializeProduct);
}

export async function getFilteredProducts(
  filters: ProductFilters
) {
  const {
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
  } = filters;

  const products = await prisma.product.findMany({
    where: {
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(category && {
        category: {
          slug: category,
        },
      }),

      ...(brand && {
        brand: {
          slug: brand,
        },
      }),

      ...(minPrice !== undefined ||
      maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined && {
                gte: minPrice,
              }),
              ...(maxPrice !== undefined && {
                lte: maxPrice,
              }),
            },
          }
        : {}),
    },

    include: {
      brand: true,
      category: true,
      images: true,
    },

    orderBy:
      sort === "price-asc"
        ? {
            price: "asc",
          }
        : sort === "price-desc"
        ? {
            price: "desc",
          }
        : sort === "name"
        ? {
            name: "asc",
          }
        : sort === "best-seller"
        ? {
            bestSeller: "desc",
          }
        : sort === "featured"
        ? {
            featured: "desc",
          }
        : {
            createdAt: "desc",
          },
  });

  return products.map(serializeProduct);
}

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(serializeProduct);
}

export async function getBestSellers() {
  const products = await prisma.product.findMany({
    where: {
      bestSeller: true,
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(serializeProduct);
}

export async function getNewArrivals() {
  const products = await prisma.product.findMany({
    where: {
      newArrival: true,
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(serializeProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
  });

  return product ? serializeProduct(product) : null;
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

export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
) {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      NOT: {
        id: currentProductId,
      },
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(serializeProduct);
}

export async function searchProducts(query: string) {
  return getFilteredProducts({
    search: query,
  });
}

export async function getProductsCount() {
  return prisma.product.count();
}