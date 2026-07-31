import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";

import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

import StatCard from "@/components/admin/StatCard";
import RecentOrders from "@/components/admin/RecentOrders";

export default async function AdminPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      redirect("/login");
    }

    if (user.role !== "ADMIN") {
      redirect("/");
    }

    // Dashboard statistics
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      revenue,
    ] = await Promise.all([
      prisma.product.count(),

      prisma.order.count(),

      prisma.user.count(),

      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),
    ]);

    const totalRevenue =
      revenue._sum.total ?? 0;

    // Recent orders
    const recentOrders =
      await prisma.order.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

    return (
      <>
        <div className="mb-10">
          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Dashboard
          </h1>

          <p
            className="
              mt-3
              text-neutral-500
            "
          >
            Welcome back, {user.name}
          </p>
        </div>

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <StatCard
            title="Products"
            value={totalProducts}
            icon={Package}
          />

          <StatCard
            title="Orders"
            value={totalOrders}
            icon={ShoppingCart}
          />

          <StatCard
            title="Customers"
            value={totalCustomers}
            icon={Users}
          />

          <StatCard
            title="Revenue"
            value={`$${Number(totalRevenue).toLocaleString()}`}
            icon={DollarSign}
          />
        </div>

        <RecentOrders
          orders={recentOrders}
        />
      </>
    );
  } catch {
    redirect("/login");
  }
}