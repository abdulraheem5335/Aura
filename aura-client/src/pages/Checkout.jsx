import { useState, useCallback } from "react";
import { Navbar } from "../components/Navbar";
import { useCart } from "../context/CartContext";
import "../style/checkout.css";
import "../style/formValidation.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  // Validation functions
  const validateFullName = (value) => {
    if (!value) return "Full name is required";
    if (value.length < 3) return "Name must be at least 3 characters";
    return null;
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email";
    return null;
  };

  const validatePhone = (value) => {
    if (!value) return "Phone number is required";
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) return "Please enter a valid phone number";
    return null;
  };

  const validateAddress = (value) => {
    if (!value) return "Address is required";
    if (value.length < 10) return "Please enter a complete address";
    return null;
  };

  const validateCity = (value) => {
    if (!value) return "City is required";
    if (value.length < 2) return "Please enter a valid city";
    return null;
  };

  const validatePostalCode = (value) => {
    if (!value) return "Postal code is required";
    if (value.length < 4) return "Please enter a valid postal code";
    return null;
  };

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'fullName': return validateFullName(value);
      case 'email': return validateEmail(value);
      case 'phone': return validatePhone(value);
      case 'address': return validateAddress(value);
      case 'city': return validateCity(value);
      case 'postalCode': return validatePostalCode(value);
      default: return null;
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price_from * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const getInputClass = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'invalid' : 'valid';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add items to your cart before checkout.");
      return;
    }

    // Mark all fields as touched
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postalCode: true
    };
    setTouched(allTouched);
    
    // Validate all fields
    const newErrors = {};
    ['fullName', 'email', 'phone', 'address', 'city', 'postalCode'].forEach(field => {
      const fieldError = validateField(field, formData[field]);
      if (fieldError) newErrors[field] = fieldError;
    });
    
    setErrors(newErrors);
    
    // Check for errors
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the form errors before submitting");
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
      toast.success(`Order #${data.order_number} placed successfully!`);
      clearCart();
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (err) {
      console.error("Order placement error:", err);
      toast.error(err.message || "An error occurred while placing your order");
      setError(err.message || "An error occurred while placing your order");
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
            
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('fullName')}
                  required
                />
                {touched.fullName && (
                  <span className={`validation-icon show ${errors.fullName ? 'invalid' : 'valid'}`}>
                    {errors.fullName ? '✕' : '✓'}
                  </span>
                )}
              </div>
              {touched.fullName && errors.fullName && (
                <span className="error-text show">{errors.fullName}</span>
              )}
            </div>
            
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('email')}
                  required
                />
                {touched.email && (
                  <span className={`validation-icon show ${errors.email ? 'invalid' : 'valid'}`}>
                    {errors.email ? '✕' : '✓'}
                  </span>
                )}
              </div>
              {touched.email && errors.email && (
                <span className="error-text show">{errors.email}</span>
              )}
            </div>
            
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('phone')}
                  required
                />
                {touched.phone && (
                  <span className={`validation-icon show ${errors.phone ? 'invalid' : 'valid'}`}>
                    {errors.phone ? '✕' : '✓'}
                  </span>
                )}
              </div>
              {touched.phone && errors.phone && (
                <span className="error-text show">{errors.phone}</span>
              )}
            </div>
            
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('address')}
                  required
                />
                {touched.address && (
                  <span className={`validation-icon show ${errors.address ? 'invalid' : 'valid'}`}>
                    {errors.address ? '✕' : '✓'}
                  </span>
                )}
              </div>
              {touched.address && errors.address && (
                <span className="error-text show">{errors.address}</span>
              )}
            </div>
            
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('city')}
                  required
                />
                {touched.city && (
                  <span className={`validation-icon show ${errors.city ? 'invalid' : 'valid'}`}>
                    {errors.city ? '✕' : '✓'}
                  </span>
                )}
              </div>
              {touched.city && errors.city && (
                <span className="error-text show">{errors.city}</span>
              )}
            </div>
            
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('postalCode')}
                  required
                />
                {touched.postalCode && (
                  <span className={`validation-icon show ${errors.postalCode ? 'invalid' : 'valid'}`}>
                    {errors.postalCode ? '✕' : '✓'}
                  </span>
                )}
              </div>
              {touched.postalCode && errors.postalCode && (
                <span className="error-text show">{errors.postalCode}</span>
              )}
            </div>
            
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
    </>
  );
}