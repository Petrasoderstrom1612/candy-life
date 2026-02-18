import { createContext } from "react";
import type { CartContextType } from "../types/Types";

export const CartContext = createContext<CartContextType | null>(null);