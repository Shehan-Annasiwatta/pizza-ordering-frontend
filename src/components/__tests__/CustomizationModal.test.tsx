import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Topping } from "@/types";
import CustomizationModal from "../CustomizationModal";

describe("CustomizationModal", () => {
  const mockPizza = {
    id: "test-pizza",
    name: "Test Pizza",
    category: "Classic" as const,
    imageUrl: "/test.jpg",
    description: "Test Description",
    basePrice: 500,
  };

  const toppingsOptions: Topping[] = [
    { id: "cheese", name: "Extra Cheese", price: 50 },
    { id: "pepperoni", name: "Pepperoni", price: 70 },
  ];

  const onClose = jest.fn();
  const onConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correct title and options", () => {
    render(
      <CustomizationModal
        open={true}
        onClose={onClose}
        pizza={mockPizza}
        toppingsOptions={toppingsOptions}
        onConfirm={onConfirm}
      />
    );

    // Title
    expect(screen.getByText(/Customize "Test Pizza"/)).toBeInTheDocument();

    // Crust options
    expect(screen.getByLabelText("Thin")).toBeInTheDocument();
    expect(screen.getByLabelText("Normal")).toBeInTheDocument();
    expect(screen.getByLabelText("Deep Dish")).toBeInTheDocument();

    // Topping options
    toppingsOptions.forEach((t) => {
      expect(
        screen.getByLabelText(new RegExp(t.name, "i"))
      ).toBeInTheDocument();
    });
  });

  it("calls onClose when Cancel is clicked", () => {
    render(
      <CustomizationModal
        open={true}
        onClose={onClose}
        pizza={mockPizza}
        toppingsOptions={toppingsOptions}
        onConfirm={onConfirm}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("selects crust and toppings and calls onConfirm with correct args", () => {
    render(
      <CustomizationModal
        open={true}
        onClose={onClose}
        pizza={mockPizza}
        toppingsOptions={toppingsOptions}
        onConfirm={onConfirm}
      />
    );

    // Select Deep Dish crust
    fireEvent.click(screen.getByLabelText("Deep Dish"));

    // Select both toppings
    fireEvent.click(screen.getByLabelText(/Extra Cheese/));
    fireEvent.click(screen.getByLabelText(/Pepperoni/));

    // Click Add to Cart
    fireEvent.click(screen.getByRole("button", { name: /Add to Cart/i }));

    // Expect onConfirm called with selected crust and toppings array
    expect(onConfirm).toHaveBeenCalledWith(
      "Deep Dish",
      expect.arrayContaining([
        expect.objectContaining({ id: "cheese" }),
        expect.objectContaining({ id: "pepperoni" }),
      ])
    );
  });

  it("does not call onConfirm when modal is closed", () => {
    render(
      <CustomizationModal
        open={false}
        onClose={onClose}
        pizza={mockPizza}
        toppingsOptions={toppingsOptions}
        onConfirm={onConfirm}
      />
    );
    // Modal not visible, Cancel/Add shouldn't be in document
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
