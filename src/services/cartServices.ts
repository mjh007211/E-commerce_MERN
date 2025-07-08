import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

interface CreateUserCart {
  userID: string;
}

interface GetActiveCartForUser {
  userID: string;
}

interface AddItemToCart {
  userID: string;
  productID: any;
  productQuantity: number;
}

const createUserCart = async ({ userID }: CreateUserCart) => {
  const userCart = await cartModel.create({ userID, totalAmount: 0 });
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

export const addItemToCart = async ({
  userID,
  productID,
  productQuantity,
}: AddItemToCart) => {
  const userCart = await getActiveCartForUser({ userID });

  const existsInCart = userCart.items.find(
    (productObject) => productObject.product.toString() === productID
  );

  if (existsInCart) {
    return { data: "the product already existed", statusCode: 400 };
  }

  const product = await productModel.findById(productID);

  if (!product) {
    return { data: "product not found", statusCode: 400 };
  }

  if (productQuantity > product.stock) {
    return { data: "invaild stock quantity", statusCode: 400 };
  }

  userCart.items.push({
    product: productID,
    productPrice: product.price,
    productQuantity,
  });

  userCart.totalAmount += product.price * productQuantity;

  const saveUserCart = await userCart.save();

  return { data: userCart, statusCode: 200 };
};
