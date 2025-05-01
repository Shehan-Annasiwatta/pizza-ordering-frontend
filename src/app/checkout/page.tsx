"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getLineTotal } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const [billing, setBilling] = useState({ address: "", city: "", zip: "" });
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  const isLoggedIn = true;
  const user = { name: "John Doe", email: "john@example.com" };
  const { items, clearCart } = useCart();

  const handleChangeBilling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const validateCardDetails = () => {
    const { cardNumber, expiry, cvv } = payment;
    const cardNumberDigits = cardNumber.replace(/\s+/g, "");

    if (!/^[0-9]{13,19}$/.test(cardNumberDigits)) {
      return "Invalid card number";
    }

    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) {
      return "Expiry date must be in MM/YY format";
    }

    if (!/^[0-9]{3}$/.test(cvv)) {
      return "CVC must be exactly 3 digits";
    }

    return "";
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!billing.address || !billing.city || !billing.zip) {
      setError("Please fill in all billing fields");
      return;
    }

    if (!payment.cardNumber || !payment.expiry || !payment.cvv) {
      setError("Please fill in all payment fields");
      return;
    }

    const cardValidationError = validateCardDetails();
    if (cardValidationError) {
      setError(cardValidationError);
      return;
    }

    const order = {
      user,
      billing,
      items: items, // ✅ grab cart items from context
      totalAmount: items.reduce((sum, item) => sum + getLineTotal(item), 0),
      createdAt: new Date().toISOString(),
    };

    // ✅ Save order in localStorage
    localStorage.setItem("latestOrder", JSON.stringify(order));

    clearCart(); // optional: clear cart after order

    router.push(`/order-summary?orderId=12345`);
  };

  if (!isLoggedIn) {
    router.push("/login");
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4">Checkout</Typography>
      <Typography variant="subtitle1">
        Logged in as {user.name} ({user.email})
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handlePlaceOrder} sx={{ mt: 3 }}>
        <Typography variant="h6">Billing Address</Typography>
        <TextField
          label="Address"
          name="address"
          fullWidth
          margin="normal"
          value={billing.address}
          onChange={handleChangeBilling}
        />
        <TextField
          label="City"
          name="city"
          fullWidth
          margin="normal"
          value={billing.city}
          onChange={handleChangeBilling}
        />
        <TextField
          label="ZIP Code"
          name="zip"
          fullWidth
          margin="normal"
          value={billing.zip}
          onChange={handleChangeBilling}
        />

        <Typography variant="h6" sx={{ mt: 3 }}>
          Payment Details
        </Typography>
        <TextField
          label="Card Number"
          name="cardNumber"
          fullWidth
          margin="normal"
          value={payment.cardNumber}
          onChange={handleChangePayment}
        />
        <TextField
          label="Expiry Date (MM/YY)"
          name="expiry"
          fullWidth
          margin="normal"
          value={payment.expiry}
          onChange={handleChangePayment}
        />
        <TextField
          label="CVC"
          name="cvv"
          fullWidth
          margin="normal"
          value={payment.cvv}
          onChange={handleChangePayment}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
}
