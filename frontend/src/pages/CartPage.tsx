import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthenticationContext";
import { DATABASE_URL } from "../constants/constants";
import { useCart } from "../context/Cart/CartContext";

export const CartPage = () => {
  const { token } = useAuth();
  const { cartItems, totalAmount } = useCart();

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   const fetchCart = async () => {
  //     const response = await fetch(`${DATABASE_URL}/cart`, {
  //       headers: {
  //         Authorization: `bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       setError("something went wrong fetching the data.");
  //       return;
  //     }

  //     const cart = await response.json();

  //     setCart(cart);
  //   };

  //   fetchCart();
  // }, [token]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Box>{item.title}</Box>
      ))}
    </Container>
  );
};
