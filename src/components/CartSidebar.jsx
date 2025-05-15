import { useCart } from "../context/CartContext";
import '../style/CartSidebar.css';
import { useNavigate } from "react-router-dom";

export function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price_from * item.quantity,
    0
  );

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  // Helper function to safely get a valid image URL
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return "https://via.placeholder.com/60x80?text=No+Image";
  };

  return (
    <div className={`cart-sidebar${isCartOpen ? " open" : ""}`}>
      <div className="cart-sidebar-header">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
      </div>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map((item, idx) => (
            <li key={idx} className="cart-item">
              <img src={getProductImage(item.product)} alt={item.product.title || "Product"} width={60} />
              <div className="cart-item-info">
                <div className="cart-item-title">{item.product.title}</div>
                <div className="cart-item-size">Size: {item.size}</div>
                <div className="cart-item-qty">Qty: {item.quantity}</div>
                <div className="cart-item-price">Rs. {item.product.price_from * item.quantity}</div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.product._id, item.size)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-sidebar-footer">
        <div className="cart-total">Total: <span>Rs. {total}</span></div>
        <button className="checkout-btn" disabled={cartItems.length === 0} onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}