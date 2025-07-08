import express, { Request, Response } from "express";
import { addItemToCart, getActiveCartForUser } from "../services/cartServices";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequst } from "../types/extendRequst";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequst, res: Response) => {
  const userID = req.user._id;
  const userCart = await getActiveCartForUser({ userID });
  res.status(200).send(userCart);
});

router.post("/items", validateJWT, async (req: ExtendRequst, res: Response) => {
  const userID = req.user._id;
  const { productID, productQuantity } = req.body;
  const response = await addItemToCart({ userID, productID, productQuantity });
  res.status(response.statusCode).send(response.data);
});

export default router;
