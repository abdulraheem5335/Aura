import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import "../../style/admin/dashboard.css";

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: [],
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch users count
        const usersResponse = await fetch("http://localhost:5000/api/users");
        const users = await usersResponse.json();
        
        // Fetch orders
        const ordersResponse = await fetch("http://localhost:5000/api/orders");
        const orders = await ordersResponse.json();
        
        // Fetch products
        const productsResponse = await fetch("http://localhost:5000/api/products");
        const products = await productsResponse.json();
        
        // Calculate total revenue
        const revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
        
        const sortedOrders = orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setStats({
          totalUsers: users.length,
          totalOrders: orders.length,
          totalProducts: products.length,
          recentOrders: sortedOrders.slice(0, 5), // Now this is the latest 5
          revenue
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">Loading dashboard data...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon users">👤</div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-number">{stats.totalUsers}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon orders">🛍️</div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <p className="stat-number">{stats.totalOrders}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon products">👕</div>
            <div className="stat-content">
              <h3>Total Products</h3>
              <p className="stat-number">{stats.totalProducts}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon revenue">💰</div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <p className="stat-number">Rs. {stats.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-recent-orders">
          <h2>Recent Orders</h2>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(order => (
                <tr key={order._id}>
                  <td>{order.order_number}</td>
                  <td>
  {order.user && typeof order.user === "object"
    ? order.user.name
    : order.user || "Unknown"}
</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>Rs. {order.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
