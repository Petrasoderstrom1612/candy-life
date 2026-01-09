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
        <div key={index}>
          {c.name} – {c.price} SEK
        </div>
      ))}

      <button className="go-to-shopping-form-btn">Gå till kassan</button>
    </div>
  );
};

export default ShoppingCart;
