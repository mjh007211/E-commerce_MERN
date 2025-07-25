import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { DATABASE_URL } from "../constants/constants";
import { useAuth } from "../context/auth/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigator = useNavigate();

  const onSubmitHandler = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstName || !lastName || !email || !password) {
      return;
    }

    const response = await fetch(`${DATABASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError(true);
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
        <Typography variant="h4">Registration New Account</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            inputRef={firstNameRef}
          />
          <TextField label="Last Name" name="lastName" inputRef={lastNameRef} />
          <TextField label="Email" name="email" inputRef={emailRef} />
          <TextField
            label="Password"
            type="password"
            name="password"
            inputRef={passwordRef}
          />
          <Button onClick={onSubmitHandler} variant="contained">
            Register Now
          </Button>
          {error && (
            <Typography sx={{ color: "red" }}>
              User already existed!, try to register with new informations.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};
