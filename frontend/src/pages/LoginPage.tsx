import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { DATABASE_URL } from "../constants/constants";
import { useAuth } from "../context/auth/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigator = useNavigate();

  const onSubmitHandler = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return;
    }

    const response = await fetch(`${DATABASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      console.log("something went wrong");
      return;
    }

    const token = await response.json();

    if (!token) {
      return;
    }

    login(email, token);
    navigator("/");
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">Login to Your Account</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField label="Email" name="email" inputRef={emailRef} />
          <TextField
            label="Password"
            type="password"
            name="password"
            inputRef={passwordRef}
          />
          <Button onClick={onSubmitHandler} variant="contained">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
