import type { CheckoutProps } from "../services/Types";

const Checkout = ({ cart, onBack, toggleCart }: CheckoutProps) => {
  console.log(cart);
  return (
    <section className="cart-overlay checkout">
      <div className="checkout-header">
        <button onClick={onBack} aria-label="Back to shopping cart" className="checkout-back-btn">
          ← Tillbaka till varukorgen
        </button>
        <button onClick={toggleCart} aria-label="Close checkout" className="checkout-close-btn">✕</button>
      </div>
      <h3>Kassa</h3>
      <form className="checkout-form">
        <div className="form-group">
          <label htmlFor="firstname">First name</label>
          <input id="firstname" type="text" name="customer_first_name" required />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Last name</label>
          <input id="lastname" type="text" name="customer_last_name" required />
        </div>

          <div className="form-group">
            <label htmlFor="postcode">Postcode</label>
            <input id="postcode" type="number" name="customer_postcode" required />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input id="city" type="text" name="customer_city" required />
          </div>


        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="customer_email" required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Mobile phone</label>
          <input id="phone" type="number" name="customer_phone" />
        </div>

        <button type="submit" className="order-btn">Beställ</button>
      </form>
    </section>
  );
};

export default Checkout;
