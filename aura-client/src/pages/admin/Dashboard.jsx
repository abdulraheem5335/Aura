import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  ComposedChart
} from "recharts";
import "../../style/admin/dashboard.css";

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: [],
    revenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    cancelledOrders: 0,
    avgOrderValue: 0,
    topCategories: [],
    monthlyRevenue: []
  });
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all data in parallel
        const [usersResponse, ordersResponse, productsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/users"),
          fetch("http://localhost:5000/api/orders"),
          fetch("http://localhost:5000/api/products")
        ]);
        
        const users = await usersResponse.json();
        const orders = await ordersResponse.json();
        const products = await productsResponse.json();
        
        // Calculate total revenue
        const revenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
        
        // Calculate order status counts
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
        const processingOrders = orders.filter(o => o.status === 'processing').length;
        const shippedOrders = orders.filter(o => o.status === 'shipped').length;
        const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
        
        // Calculate average order value
        const avgOrderValue = orders.length > 0 ? revenue / orders.length : 0;
        
        // Sort orders by date
        const sortedOrders = orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Generate last 30 days revenue data
        const last30Days = generateLast30DaysData(orders);
        setRevenueData(last30Days);

        // Order status data for donut chart
        const statusData = [
          { name: 'Pending', value: pendingOrders, color: '#f59e0b' },
          { name: 'Processing', value: processingOrders, color: '#3b82f6' },
          { name: 'Shipped', value: shippedOrders, color: '#8b5cf6' },
          { name: 'Delivered', value: deliveredOrders, color: '#22c55e' },
          { name: 'Cancelled', value: cancelledOrders, color: '#ef4444' },
        ].filter(item => item.value > 0);
        setOrderStatusData(statusData);

        // Category distribution from products
        const categoryCount = {};
        products.forEach(product => {
          const cat = product.category || 'Uncategorized';
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
        const topCategories = Object.entries(categoryCount)
          .map(([name, count]) => ({ name, count, fill: getColorForCategory(name) }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);
        setCategoryData(topCategories);

        // Monthly revenue and orders (last 6 months from real data)
        const monthly = generateMonthlyData(orders);
        setMonthlyData(monthly);

        setStats({
          totalUsers: users.length,
          totalOrders: orders.length,
          totalProducts: products.length,
          recentOrders: sortedOrders.slice(0, 5),
          revenue,
          pendingOrders,
          deliveredOrders,
          processingOrders,
          shippedOrders,
          cancelledOrders,
          avgOrderValue,
          topCategories,
          monthlyRevenue: monthly
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Color palette for categories
  const getColorForCategory = (category) => {
    const colors = {
      'men': '#3b82f6',
      'women': '#ec4899',
      'accessories': '#f59e0b',
      'footwear': '#22c55e',
      'bags': '#8b5cf6',
      'jewelry': '#06b6d4'
    };
    const key = category.toLowerCase();
    for (const [k, v] of Object.entries(colors)) {
      if (key.includes(k)) return v;
    }
    return '#64748b';
  };

  // Generate last 30 days data
  const generateLast30DaysData = (orders) => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayOrders = orders.filter(order => 
        order.created_at && order.created_at.split('T')[0] === dateStr
      );
      
      const dayRevenue = dayOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      
      days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: dayRevenue,
        orders: dayOrders.length
      });
    }
    return days;
  };

  // Generate monthly data from real orders
  const generateMonthlyData = (orders) => {
    const monthlyMap = {};
    const months = [];
    
    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      monthlyMap[monthKey] = { name: monthName, revenue: 0, orders: 0 };
      months.push(monthKey);
    }
    
    // Populate with real order data
    orders.forEach(order => {
      if (order.created_at) {
        const orderDate = new Date(order.created_at);
        const monthKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
        if (monthlyMap[monthKey]) {
          monthlyMap[monthKey].revenue += order.total_amount || 0;
          monthlyMap[monthKey].orders += 1;
        }
      }
    });
    
    return months.map(key => monthlyMap[key]);
  };

  const getStatusClass = (status) => {
    const classes = {
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return classes[status] || 'status-pending';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label, prefix = '' }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {prefix}{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <div className="header-text">
            <h1>Dashboard</h1>
            <p className="dashboard-subtitle">Overview of your store performance</p>
          </div>
          <div className="header-actions">
            <select className="period-select">
              <option value="7">Last 7 days</option>
              <option value="30" selected>Last 30 days</option>
              <option value="90">Last 3 months</option>
            </select>
          </div>
        </div>
        
        {/* Stats Cards - Clean Design */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Revenue</span>
              <div className="stat-indicator positive">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
            </div>
            <p className="stat-number">Rs. {stats.revenue.toLocaleString()}</p>
            <div className="stat-footer">
              <span className="stat-change positive">+12.5%</span>
              <span className="stat-period">vs last period</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Orders</span>
              <div className="stat-indicator positive">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
            </div>
            <p className="stat-number">{stats.totalOrders}</p>
            <div className="stat-footer">
              <span className="stat-change positive">+8.2%</span>
              <span className="stat-period">vs last period</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Customers</span>
              <div className="stat-indicator positive">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
            </div>
            <p className="stat-number">{stats.totalUsers}</p>
            <div className="stat-footer">
              <span className="stat-change positive">+5.1%</span>
              <span className="stat-period">vs last period</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Avg. Order Value</span>
              <div className="stat-indicator neutral">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
            </div>
            <p className="stat-number">Rs. {Math.round(stats.avgOrderValue).toLocaleString()}</p>
            <div className="stat-footer">
              <span className="stat-change neutral">0%</span>
              <span className="stat-period">vs last period</span>
            </div>
          </div>
        </div>

        {/* Main Charts Row */}
        <div className="charts-row">
          {/* Revenue & Orders Combined Chart */}
          <div className="chart-card chart-large">
            <div className="chart-header">
              <div>
                <h2>Revenue & Orders Trend</h2>
                <p className="chart-desc">Daily performance over the last 30 days</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4646" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ff4646" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={4}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip prefix="Rs. " />} />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ff4646" 
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  name="Revenue"
                />
                <Bar 
                  yAxisId="right"
                  dataKey="orders" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                  name="Orders"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Donut */}
          <div className="chart-card chart-small">
            <div className="chart-header">
              <div>
                <h2>Order Status</h2>
                <p className="chart-desc">Current distribution</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span style={{ color: '#64748b', fontSize: '12px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <span className="donut-total">{stats.totalOrders}</span>
              <span className="donut-label">Total</span>
            </div>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="charts-row">
          {/* Monthly Performance */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Monthly Performance</h2>
                <p className="chart-desc">Revenue trend over 6 months</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip prefix="Rs. " />} />
                <Bar 
                  dataKey="revenue" 
                  fill="#ff4646" 
                  radius={[6, 6, 0, 0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product Categories */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Product Categories</h2>
                <p className="chart-desc">Products by category</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryData} layout="vertical" barCategoryGap="15%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  radius={[0, 6, 6, 0]}
                  name="Products"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="dashboard-bottom">
          {/* Recent Orders */}
          <div className="recent-orders-card">
            <div className="card-header">
              <h2>Recent Orders</h2>
              <a href="/admin/orders" className="view-all-link">View All</a>
            </div>
            <div className="table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.length > 0 ? (
                    stats.recentOrders.map(order => (
                      <tr key={order._id}>
                        <td className="order-number">#{order.order_number}</td>
                        <td className="customer-name">
                          {order.user && typeof order.user === "object"
                            ? order.user.name
                            : order.customer_name || "Guest"}
                        </td>
                        <td className="order-date">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="order-amount">Rs. {order.total_amount?.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">No orders yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              <div className="summary-item">
                <div className="summary-dot pending"></div>
                <span className="summary-label">Pending</span>
                <span className="summary-value">{stats.pendingOrders}</span>
              </div>
              <div className="summary-item">
                <div className="summary-dot processing"></div>
                <span className="summary-label">Processing</span>
                <span className="summary-value">{stats.processingOrders}</span>
              </div>
              <div className="summary-item">
                <div className="summary-dot shipped"></div>
                <span className="summary-label">Shipped</span>
                <span className="summary-value">{stats.shippedOrders}</span>
              </div>
              <div className="summary-item">
                <div className="summary-dot delivered"></div>
                <span className="summary-label">Delivered</span>
                <span className="summary-value">{stats.deliveredOrders}</span>
              </div>
              <div className="summary-item">
                <div className="summary-dot cancelled"></div>
                <span className="summary-label">Cancelled</span>
                <span className="summary-value">{stats.cancelledOrders}</span>
              </div>
            </div>
            <div className="summary-total">
              <span>Total Products</span>
              <span className="total-value">{stats.totalProducts}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
