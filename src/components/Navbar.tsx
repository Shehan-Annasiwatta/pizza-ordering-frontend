import React from "react";
import NextLink from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/context/CartContext";

/**
 * Navbar component for the Pizza Ordering Application.
 * Displays brand, navigation links, cart badge, and auth controls.
 */
const Navbar: React.FC = () => {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // TODO: Replace with real auth state
  const isLoggedIn = false;

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Brand / Home Link */}
        <NextLink href="/" passHref>
          <Typography
            variant="h6"
            component="a"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Pizza Shop
          </Typography>
        </NextLink>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1, ml: 3 }} />

        {/* Menu Link */}
        <NextLink href="/menu" passHref>
          <Button color="inherit">Menu</Button>
        </NextLink>

        {/* Cart Icon */}
        <NextLink href="/cart" passHref>
          <IconButton color="inherit">
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </NextLink>

        {/* Authentication Controls */}
        {isLoggedIn ? (
          <NextLink href="/profile" passHref>
            <Button color="inherit">Profile</Button>
          </NextLink>
        ) : (
          <>
            <NextLink href="/login" passHref>
              <Button color="inherit">Login</Button>
            </NextLink>
            <NextLink href="/register" passHref>
              <Button color="inherit">Register</Button>
            </NextLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
