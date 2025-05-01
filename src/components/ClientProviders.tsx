"use client";

import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme";
import { CartProvider } from "../context/CartContext";
import Navbar from "./Navbar";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Navbar />
        {children}
      </CartProvider>
    </ThemeProvider>
  );
}
