import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthenticationContext";
import { DATABASE_URL } from "../constants/constants";

export const CartPage = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${DATABASE_URL}/cart`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("something went wrong fetching the data.");
        return;
      }

      const cart = await response.json();

      setCart(cart);
    };

    fetchCart();
  }, [token]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
    </Container>
  );
};
