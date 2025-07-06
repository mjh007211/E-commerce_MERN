import express from "express";
import { getActiveCartForUser } from "../services/cartServices";

const router = express.Router();

router.get("/", async (req, res) => {
  const userCart = await getActiveCartForUser({ userID: "mjh" });
  res.status(200).send(userCart);
});

export default router;
