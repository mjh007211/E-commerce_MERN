import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" textAlign="center">
        My Cart
      </Typography>
      <Box mt={2} display="flex" flexDirection="column" gap={4}>
        {cartItems.map((item) => (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            key={item.productID}
            border="1px solid #f6f6f6"
            padding="10px"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <img src={item.image} width={150} />
              <Box>
                <Typography>{item.title}</Typography>
                <Typography>
                  {item.productQuantity} X {item.productPrice} SR
                </Typography>
                <Button>Delete Item</Button>
              </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button>+</Button>
              <Button>-</Button>
            </ButtonGroup>
          </Box>
        ))}
      </Box>
      <Typography mt={2}>Total Amount: {totalAmount.toFixed(2)} SR</Typography>
    </Container>
  );
};
