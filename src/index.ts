import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("conncting to e-commerce DB!"))
  .catch((err) => console.log(`faild to connect! ${err}`));

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
