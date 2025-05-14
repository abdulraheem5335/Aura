import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useCart } from "../context/CartContext";
import "../style/checkout.css";

export function Checkout() {
  const { cartItems, clearCart } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price_from * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [error, setError] = useState("");

  // Improved validation
  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) return "Valid email required";
    if (!form.phone.match(/^[0-9]{10,15}$/)) return "Valid phone required";
    if (!form.address.trim()) return "Address is required";
    if (!form.city.trim()) return "City is required";
    if (!form.postalCode.trim()) return "Postal code is required";
    return "";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessOrder(null);

    const validationMsg = validateForm();
    if (validationMsg) {
      setError(validationMsg);
      return;
    }

    setLoading(true);

    const orderData = {
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      shipping_address: {
        street: form.address,
        city: form.city,
        postal_code: form.postalCode,
        country: "Pakistan",
      },
      items: cartItems.map((item) => ({
        product_id: item.product._id,
        title: item.product.title,
        size: item.size,
        price: item.product.price_from,
        quantity: item.quantity,
        image: item.product.images[0],
      })),
      total_amount: total,
      payment_method: "cash_on_delivery",
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to place order");
      }

      const order = await res.json();
      setSuccessOrder(order);
      clearCart();
    } catch (err) {
      setError(err.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

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
          <form className="checkout-form" onSubmit={handleSubmit} autoComplete="off">
            <h2>Shipping Details</h2>
            <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
            <input name="phone" type="text" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
            <input name="address" type="text" placeholder="Address" value={form.address} onChange={handleChange} required />
            <input name="city" type="text" placeholder="City" value={form.city} onChange={handleChange} required />
            <input name="postalCode" type="text" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required />
            <button type="submit" className="checkout-btn" disabled={loading || cartItems.length === 0}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
            {error && <div className="checkout-error">{error}</div>}
            {successOrder && (
              <div className="checkout-success">
                <h3>Order placed successfully!</h3>
                <p>Your order number: <b>{successOrder.order_number}</b></p>
                <p>Thank you for shopping with us.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}