import type {CheckoutProps} from "../services/Types"

const Checkout = ({ cart, onBack, toggleCart }: CheckoutProps) => {
    console.log(cart)
  return (
    <section className="cart-overlay">
       <button
        onClick={onBack}
        aria-label="Close shopping cart"
        className="shopping-cart-close-btn"
      >
        ← Tillbaka till varukorgen
      </button>
      <button
        onClick={toggleCart}
        aria-label="Close shopping cart"
        className="shopping-cart-close-btn"
      >
        X
      </button>
        <form>
        <label htmlFor="email">First name:</label>
        <input id="firstname" type="text" name="customer_first_name" required></input>
        <br />
        <label htmlFor="email">Last name:</label>
        <input id="lastname" type="text" name="customer_last_name" required></input>
        <br />
        <label htmlFor="postcode">Postcode:</label>
        <input id="postcode" type="number" name="customer_postcode" required></input>
        <br />
        <label htmlFor="city">City:</label>
        <input id="city" type="text" name="customer_city" required></input>
        <br />
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="customer_email" required></input>
        <br />
        <label htmlFor="phone">Mobile phone:</label>
        <input id="phone" type="number" name="customer_phone"></input>
        <button className="order-btn">Beställ</button>
        </form>
    </section>
  )
}

export default Checkout
