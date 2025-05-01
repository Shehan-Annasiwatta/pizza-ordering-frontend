import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Topping } from '@/types';
import { CartProvider } from '@/context/CartContext';
import PizzaCard from '../PizzaCard';


const basicPizza = {
  id: 'test-pizza',
  name: 'Test Pizza',
  category: 'Classic' as const,
  imageUrl: '/test.jpg',
  description: 'Delicious test',
  basePrice: 500,
};

const toppingsOptions: Topping[] = [
  { id: 'cheese', name: 'Cheese', price: 50 },
];

describe('PizzaCard', () => {
  it('renders name, description, price and Add to Cart button', () => {
    render(
      <CartProvider>
        <PizzaCard pizza={basicPizza} toppingsOptions={toppingsOptions} />
      </CartProvider>
    );
    expect(screen.getByText(/Test Pizza/)).toBeInTheDocument();
    expect(screen.getByText(/Delicious test/)).toBeInTheDocument();
    expect(screen.getByText(/₹500/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeEnabled();
  });

  it('opens customization modal when clicking Add to Cart', () => {
    render(
      <CartProvider>
        <PizzaCard pizza={basicPizza} toppingsOptions={toppingsOptions} />
      </CartProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    expect(screen.getByText(/Customize "Test Pizza"/)).toBeVisible();
  });
});
