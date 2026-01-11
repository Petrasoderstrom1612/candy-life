import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useCart } from "../context/useCart";

const ShoppingCart = () => {
  const { cart, isOpen, toggleCart } = useCart();

  if (!isOpen) return null;
  console.log("Shopping cart opened. Current items:", cart);

  return (
    <section className="cart-overlay">
      <button onClick={toggleCart} aria-label="Close shopping cart" className="shopping-cart-close-btn">X</button>
      <h3>Varukorg</h3>

      {cart.length === 0 && <p>Tom varukorg</p>}

      {cart.map((c, index) => (
        <article key={index} className="shopping-cart-item">
          <div className="shopping-item-quantity">
            <p>1x {c.name} </p>
          </div>
          <div className="price-buttons">
            <p className="price">{c.price} SEK </p>
            <button aria-label={`Add {c.name} to the shopping cart`} className="shopping-cart-icon-btn"><CiCirclePlus /></button>
            <button aria-label={`Remove {c.name} from the shopping cart`} className="shopping-cart-icon-btn"><CiCircleMinus /></button>
          </div>
        </article>
      ))}

      <button className="go-to-shopping-form-btn">Gå till kassan</button>
    </section>
  );
};

export default ShoppingCart;
