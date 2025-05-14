import { useCart } from "../context/CartContext";
import { Navbar } from "../components/Navbar";
import "../style/checkout.css";

export function Checkout() {
  const { cartItems } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price_from * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <ul>
              {cartItems.map((item, idx) => (
                <li key={idx}>
                  <span>{item.product.title} (x{item.quantity})</span>
                  <span>Rs. {item.product.price_from * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Total:</span>
              <span>Rs. {total}</span>
            </div>
          </div>
          <form className="checkout-form">
            <h2>Shipping Details</h2>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Phone Number" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Postal Code" required />
            <button type="submit" className="checkout-btn">Place Order</button>
          </form>
        </div>
      </div>
    </>
  );
}