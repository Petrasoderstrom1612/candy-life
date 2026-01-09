import { useCart } from "../context/useCart";

const ShoppingCart = () => {
  const { cart, isOpen, toggleCart } = useCart();

  if (!isOpen) return null;

  // ✅ Debug: log cart contents whenever overlay opens
  console.log("Shopping cart opened. Current items:", cart);

  return (
    <div className="cart-overlay">
      <h3>Varukorg</h3>

      {cart.length === 0 && <p>Tom varukorg</p>}

      {cart.map((c, index) => (
        <p key={index}>
          {c.name} – {c.price} SEK
        </p>
      ))}

      <button onClick={toggleCart}>Stäng</button>
    </div>
  );
};

export default ShoppingCart;
