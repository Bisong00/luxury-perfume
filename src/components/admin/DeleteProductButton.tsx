"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteProductButtonProps {
  id: string;
}

export default function DeleteProductButton({
  id,
}: DeleteProductButtonProps) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);


  async function handleDelete() {

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if (!confirmed) return;


    try {

      setLoading(true);


      const response = await fetch(
        `/api/admin/products/${id}`,
        {
          method: "DELETE",
        }
      );


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }


      router.refresh();


    } catch (error) {

      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete product."
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="
        rounded-lg
        bg-red-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-red-700
        disabled:opacity-50
      "
    >

      <Trash2
        size={16}
        className="mr-2 inline"
      />

      {loading
        ? "Deleting..."
        : "Delete"}

    </button>
  );
}