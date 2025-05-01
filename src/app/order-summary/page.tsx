"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Typography, Box, Button, Divider } from "@mui/material";

export default function OrderSummaryPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "N/A";
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("latestOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Your order (ID: {orderId}) was placed successfully!
      </Typography>

      {order && (
        <>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">
              Customer: {order.user.name} ({order.user.email})
            </Typography>
            <Typography variant="subtitle1">
              Billing Address: {order.billing.address}, {order.billing.city},{" "}
              {order.billing.zip}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Items Purchased:</Typography>
          {order.items.map((item: any, idx: number) => (
            <Box key={idx} sx={{ mt: 1 }}>
              <Typography>
                - {item.name} x {item.quantity} (₹{item.basePrice} + toppings)
              </Typography>
            </Box>
          ))}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Amount: ₹{order.totalAmount.toFixed(2)}
          </Typography>
        </>
      )}

      <Button
        variant="contained"
        sx={{ mt: 4 }}
        fullWidth
        onClick={() => router.push("/menu")}
      >
        Back to Menu
      </Button>
    </Container>
  );
}
