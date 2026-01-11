import type { CheckoutProps } from "../services/Types";

const Checkout = ({ cart, onBack, toggleCart }: CheckoutProps) => {
  console.log(cart);
return (
    <section className="cart-overlay checkout">
      <header className="checkout-header">
        <button onClick={onBack} aria-label="Back to shopping cart" className="checkout-back-btn">
          ← Tillbaka till varukorgen
        </button>
        <button onClick={toggleCart} aria-label="Close checkout" className="checkout-close-btn">
          ✕
        </button>
      </header>

      <h2>Kassa</h2>

      <form className="checkout-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="firstname">Förnamn</label>
            <input id="firstname" type="text" name="customer_first_name" required maxLength={255}/>
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Efternamn</label>
            <input id="lastname" type="text" name="customer_last_name" required maxLength={255}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Adress</label>
            <input id="address" type="text" name="customer_address" required maxLength={255}/>
          </div>

          <div className="form-group">
            <label htmlFor="postcode">Postnummer</label>
            <input id="postcode" type="text" name="customer_postcode" required maxLength={6} pattern="\d{2,6}" title="Postnummer får vara max 6 siffror"/>
          </div>

          <div className="form-group">
            <label htmlFor="city">Stad</label>
            <input id="city" type="text" name="customer_city" required maxLength={255} />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="customer_email" required maxLength={255}/>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefonnummer</label>
            <input id="phone" type="number" name="customer_phone" />
          </div>
        </fieldset>

        <button type="submit" className="order-btn">Beställ</button>
      </form>
    </section>
  );
};


export default Checkout;
