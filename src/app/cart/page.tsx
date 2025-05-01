'use client';

import React, { useState } from 'react';
import { Container, Typography, Button, Divider, Box, Alert } from '@mui/material';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { getLineTotal } from '@/types';
import CartItem from '@/components/CartItem';


export default function CartPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState('');

  const totalPrice = items.reduce((sum, item) => sum + getLineTotal(item), 0);

  const isLoggedIn = true; // ✅ replace with auth state later

  const handleCheckout = () => {
    setError('');

    if (!items.length) {
      setError('Cannot checkout with an empty cart');
      return;
    }

    if (!isLoggedIn) {
      setError('You must be logged in to checkout');
      setTimeout(() => router.push('/login'), 1500); // auto redirect
      return;
    }

    router.push('/checkout');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Total: ₹{totalPrice.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </Box>

          <Button variant="outlined" color="error" onClick={clearCart} sx={{ mt: 2 }}>
            Clear Cart
          </Button>
        </>
      )}
    </Container>
  );
}
