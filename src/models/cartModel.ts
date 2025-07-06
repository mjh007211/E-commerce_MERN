import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IProduct } from "./productModel";

const cartStatusEnum = ["active", "completed"];

export interface ICartItem extends Document {
  product: IProduct;
  productPrice: number;
  productQuantity: number;
}

export interface ICart extends Document {
  userID: ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema<ICart>({
  userID: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: cartStatusEnum, default: "active" },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
