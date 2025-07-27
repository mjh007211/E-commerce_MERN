import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    deleteItemInCart,
    clearCart,
  } = useCart();

  const handleUpdateQuantity = (productID: string, productQuantity: number) => {
    if (productQuantity <= 0) {
      return;
    }
    updateItemInCart(productID, productQuantity);
  };

  const handleDeleteItemInCart = (productID: string) => {
    deleteItemInCart(productID);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" textAlign="center">
          My Cart
        </Typography>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </Box>
      {cartItems.length ? (
        <Box>
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
                    <Button
                      onClick={() => handleDeleteItemInCart(item.productID)}
                    >
                      Delete Item
                    </Button>
                  </Box>
                </Box>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.productID,
                        item.productQuantity + 1
                      )
                    }
                  >
                    +
                  </Button>
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.productID,
                        item.productQuantity - 1
                      )
                    }
                  >
                    -
                  </Button>
                </ButtonGroup>
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
    </Container>
  );
};
