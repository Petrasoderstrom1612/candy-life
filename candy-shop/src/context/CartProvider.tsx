import { useState, useEffect } from "react";
import type { Candy, CartItem } from "../services/Types";
import { CartContext } from "./CartContext";

type CartProviderProps = {
  children: React.ReactNode;
};

const CART_STORAGE_KEY = "shopping-cart";

const CartProvider = ({ children }: CartProviderProps) => {
  // State holds CartItem[] instead of just Candy[]
const [cart, setCart] = useState<CartItem[]>(() => {
  try {
    const jsonCart = localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
    const parsed: CartItem[] = JSON.parse(jsonCart);

    // Ensure all items have `candy` and `quantity`
    return parsed.map(item => ({
      candy: item.candy,       // could add fallback if undefined
      quantity: item.quantity ?? 1
    }));
  } catch (error) {
    console.error("Failed to parse cart from local storage", error);
    return [];
  }
});

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Add candy to cart with quantity handling
  const addToCart = (candy: Candy) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.candy.id === candy.id);

      // If item exists, increment quantity (respect stock)
      if (existingItem) {
        if (existingItem.quantity < candy.stock_quantity) {
          return prev.map(item =>
            item.candy.id === candy.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          alert(`Du kan inte lägga till fler än ${candy.stock_quantity} av "${candy.name}"`);
          return prev;
        }
      }

      // If item not in cart, add it with quantity 1
      return [...prev, { candy, quantity: 1 }];
    });
  };

  const removeFromCart = (candyId: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.candy.id === candyId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const toggleCart = () => setIsOpen(prev => !prev);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, isOpen, addToCart, removeFromCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
