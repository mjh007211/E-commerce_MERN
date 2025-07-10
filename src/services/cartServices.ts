import { cartModel } from "../models/cartModel";
import { IOrderItems, orderModel } from "../models/orderModel";
import { productModel } from "../models/productModel";
import { calculateExistingProductTotal } from "../utils/calculateExistingProductTotal";

interface CreateUserCart {
  userID: string;
}
interface DeleteUserCart {
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

interface UpdateProductInCart {
  userID: string;
  productID: any;
  productQuantity: number;
}

interface DeleteProductInCart {
  userID: string;
  productID: any;
}

interface Checkout {
  userID: string;
  address: string;
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

export const clearCart = async ({ userID }: DeleteUserCart) => {
  const userCart = await getActiveCartForUser({ userID });
  userCart.items = [];
  userCart.totalAmount = 0;

  const saveUserCart = await userCart.save();

  return { data: userCart, statusCode: 200 };
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

export const updateProductInCart = async ({
  userID,
  productID,
  productQuantity,
}: UpdateProductInCart) => {
  const userCart = await getActiveCartForUser({ userID });

  const existsInCart = userCart.items.find(
    (productObject) => productObject.product.toString() === productID
  );

  if (!existsInCart) {
    return { data: "the product not existed in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productID);

  if (!product) {
    return { data: "product not found", statusCode: 400 };
  }

  if (productQuantity > product.stock) {
    return { data: "invaild stock quantity", statusCode: 400 };
  }

  const otherExistingProduct = userCart.items.filter(
    (productObject) => productObject.product.toString() !== productID
  );

  let total = calculateExistingProductTotal({
    cartItems: otherExistingProduct,
  });

  existsInCart.productQuantity = productQuantity;
  total += existsInCart.productQuantity * existsInCart.productPrice;

  userCart.totalAmount = total;

  const saveUserCart = await userCart.save();
  return { data: userCart, statusCode: 200 };
};

export const deleteProductInCart = async ({
  userID,
  productID,
}: DeleteProductInCart) => {
  const userCart = await getActiveCartForUser({ userID });

  const existsInCart = userCart.items.find(
    (productObject) => productObject.product.toString() === productID
  );

  if (!existsInCart) {
    return { data: "the product not existed in cart", statusCode: 400 };
  }

  const otherExistingProduct = userCart.items.filter(
    (productObject) => productObject.product.toString() !== productID
  );

  const total = calculateExistingProductTotal({
    cartItems: otherExistingProduct,
  });

  userCart.items = otherExistingProduct;

  userCart.totalAmount = total;

  const saveUserCart = await userCart.save();
  return { data: userCart, statusCode: 200 };
};

export const checkout = async ({ userID, address }: Checkout) => {
  const userCart = await getActiveCartForUser({ userID });
  const orderItems: IOrderItems[] = [];

  for (const item of userCart.items) {
    const product = await productModel.findById(item.product);

    if (!product) {
      return { data: "product not found", statusCode: 400 };
    }

    const orderItem: IOrderItems = {
      productTitle: product.title,
      productImage: product.image,
      productQuantity: item.productQuantity,
      productPrice: item.productPrice,
    };

    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    userID,
    orderTotal: userCart.totalAmount,
    address,
  });

  const saveOrder = await order.save();

  userCart.status = "completed";
  const saveUserCart = await userCart.save();

  return { data: order, statusCode: 200 };
};
