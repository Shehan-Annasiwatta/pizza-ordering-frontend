import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PizzaItem } from '@/types';
import { CartProvider } from '@/context/CartContext';
import CartItem from '../CartItem';


const mockItem: PizzaItem = {
  id: '1',
  name: 'Mock Pizza',
  category: 'Regular',
  imageUrl: '/mock.jpg',
  description: 'Mock',
  basePrice: 300,
  crust: 'Thin',
  toppings: [{ id: 'pepper', name: 'Pepper', price: 20 }],
  quantity: 2,
};

describe('CartItem', () => {
  it('displays name, crust, toppings, unit price and quantity', () => {
    render(
      <CartProvider>
        <CartItem item={mockItem} />
      </CartProvider>
    );
    expect(screen.getByText(/Mock Pizza/)).toBeInTheDocument();
    expect(screen.getByText(/Crust: Thin/)).toBeInTheDocument();
    expect(screen.getByText(/Pepper/)).toBeInTheDocument();
    expect(screen.getByText(/₹320/)).toBeInTheDocument();  // basePrice + topping
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('increments and decrements quantity correctly', () => {
    render(
      <CartProvider>
        <CartItem item={mockItem} />
      </CartProvider>
    );
    const increase = screen.getByRole('button', { name: /AddIcon/i });
    const decrease = screen.getByRole('button', { name: /RemoveIcon/i });
    fireEvent.click(increase);
    expect(screen.getByText('3')).toBeInTheDocument();
    fireEvent.click(decrease);
    fireEvent.click(decrease);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
