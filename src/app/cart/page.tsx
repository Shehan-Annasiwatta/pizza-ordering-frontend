import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const { items, clearCart } = useCart();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Button variant="contained" color="secondary" onClick={clearCart}>
            Clear Cart
          </Button>
        </>
      )}
    </Container>
  );
}
