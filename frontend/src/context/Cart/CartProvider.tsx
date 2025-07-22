import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItems } from "../../type/Cart";

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addItemToCart = (productID: string) => {
    console.log(productID);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
