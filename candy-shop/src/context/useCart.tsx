import { useContext } from "react";
import { CartContext } from "./CartContext";
import type { CartContextType } from "../services/Types";

export const useCart = (): CartContextType => { //shortcut for useContext(CartContext)
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
