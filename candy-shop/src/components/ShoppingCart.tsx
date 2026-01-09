import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useCart } from "../context/useCart";

const ShoppingCart = () => {
  const { cart, isOpen, toggleCart } = useCart();

  if (!isOpen) return null;

  // ✅ Debug: log cart contents whenever overlay opens
  console.log("Shopping cart opened. Current items:", cart);

  return (
    <div className="cart-overlay">
      <button onClick={toggleCart} aria-label="Close shopping cart">X</button>
      <h3>Varukorg</h3>

      {cart.length === 0 && <p>Tom varukorg</p>}

      {cart.map((c, index) => (
        <div key={index} className="shopping-cart-item">
          <div className="shopping-item-quantity">1x {c.name} </div>
          <div className="price-buttons">{c.price} SEK 
            <button aria-label={`Add {c.name} to the shopping cart`} className="shopping-cart-icon-btn"><CiCirclePlus /></button>
            <button aria-label={`Remove {c.name} from the shopping cart`} className="shopping-cart-icon-btn"><CiCircleMinus /></button>
          </div>
        </div>
      ))}

      <button className="go-to-shopping-form-btn">Gå till kassan</button>
    </div>
  );
};

export default ShoppingCart;
