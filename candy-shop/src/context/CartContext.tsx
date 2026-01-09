import { createContext } from "react";
import type { CartContextType } from "../services/Types";

export const CartContext = createContext<CartContextType | null>(null);