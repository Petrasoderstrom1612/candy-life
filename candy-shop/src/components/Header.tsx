import Button from 'react-bootstrap/Button'
import { NavLink} from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";


const Header = () => {
  return (
    <header>
      <NavLink to="/" className={({isActive}) => isActive ? "activenav site-logo" : "site-logo"}>#CandyLife</NavLink>
      <nav className="d-flex align-items-center gap-3">
        <NavLink to="/" className={({isActive}) => isActive ? "activenav" : undefined}>Home</NavLink>
        <Button variant="outline-dark"><TfiShoppingCart /></Button>
      </nav>
    </header>
  );
};

export default Header;

