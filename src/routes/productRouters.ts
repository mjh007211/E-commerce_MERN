import express from "express";
import { fetchAllProduct } from "../services/productServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const fetchProducts = await fetchAllProduct();

    res.status(200).send(fetchProducts);
  } catch {
    res.status(500).send("something went wrong");
  }
});

export default router;
