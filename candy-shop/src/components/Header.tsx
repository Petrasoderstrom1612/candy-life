import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { TfiShoppingCart } from "react-icons/tfi";
import { useCart } from "../context/useCart";

const Header = () => {
  const { cart, toggleCart } = useCart(); //get context

  const hasItems = cart.length > 0;
  console.log("has items", hasItems)

  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <NavLink to="/" className={({ isActive }) => isActive ? "activenav site-logo" : "site-logo"}>#CandyLife</NavLink>
      <nav className="d-flex align-items-center gap-3">
        <NavLink to="/" className={({ isActive }) => (isActive ? "activenav" : undefined)}>Hem</NavLink>
        <Button
          className={`cart-dot ${cart.length > 0 ? "has-items" : ""}`}
          variant={cart.length > 0 ? "success" : "outline-dark"}
          onClick={toggleCart}
          aria-label="Show shopping cart"
        >
          <TfiShoppingCart />
        </Button>
      </nav>
    </header>
  );
};

export default Header;
