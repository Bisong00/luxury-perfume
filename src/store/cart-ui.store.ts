"use client";

import { create } from "zustand";

interface CartUIStore {
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartUIStore = create<CartUIStore>(
  (set) => ({
    open: false,

    openCart: () =>
      set({
        open: true,
      }),

    closeCart: () =>
      set({
        open: false,
      }),
  })
);