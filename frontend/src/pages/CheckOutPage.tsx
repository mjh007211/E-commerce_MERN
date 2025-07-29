import { Box, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import { useRef } from "react";

export const CheckOutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);

  return (
    <Container sx={{ mt: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" textAlign="center">
          Checkout
        </Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery Address"
        name="address"
        fullWidth
      />
      {cartItems.length ? (
        <Box border="1px solid #f6f6f6">
          <Box mt={2} display="flex" flexDirection="column" gap={4}>
            {cartItems.map((item) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
                key={item.productID}
                padding="10px"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <img src={item.image} width={150} />
                  <Box>
                    <Typography>{item.title}</Typography>
                    <Typography>
                      {item.productQuantity} X {item.productPrice} SR
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Typography variant="h4" mt={2}>
            Total Amount: {totalAmount.toFixed(2)} SR
          </Typography>
        </Box>
      ) : (
        <Typography variant="h5">Cart is empty.</Typography>
      )}
      <Button variant="contained" fullWidth>
        Pay Now
      </Button>
    </Container>
  );
};
