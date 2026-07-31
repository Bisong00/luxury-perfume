import { ReactNode } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
        flex
        min-h-screen
        bg-[#f8f8f8]
      "
    >
      <AdminSidebar />

      <main
        className="
          flex-1
          overflow-y-auto
          p-10
        "
      >
        {children}
      </main>
    </div>
  );
}