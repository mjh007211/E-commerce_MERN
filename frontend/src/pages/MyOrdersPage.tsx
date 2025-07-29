import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/auth/AuthenticationContext";
import { useEffect } from "react";

export const MyOrdersPage = () => {
  const { myOrders, fetchMyOrders } = useAuth();

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
        gap: "20px",
      }}
    >
      {myOrders.map(({ _id, address, orderItems, orderTotal }) => (
        <Box key={_id}>
          <Typography>Address: {address}</Typography>
          <Typography>Items: {orderItems.length}</Typography>
          <Typography>Total: {orderTotal}</Typography>
        </Box>
      ))}
    </Container>
  );
};
