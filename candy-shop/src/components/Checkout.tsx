import type { CheckoutProps, OrderItem, OrderRequest } from "../services/Types";
import Loader from '../components/Loader';
import { placeOrder } from "../services/BortakvallApi"; 
import { useCart } from "../context/useCart";
import { useEffect, useState} from "react";


const Checkout = ({ onBack, onCheckoutComplete }: CheckoutProps) => {
  const { cart, clearCart, toggleCart } = useCart();
  const [form, setForm] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_address: "",
    customer_postcode: "",
    customer_city: "",
    customer_email: "",
    customer_phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderItems: OrderItem[] = cart.map(item => ({
      product_id: item.candy.id,
      qty: item.quantity,
      item_price: item.candy.price,
      item_total: item.quantity * item.candy.price,
    }));

    const orderTotal = orderItems.reduce((sum, item) => sum + item.item_total, 0);

    const orderRequest: OrderRequest = {
      ...form,
      order_total: orderTotal,
      order_items: orderItems,
    };

    try {
      const response = await placeOrder(98, orderRequest);
      if (response) {
        setStatus(response.status);
        setOrderNumber(response.data.id);

        localStorage.setItem("checkoutStatus", response.status);
        localStorage.setItem("checkoutOrderNumber", String(response.data.id));
      } else {
        setError("Något gick fel vid beställningen! Försök igen eller kontakta vår kundtjänst.");
      }
    } catch (err) {
      console.log(err)
      setError(`Det uppstod ett tekniskt problem vid beställningen. Försök igen om några minuter eller kontakta kundtjänst.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const savedStatus = localStorage.getItem("checkoutStatus");
  const savedOrderNumber = localStorage.getItem("checkoutOrderNumber");

  if (savedStatus && savedOrderNumber) {
    setStatus(savedStatus);
    setOrderNumber(savedOrderNumber);
  }
  }, []);

  if(loading) { return <Loader />;}

  return (
    <section className="cart-overlay checkout">
      {error && <p aria-live="assertive" className="error">{error}</p>}
      {status === "success" ? (
        <>
          <button 
          onClick={() => {
            clearCart();
            toggleCart();
            onCheckoutComplete?.();
            localStorage.removeItem("checkoutStatus");
            localStorage.removeItem("checkoutOrderNumber");
          }}
          aria-label="Close checkout" 
          className="checkout-close-btn">
            ✕
          </button>
          <article aria-live="polite" className="order-success" role="status">
              <p className="order-msg">Tack för din beställning!</p>
              <p className="order-status">Orderstatus: {status}✅</p>
              <p  className="order-number">Beställningsnummer:</p>
              <p  className="order-number order-actual-nr">{orderNumber}</p>
            </article>
          </>
      ) : (
        <>
        <header className="checkout-header">
            <button onClick={onBack} aria-label="Back to shopping cart" className="checkout-back-btn">
              ← Tillbaka till varukorgen
            </button>
            <button onClick={toggleCart} aria-label="Close checkout" className="checkout-close-btn">
              ✕
            </button>
          </header><form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Kassa</h2>
              <fieldset>
                <div className="form-group">
                  <label htmlFor="firstname">Förnamn</label>
                  <input
                    id="firstname"
                    type="text"
                    name="customer_first_name"
                    required
                    maxLength={255}
                    value={form.customer_first_name}
                    onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Efternamn</label>
                  <input
                    id="lastname"
                    type="text"
                    name="customer_last_name"
                    required
                    maxLength={255}
                    value={form.customer_last_name}
                    onChange={handleChange} />
                </div>
              </fieldset>

              <fieldset>
                <div className="form-group">
                  <label htmlFor="address">Adress</label>
                  <input
                    id="address"
                    type="text"
                    name="customer_address"
                    required
                    maxLength={255}
                    value={form.customer_address}
                    onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="postcode">Postnummer</label>
                  <input
                    id="postcode"
                    type="text"
                    name="customer_postcode"
                    required
                    maxLength={6}
                    pattern="\d{2,6}"
                    title="Postnummer får vara max 6 siffror"
                    value={form.customer_postcode}
                    onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="city">Ort</label>
                  <input
                    id="city"
                    type="text"
                    name="customer_city"
                    required
                    maxLength={255}
                    value={form.customer_city}
                    onChange={handleChange} />
                </div>
              </fieldset>

              <fieldset>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="customer_email"
                    required
                    maxLength={255}
                    value={form.customer_email}
                    onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefonnummer</label>
                  <input
                    id="phone"
                    type="text"
                    name="customer_phone"
                    maxLength={255}
                    value={form.customer_phone}
                    onChange={handleChange} />
                </div>
              </fieldset>

              <button type="submit" className="order-btn">Beställ</button>
            </form></>
      )}
    </section>
  );
};

export default Checkout;
