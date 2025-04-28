import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import { CrustType, PizzaItem, Topping } from "@/types";

interface CustomizationModalProps {
  open: boolean;
  onClose: () => void;
  pizza: Omit<PizzaItem, "crust" | "toppings" | "quantity">;
  toppingsOptions: Topping[];
  onConfirm: (crust: CrustType, selectedToppings: Topping[]) => void;
}

const crustOptions: CrustType[] = ["Thin", "Normal", "Deep Dish"];

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  open,
  onClose,
  pizza,
  toppingsOptions,
  onConfirm,
}) => {
  const [selectedCrust, setSelectedCrust] = useState<CrustType>("Normal");
  const [selectedToppings, setSelectedToppings] = useState<Set<string>>(
    new Set()
  );

  const handleCrustChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCrust(event.target.value as CrustType);
  };

  const handleToppingToggle = (id: string) => {
    setSelectedToppings((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleConfirm = () => {
    const chosenToppings = toppingsOptions.filter((t) =>
      selectedToppings.has(t.id)
    );
    onConfirm(selectedCrust, chosenToppings);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Customize "{pizza.name}"</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Crust Type</FormLabel>
            <RadioGroup
              row
              value={selectedCrust}
              onChange={handleCrustChange}
              name="crust-options"
            >
              {crustOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>
          <FormControl component="fieldset">
            <FormLabel component="legend">Extra Toppings</FormLabel>
            <FormGroup>
              {toppingsOptions.map((t) => (
                <FormControlLabel
                  key={t.id}
                  control={
                    <Checkbox
                      checked={selectedToppings.has(t.id)}
                      onChange={() => handleToppingToggle(t.id)}
                    />
                  }
                  label={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography>{t.name}</Typography>
                      <Typography>+₹{t.price.toFixed(2)}</Typography>
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomizationModal;
