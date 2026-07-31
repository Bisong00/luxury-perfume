import { prisma } from "@/lib/prisma";

export async function getAllBrands() {
  return prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });
}