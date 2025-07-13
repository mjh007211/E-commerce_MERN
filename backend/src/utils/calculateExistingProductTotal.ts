import { ICartItem } from "../models/cartModel";

export const calculateExistingProductTotal = ({
  cartItems,
}: {
  cartItems: ICartItem[];
}) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.productQuantity * product.productPrice;
    return sum;
  }, 0);

  return total;
};
