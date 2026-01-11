
const Checkout = () => {
  return (
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
      <button>Beställ</button>
    </form>
  )
}

export default Checkout
