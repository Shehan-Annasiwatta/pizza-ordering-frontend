"use client";
import { PizzaItem } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  items: PizzaItem[];
  addItem: (item: PizzaItem) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<PizzaItem[]>([]);

  const addItem = (item: PizzaItem) => {
    setItems((prev) => [...prev, item]);
  };

  const updateItem = (id: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
