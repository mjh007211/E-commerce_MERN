import { fetchMyOrders, login, signUp } from "../services/usersServices";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequst } from "../types/extendRequst";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, statusCode } = await signUp({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("something went wrong");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode } = await login({
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("something went wrong");
  }
});

router.get(
  "/my-orders",
  validateJWT,
  async (req: ExtendRequst, res: Response) => {
    try {
      const userID = req.user._id;
      const { data, statusCode } = await fetchMyOrders({ userID });
      res.status(statusCode).send(data);
    } catch {
      res.status(500).send("something went wrong");
    }
  }
);

export default router;
