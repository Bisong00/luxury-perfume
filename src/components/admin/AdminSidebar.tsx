"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Shapes,
  Building2,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Shapes,
  },
  {
    title: "Brands",
    href: "/admin/brands",
    icon: Building2,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-neutral-200
        bg-white
      "
    >
      <div className="border-b p-8">
        <h1
          className="
            text-2xl
            font-bold
            tracking-[0.25em]
          "
        >
          LUXE
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition

                ${
                  active
                    ? "bg-black text-white"
                    : "hover:bg-neutral-100"
                }
              `}
            >
              <Icon size={20} />

              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-5">
        <Link
          href="/api/auth/logout"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            transition
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <LogOut size={20} />

          Logout
        </Link>
      </div>
    </aside>
  );
}