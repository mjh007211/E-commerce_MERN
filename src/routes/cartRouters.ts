import express, { Request, Response } from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteProductInCart,
  getActiveCartForUser,
  updateProductInCart,
} from "../services/cartServices";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequst } from "../types/extendRequst";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequst, res: Response) => {
  try {
    const userID = req.user._id;
    const userCart = await getActiveCartForUser({ userID });
    res.status(200).send(userCart);
  } catch {
    res.status(500).send("something went wrong");
  }
});

router.delete("/", validateJWT, async (req: ExtendRequst, res: Response) => {
  try {
    const userID = req.user._id;
    const response = await clearCart({ userID });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("something went wrong");
  }
});

router.post("/items", validateJWT, async (req: ExtendRequst, res: Response) => {
  try {
    const userID = req.user._id;
    const { productID, productQuantity } = req.body;
    const response = await addItemToCart({
      userID,
      productID,
      productQuantity,
    });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("something went wrong");
  }
});

router.put("/items", validateJWT, async (req: ExtendRequst, res: Response) => {
  try {
    const userID = req.user._id;
    const { productID, productQuantity } = req.body;
    const response = await updateProductInCart({
      userID,
      productID,
      productQuantity,
    });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("something went wrong");
  }
});

router.delete(
  "/items/:productID",
  validateJWT,
  async (req: ExtendRequst, res: Response) => {
    try {
      const userID = req.user._id;
      const { productID } = req.params;
      const response = await deleteProductInCart({
        userID,
        productID,
      });
      res.status(response.statusCode).send(response.data);
    } catch {
      res.status(500).send("something went wrong");
    }
  }
);

router.post("/checkout", validateJWT, async (req: ExtendRequst, res) => {
  try {
    const userID = req.user._id;
    const { address } = req.body;
    const response = await checkout({ userID, address });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("something went wrong");
  }
});

export default router;
