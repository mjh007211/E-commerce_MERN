import express from "express";
import { fetchAllProduct } from "../services/productServices";

const router = express.Router();

router.get("/", async (req, res) => {
  const fetchProducts = await fetchAllProduct();

  res.status(200).send(fetchProducts);
});

export default router;
