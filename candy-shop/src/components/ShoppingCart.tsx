import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useCart } from "../context/useCart";

const ShoppingCart = () => {
  const { cart, isOpen, toggleCart, addToCart, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
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
            <p>{item.quantity}x {item.candy.name}</p>
          </div>
          <div className="price-buttons">
            <p className="price">{item.candy.price} SEK</p>
            <button onClick={() => addToCart(item.candy)}>
              <CiCirclePlus />
            </button>
            <button onClick={() => removeFromCart(item.candy.id)}>
              <CiCircleMinus />
            </button>
          </div>
        </article>
      );
    })}

      <button className="go-to-shopping-form-btn">Gå till kassan</button>
    </section>
  );
};

export default ShoppingCart;
