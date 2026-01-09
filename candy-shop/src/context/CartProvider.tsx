import { useState } from "react";
import type { Candy } from "../services/Types";
import { CartContext } from "./CartContext";

type CartProviderProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProviderProps) => {//state holder
  const [cart, setCart] = useState<Candy[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addToCart = (candy: Candy) => {
    console.log("Added to cart:", candy);
    setCart(prev => [...prev, candy]);
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
    console.log("Cart open:", !isOpen);
  };

  return (
    <CartContext.Provider value={{ cart, isOpen, addToCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
