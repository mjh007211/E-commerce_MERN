import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IOrderItems {
  productTitle: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
}

export interface IOrder extends Document {
  orderItems: IOrderItems[];
  orderTotal: number;
  address: string;
  userID: ObjectId | string;
}

const orderItemsSchema = new Schema<IOrderItems>({
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
  orderItems: [orderItemsSchema],
  orderTotal: { type: Number, required: true },
  address: { type: String, required: true },
  userID: { type: Schema.Types.ObjectId, ref: "Users", required: true },
});

export const orderModel = mongoose.model<IOrder>("Order", orderSchema);
