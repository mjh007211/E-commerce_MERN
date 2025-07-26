import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItems } from "../../type/Cart";
import { DATABASE_URL } from "../../constants/constants";
import { useAuth } from "../auth/AuthenticationContext";

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${DATABASE_URL}/cart`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("something went wrong fetching the data.");
        return;
      }

      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
        ({ product, productQuantity }) => ({
          productID: product._id,
          title: product.title,
          image: product.image,
          productQuantity,
          productPrice: product.price,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productID: string) => {
    try {
      const response = await fetch(`${DATABASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          productID,
          productQuantity: 1,
        }),
      });

      if (!response.ok) {
        setError("something went wrong");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        setError("something went wrong");
      }

      const cartItemsMapped = cart.items.map(
        ({ product, productQuantity }) => ({
          productID: product._id,
          title: product.title,
          image: product.image,
          productQuantity,
          productPrice: product.price,
        })
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemInCart = async (
    productID: string,
    productQuantity: number
  ) => {
    try {
      const response = await fetch(`${DATABASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          productID,
          productQuantity,
        }),
      });

      if (!response.ok) {
        setError("something went wrong");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        setError("something went wrong");
      }

      const cartItemsMapped = cart.items.map(
        ({ product, productQuantity }) => ({
          productID: product._id,
          title: product.title,
          image: product.image,
          productQuantity,
          productPrice: product.price,
        })
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItemInCart = async (productID: string) => {
    try {
      const response = await fetch(`${DATABASE_URL}/cart/items/${productID}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("something went wrong");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        setError("something went wrong");
      }

      const cartItemsMapped = cart.items.map(
        ({ product, productQuantity }) => ({
          productID: product._id,
          title: product.title,
          image: product.image,
          productQuantity,
          productPrice: product.price,
        })
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        deleteItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
