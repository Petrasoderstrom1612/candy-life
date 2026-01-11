import { useState, useEffect } from "react";
import type { Candy } from "../services/Types";
import { CartContext } from "./CartContext";

type CartProviderProps = {
  children: React.ReactNode;
};

const CART_STORAGE_KEY = "shopping-cart"

const CartProvider = ({ children }: CartProviderProps) => {//state holder
const [cart, setCart] = useState<Candy[]>(() => {
  try {
    const jsonCart = localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
    const cart: Candy[] = JSON.parse(jsonCart);
    return cart;
  } catch (error) {
    console.error("Failed to parse from local storage", error);
    return [];
  }
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addToCart = (candy: Candy) => {
    console.log("Added to cart:", candy);
    setCart(prev => [...prev, candy]);
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
    console.log("Cart open:", !isOpen);
  };

  useEffect(() => {
    const jsonCart = JSON.stringify(cart)
    localStorage.setItem(CART_STORAGE_KEY, jsonCart)
  })

  return (
    <CartContext.Provider value={{ cart, isOpen, addToCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
