import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import "../../style/admin/orders.css";

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("http://localhost:5000/api/orders");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched orders:", data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewOrder = (order) => {
    console.log("Viewing order:", order);
    setViewingOrder(order);
  };
  
  const handleStatusChange = async (orderNumber, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderNumber}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update order status: ${response.status}`);
      }
      
      const updatedOrder = await response.json();
      
      // Update orders in state
      setOrders(orders.map(order => 
        order.order_number === orderNumber ? updatedOrder : order
      ));
      
      // Update viewing order if open
      if (viewingOrder && viewingOrder.order_number === orderNumber) {
        setViewingOrder(updatedOrder);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };
  
  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);
  
  // Function to safely display user information
  const getUserDisplay = (order) => {
    if (!order || !order.user) return "Unknown";
    
    if (typeof order.user === 'object' && order.user.name) {
      return order.user.name;
    }
    
    return order.user.toString().substring(0, 8) + "...";
  };
  
  return (
    <AdminLayout>
      <div className="admin-orders">
        <div className="orders-header">
          <h1>Order Management</h1>
          <div className="filter-controls">
            <label>Filter by Status:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-message">No orders found</div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.order_number}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>{getUserDisplay(order)}</td>
                    <td>Rs. {order.total_amount}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button 
                        className="view-btn" 
                        onClick={() => handleViewOrder(order)}
                      >
                        View Details
                      </button>
                      <select 
                        className="status-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.order_number, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Order Details Modal */}
        {viewingOrder && (
          <div className="modal-overlay">
            <div className="modal order-details-modal">
              <h2>Order #{viewingOrder.order_number}</h2>
              
              <div className="order-meta">
                <div className="order-date">
                  <strong>Date:</strong> {new Date(viewingOrder.created_at).toLocaleString()}
                </div>
                <div className="order-status">
                  <strong>Status:</strong> 
                  <span className={`status-badge ${viewingOrder.status}`}>
                    {viewingOrder.status}
                  </span>
                </div>
              </div>
              
              <div className="order-section">
                <h3>Customer Information</h3>
                <p><strong>Customer ID:</strong> {getUserDisplay(viewingOrder)}</p>
              </div>
              
              <div className="order-section">
                <h3>Shipping Address</h3>
                <p>{viewingOrder.shipping_address?.street || 'N/A'}</p>
                <p>
                  {viewingOrder.shipping_address?.city || 'N/A'}, 
                  {viewingOrder.shipping_address?.state || 'N/A'} 
                  {viewingOrder.shipping_address?.postal_code || 'N/A'}
                </p>
                <p>{viewingOrder.shipping_address?.country || 'N/A'}</p>
              </div>
              
              <div className="order-section">
                <h3>Payment Method</h3>
                <p>{(viewingOrder.payment_method || 'N/A').replace(/_/g, ' ')}</p>
              </div>
              
              <div className="order-section">
                <h3>Order Items</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewingOrder.items && viewingOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="product-cell">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="product-thumbnail"
                            />
                          )}
                          <span>{item.title}</span>
                        </td>
                        <td>{item.size}</td>
                        <td>{item.quantity}</td>
                        <td>Rs. {item.price}</td>
                        <td>Rs. {item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="order-total">
                <strong>Total:</strong> Rs. {viewingOrder.total_amount}
              </div>
              
              <div className="modal-actions">
                <select 
                  value={viewingOrder.status}
                  onChange={(e) => handleStatusChange(viewingOrder.order_number, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button 
                  className="close-btn"
                  onClick={() => setViewingOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
