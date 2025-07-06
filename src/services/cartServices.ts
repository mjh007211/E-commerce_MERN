import { cartModel } from "../models/cartModel";

interface CreateUserCart {
  userID: string;
}

interface GetActiveCartForUser {
  userID: string;
}

const createUserCart = async ({ userID }: CreateUserCart) => {
  const userCart = await cartModel.create({ userID });
  await userCart.save();
  return userCart;
};

export const getActiveCartForUser = async ({
  userID,
}: GetActiveCartForUser) => {
  let userCart = await cartModel.findOne({ userID, status: "active" });

  if (!userCart) {
    userCart = await createUserCart({ userID });
  }

  return userCart;
};
