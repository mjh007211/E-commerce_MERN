import express from "express";
import { login, signUp } from "../modles/services/usersServices";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { data, statusCode } = await signUp({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(statusCode).send(data);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, statusCode } = await login({
    email,
    password,
  });
  res.status(statusCode).send(data);
});

export default router;
