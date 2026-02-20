import Checkout from "./Checkout";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { HiXCircle } from "react-icons/hi";
import { useCart } from "../context/useCart";
import { useEffect, useState } from "react";

const CHECKOUT_STEP_KEY = "shopping-cart-checkout";

const ShoppingCart = () => {
  const { cart, isOpen, toggleCart, addToCart, removeFromCart, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(() => {
    if (typeof window === "undefined") return false; //default nothing in local storage
    return localStorage.getItem(CHECKOUT_STEP_KEY) === "true";
  });
  const { toast } = useCart()

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  useEffect(() => {
  localStorage.setItem(CHECKOUT_STEP_KEY, String(isCheckout));
  }, [isCheckout]);

  if (!isOpen) return null;

  const handleGoToCheckout = () => {
    setIsCheckout(true);
  };

  if (isCheckout) {
    return <Checkout 
      cart={cart} 
      clearCart={clearCart} 
      onBack={() => setIsCheckout(false)} 
      onCheckoutComplete={() => setIsCheckout(false)} 
      toggleCart={toggleCart}
    />;
  }

  const handleCloseCart = () => {
  setIsCheckout(false);
  toggleCart();
  };

  return !isCheckout && (
    <section className="cart-overlay">
        {toast && (
              <div className="toast-div toast-div-colors">
                <div className="toast-ps-div">
                  <p className="toast-p">{toast.message}</p>
                </div>
                <div className="toast-icon-div">
                  <button className="toast-btn"><HiXCircle className="icon-error"/></button>
                </div> 
              </div>
      )}
      <button
        onClick={handleCloseCart}
        aria-label="Close shopping cart"
        className="shopping-cart-close-btn"
      >
        X
      </button>
      <h3>Varukorg</h3>

      {cart.length === 0 && <p>Tom varukorg</p>}

      {cart.map((item, index) => {
        if (!item?.candy) return null; 

        return (
          <article key={index} className="shopping-cart-item">
            <div className="shopping-item-quantity">
              <p>
                {item.quantity}x {item.candy.name}
              </p>
            </div>
            <div className="price-buttons">
              <p className="price">{item.candy.price * item.quantity} SEK</p>
              <button className="shopping-cart-icon-btn" onClick={() => addToCart(item.candy)}>
                <CiCirclePlus />
              </button>
              <button className="shopping-cart-icon-btn" onClick={() => removeFromCart(item.candy.id)}>
                <CiCircleMinus />
              </button>
            </div>
          </article>
        );
      })}

      {cart.length !== 0 && <p>TOTAL SUMMA: {cart.reduce((sum, item) => sum + item.quantity * item.candy.price, 0)} SEK</p>}
      <button 
      aria-label={cart.length === 0 ? "Inga artiklar i varukorgen. Du måste lägg till dem först för att gå till kassan." : "Gå till kassan"}
      className={`go-to-shopping-form-btn ${cart.length === 0 ? "sr-only" : ""}`} 
      disabled={cart.length === 0} 
      onClick={handleGoToCheckout}>
        {cart.length === 0 ? <span className="sr-only">Inga artiklar i varukorgen</span> : "Gå till kassan"}
      </button>
    </section>
  )
};

export default ShoppingCart;
