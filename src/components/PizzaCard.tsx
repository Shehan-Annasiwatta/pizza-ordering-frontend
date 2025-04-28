import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { PizzaItem, Topping } from "@/types";
import { useCart } from "@/context/CartContext";
import CustomizationModal from "./CustomizationModal";

interface PizzaCardProps {
  /**
   * Base pizza data (no customization applied yet)
   */
  pizza: Omit<PizzaItem, "crust" | "toppings" | "quantity">;
  /**
   * List of available toppings to choose from
   */
  toppingsOptions: Topping[];
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza, toppingsOptions }) => {
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();

  /**
   * When customization is confirmed, build a PizzaItem and add to cart
   */
  const handleConfirm = (
    crust: PizzaItem["crust"],
    selectedToppings: Topping[]
  ) => {
    const customizationId = selectedToppings
      .map((t) => t.id)
      .sort()
      .join("-");
    const newItem: PizzaItem = {
      ...pizza,
      crust,
      toppings: selectedToppings,
      quantity: 1,
      id: `${pizza.id}-${crust}-${customizationId}`,
    };
    addItem(newItem);
  };

  return (
    <>
      <Card sx={{ width: 280, m: 1 }}>
        <CardMedia
          component="img"
          height="160"
          image={pizza.imageUrl}
          alt={pizza.name}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {pizza.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pizza.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            ₹{pizza.basePrice.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>

      <CustomizationModal
        open={open}
        onClose={() => setOpen(false)}
        pizza={pizza}
        toppingsOptions={toppingsOptions}
        onConfirm={(crust, selectedToppings) => {
          handleConfirm(crust, selectedToppings);
          setOpen(false);
        }}
      />
    </>
  );
};

export default PizzaCard;
