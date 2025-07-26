import { createContext, useContext } from "react";
import type { CartItems } from "../../type/Cart";

interface CartContextType {
  cartItems: CartItems[];
  totalAmount: number;
  addItemToCart: (productID: string) => void;
  updateItemInCart: (productID: string, productQuantity: number) => void;
  deleteItemInCart: (productID: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  deleteItemInCart: () => {},
});

export const useCart = () => useContext(CartContext);
