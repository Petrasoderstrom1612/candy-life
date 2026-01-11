import Checkout from "./Checkout";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useCart } from "../context/useCart";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const { cart, isOpen, toggleCart, addToCart, removeFromCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);
  if (!isOpen) return null;

  const handleGoToCheckout = () => {
    setIsCheckout(true);
  };

  if (isCheckout) {
    return <Checkout cart={cart} onBack={() => setIsCheckout(false)} toggleCart={toggleCart}/>;
  }

  return !isCheckout && (
    <section className="cart-overlay">
      <button
        onClick={toggleCart}
        aria-label="Close shopping cart"
        className="shopping-cart-close-btn"
      >
        X
      </button>
      <h3>Varukorg</h3>

      {cart.length === 0 && <p>Tom varukorg</p>}

      {cart.map((item, index) => {
        if (!item?.candy) return null; // skip invalid items

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

      <p>
        TOTAL SUMMA:{" "}
        {cart.reduce((sum, item) => sum + item.quantity * item.candy.price, 0)}{" "}
        SEK
      </p>
      <button className="go-to-shopping-form-btn" onClick={handleGoToCheckout}>
        Gå till kassan
      </button>
    </section>
  )
};

export default ShoppingCart;
