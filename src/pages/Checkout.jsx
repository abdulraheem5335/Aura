import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useCart } from "../context/CartContext";
import "../style/checkout.css";
import { useNavigate } from "react-router-dom";
import { SuccessPopup } from "../components/SuccessPopup";

export function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price_from * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add items to your cart before checkout.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare order items from cart with safe image handling
      const orderItems = cartItems.map(item => {
        // Get the first valid image or empty string if none
        const imageUrl = item.product.images && item.product.images.length > 0
          ? item.product.images[0]
          : "";
          
        return {
          product_id: item.product.product_id,
          title: item.product.title || `Product ${item.product.product_id}`,
          size: item.size || "Default",
          price: item.product.price_from,
          quantity: item.quantity,
          image: imageUrl
        };
      });

      // Create order data
      const orderData = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        items: orderItems,
        total_amount: total,
        shipping_address: {
          street: formData.address,
          city: formData.city,
          state: "Pakistan", // Default state
          postal_code: formData.postalCode,
          country: "Pakistan"
        },
        payment_method: "cash_on_delivery", // Default payment method
        user: localStorage.getItem("userId") || null // Add user ID if available
      };

      // Send order data to API
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      // Success - clear cart and show success message
      setOrderNumber(data.order_number);
      setSuccess(true);
      clearCart();
      
    } catch (err) {
      console.error("Order placement error:", err);
      setError(err.message || "An error occurred while placing your order");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="empty-cart-message">Your cart is empty</p>
            ) : (
              <ul>
                {cartItems.map((item, idx) => (
                  <li key={idx}>
                    <span>{item.product.title} (x{item.quantity})</span>
                    <span>Rs. {item.product.price_from * item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="checkout-total">
              <span>Total:</span>
              <span>Rs. {total}</span>
            </div>
          </div>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Shipping Details</h2>
            {error && <div className="error-message">{error}</div>}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            <button 
              type="submit" 
              className="checkout-btn"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>

      {success && (
        <SuccessPopup
          message={`Your order #${orderNumber} has been placed successfully!`}
          onClose={handleSuccessClose}
        />
      )}
    </>
  );
}