import React from 'react';
import { Box, Typography, IconButton, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { getLineTotal, PizzaItem } from '@/types';
import { useCart } from '@/context/CartContext';


interface CartItemProps {
  item: PizzaItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateItem, removeItem } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateItem(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateItem(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  // Unit price = basePrice + toppings total
  const unitPrice = (item.basePrice + item.toppings.reduce((sum, t) => sum + t.price, 0));
  const lineTotal = getLineTotal(item);

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        {/* Pizza Image */}
        <Box
          component="img"
          src={item.imageUrl}
          alt={item.name}
          sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
        />

        {/* Details */}
        <Box flexGrow={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="body2">Crust: {item.crust}</Typography>
          <Typography variant="body2">
            Toppings: {item.toppings.length > 0 ? item.toppings.map(t => t.name).join(', ') : 'None'}
          </Typography>
          <Typography variant="body2">Unit Price: ₹{unitPrice.toFixed(2)}</Typography>
        </Box>

        {/* Quantity Controls */}
        <Stack direction="row" alignItems="center">
          <IconButton size="small" onClick={handleDecrease} disabled={item.quantity <= 1}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>
            {item.quantity}
          </Typography>
          <IconButton size="small" onClick={handleIncrease}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Line Total */}
        <Box>
          <Typography variant="subtitle1">₹{lineTotal.toFixed(2)}</Typography>
        </Box>

        {/* Remove Button */}
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleRemove}
        >
          Remove
        </Button>
      </Stack>
    </Box>
  );
};

export default CartItem;
