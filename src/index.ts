import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import { seedInitialPorducts } from "./services/productServices";
import productRouters from "./routes/productRouters";
import cartRouters from "./routes/cartRouters";

require("dotenv").config();

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("conncting to e-commerce DB!"))
  .catch((err) => console.log(`faild to connect! ${err}`));

seedInitialPorducts();

app.use("/user", userRoutes);
app.use("/product", productRouters);
app.use("/cart", cartRouters);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
