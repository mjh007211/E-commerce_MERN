import { createContext, useContext } from "react";
import type { CartItems } from "../../type/Cart";

interface CartContextType {
  cartItems: CartItems[];
  totalAmount: number;
  addItemToCart: (productID: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
});

export const useCart = () => useContext(CartContext);
