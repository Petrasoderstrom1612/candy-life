import type { Candy, CartItem } from "../services/Types";
import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";

type CartProviderProps = {
  children: React.ReactNode;
};

const CART_STORAGE_KEY = "shopping-cart";
const CART_OPEN_KEY = "shopping-cart-open";

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const jsonCart = localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
      const parsed: CartItem[] = JSON.parse(jsonCart);

      return parsed.map(item => ({
      candy: item.candy ?? {  //fallback
      id: 0,
      name: "Unknown Candy",
      price: 0,
      on_sale: false,
      images: [],
      stock_status: "outofstock",
      stock_quantity: 0,
    },
    quantity: item.quantity ?? 1
  }));
    } catch (error) {
      console.error("Failed to parse cart from local storage", error);
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState<boolean>(()=>{
    if (typeof window === "undefined") return false;
    return localStorage.getItem(CART_OPEN_KEY) === "true";
  });

  const addToCart = (candy: Candy) => {
    setCart(prev => {
      const itemInShoppingCart = prev.find(item => item.candy.id === candy.id);

      if (itemInShoppingCart) {
        if (itemInShoppingCart.quantity < candy.stock_quantity) {
          console.log(`Added 1 more "${candy.name}" to the cart. Total: ${itemInShoppingCart.quantity + 1} of stock ${candy.stock_quantity}`);
          return prev.map(item =>
            item.candy.id === candy.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          console.log(`Cannot add "${candy.name}" — reached max stock of ${candy.stock_quantity}`)
          alert(`Det går tyvärr inte att lägga till fler av "${candy.name}" — max ${candy.stock_quantity} i lager`);
          return prev;
        }
      }

      console.log(`Added "${candy.name}" to the cart.`);
      return [...prev, { candy, quantity: 1 }];
    });
  };

  const removeFromCart = (candyId: number) => {
    setCart(prev =>
      prev.map(item =>
          item.candy.id === candyId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
  setCart([]);
  localStorage.removeItem(CART_STORAGE_KEY);
  };

  const toggleCart = () => setIsOpen(prev => !prev);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    localStorage.setItem(CART_OPEN_KEY, String(isOpen));
  }, [cart,isOpen]);

  return (
    <CartContext.Provider value={{ cart, isOpen, addToCart, removeFromCart, toggleCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
