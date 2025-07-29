import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const OrderSuccessPage = () => {
  const navigator = useNavigate();
  const handleBackToHome = () => {
    navigator("/");
  };
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
      <CheckCircleOutline sx={{ fontSize: "80px", color: "green" }} />
      <Typography variant="h3">Thank you for choosing Tech Hub</Typography>
      <Typography variant="h5">Your order is on the way</Typography>
      <Button variant="contained" onClick={handleBackToHome}>
        Back to home
      </Button>
    </Container>
  );
};
