"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: string;
}

interface CartStore {
  items: CartItem[];
  hydrated: boolean;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;

  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity:
                        i.quantity + item.quantity,
                    }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              item,
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== id
          ),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity:
                      item.quantity - 1,
                  }
                : item
            )
            .filter(
              (item) =>
                item.quantity > 0
            ),
        })),

      clearCart: () =>
        set({
          items: [],
        }),

      totalItems: () =>
        get().items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        ),

      subtotal: () =>
        get().items.reduce(
          (total, item) =>
            total +
            item.price *
              item.quantity,
          0
        ),
    }),

    {
      name: "luxury-perfume-cart",

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);