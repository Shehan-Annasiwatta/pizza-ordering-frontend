import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "../page";
import * as CartContext from "@/context/CartContext";

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock our Cart context
jest.mock("@/context/CartContext");

describe("CartPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows empty-cart message when there are no items", () => {
    (CartContext.useCart as jest.Mock).mockReturnValue({
      items: [],
      clearCart: jest.fn(),
    });

    render(<CartPage />);
    expect(screen.getByText(/Your cart is empty\./)).toBeInTheDocument();
  });

  it("displays items and correct total when cart has items", () => {
    const mockItem = {
      id: "1",
      name: "Test Pizza",
      category: "Classic",
      imageUrl: "/test.jpg",
      description: "Desc",
      basePrice: 400,
      crust: "Normal",
      toppings: [],
      quantity: 2,
    };
    (CartContext.useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      clearCart: jest.fn(),
    });

    render(<CartPage />);
    expect(screen.getByText(/Test Pizza/)).toBeInTheDocument();
    expect(screen.getByText(/Total: ₹800/)).toBeInTheDocument();
  });

  it('calls clearCart when "Clear Cart" button is clicked', () => {
    const mockItem = {
      /* same shape as above, quantity:1 */ id: "1",
      name: "Test Pizza",
      category: "Classic",
      imageUrl: "/test.jpg",
      description: "Desc",
      basePrice: 400,
      crust: "Normal",
      toppings: [],
      quantity: 1,
    };
    const clearCart = jest.fn();
    (CartContext.useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      clearCart,
    });

    render(<CartPage />);
    fireEvent.click(screen.getByRole("button", { name: /Clear Cart/i }));
    expect(clearCart).toHaveBeenCalled();
  });

  it('navigates to /checkout when "Proceed to Checkout" is clicked', () => {
    const mockItem = {
      id: "1",
      name: "Test Pizza",
      category: "Classic",
      imageUrl: "/test.jpg",
      description: "Desc",
      basePrice: 500,
      crust: "Thin",
      toppings: [],
      quantity: 1,
    };
    (CartContext.useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      clearCart: jest.fn(),
    });

    render(<CartPage />);
    fireEvent.click(
      screen.getByRole("button", { name: /Proceed to Checkout/i })
    );
    expect(mockPush).toHaveBeenCalledWith("/checkout");
  });
});
