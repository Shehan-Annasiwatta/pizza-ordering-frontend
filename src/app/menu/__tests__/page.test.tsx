import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { getPizzas, getToppings, PizzaProduct } from "@/utils/api";
import { Topping } from "@/types";
import { CartProvider } from "@/context/CartContext";
import MenuPage from "../page";

// Mock the api module that MenuPage imports
jest.mock("../../../utils/api", () => ({
  getPizzas: jest.fn(),
  getToppings: jest.fn(),
}));

describe("MenuPage", () => {
  const mockPizzas: PizzaProduct[] = [
    {
      id: "p1",
      name: "Supreme Pizza",
      category: "Supreme",
      imageUrl: "/supreme.jpg",
      description: "Tasty",
      basePrice: 900,
    },
    {
      id: "p2",
      name: "Regular Pizza",
      category: "Regular",
      imageUrl: "/regular.jpg",
      description: "Good",
      basePrice: 650,
    },
    {
      id: "p3",
      name: "Classic Pizza",
      category: "Classic",
      imageUrl: "/classic.jpg",
      description: "Simple",
      basePrice: 400,
    },
  ];
  const mockToppings: Topping[] = [{ id: "cheese", name: "Cheese", price: 50 }];

  beforeEach(() => {
    // Provide mock return values
    (getPizzas as jest.Mock).mockReturnValue(mockPizzas);
    (getToppings as jest.Mock).mockReturnValue(mockToppings);
  });

  it("renders only Supreme pizzas on initial load", () => {
    render(
      <CartProvider>
        <MenuPage />
      </CartProvider>
    );
    expect(screen.getByText(/Supreme Pizza/)).toBeInTheDocument();
    expect(screen.queryByText(/Regular Pizza/)).toBeNull();
    expect(screen.queryByText(/Classic Pizza/)).toBeNull();
  });

  it("renders Regular pizzas after clicking Regular tab", () => {
    render(
      <CartProvider>
        <MenuPage />
      </CartProvider>
    );
    fireEvent.click(screen.getByRole("tab", { name: /Regular/ }));
    expect(screen.getByText(/Regular Pizza/)).toBeInTheDocument();
    expect(screen.queryByText(/Supreme Pizza/)).toBeNull();
  });

  it("renders Classic pizzas after clicking Classic tab", () => {
    render(
      <CartProvider>
        <MenuPage />
      </CartProvider>
    );
    fireEvent.click(screen.getByRole("tab", { name: /Classic/ }));
    expect(screen.getByText(/Classic Pizza/)).toBeInTheDocument();
    expect(screen.queryByText(/Supreme Pizza/)).toBeNull();
  });
});
