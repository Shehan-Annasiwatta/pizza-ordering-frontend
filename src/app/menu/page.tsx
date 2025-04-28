"use client";
import React, { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import { getPizzas, getToppings, PizzaProduct } from "@/utils/api";
import { Topping } from "@/types";
import PizzaCard from "@/components/PizzaCard";

export default function MenuPage() {
  // Load mock data
  const pizzas = getPizzas();
  const toppingsOptions: Topping[] = getToppings();

  // Category state
  const [category, setCategory] = useState<"Supreme" | "Regular" | "Classic">(
    "Supreme"
  );

  // Filter by selected category
  const filtered = pizzas.filter((p) => p.category === category);

  return (
    <Container sx={{ py: 4 }}>
      <Tabs
        value={category}
        onChange={(_, value) => setCategory(value)}
        centered
      >
        <Tab label="Supreme" value="Supreme" />
        <Tab label="Regular" value="Regular" />
        <Tab label="Classic" value="Classic" />
      </Tabs>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        mt={3}
      >
        {filtered.map((pizza: PizzaProduct) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            toppingsOptions={toppingsOptions}
          />
        ))}
      </Box>
    </Container>
  );
}
