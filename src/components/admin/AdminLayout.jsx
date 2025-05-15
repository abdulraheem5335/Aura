import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../style/admin/adminLayout.css";

export function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }
      
      try {
        // Fetch all users
        const response = await fetch("http://localhost:5000/api/users");
        const users = await response.json();
        
        // Find the current user
        const currentUser = users.find(user => user._id === userId);
        
        if (!currentUser || currentUser.role !== "admin") {
          alert("Access denied. Admin privileges required.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/");
      }
    };
    
    checkAdmin();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.setItem("LoggedIn", "false");
    navigate("/login");
  };
  
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="admin-layout">
      <div className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>AURA Admin</h2>
          <button 
            className="sidebar-toggle" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin" className={isActive("/admin")}>
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className={isActive("/admin/users")}>
                <span className="nav-icon">👥</span>
                <span className="nav-text">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className={isActive("/admin/products")}>
                <span className="nav-icon">🛍️</span>
                <span className="nav-text">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className={isActive("/admin/orders")}>
                <span className="nav-icon">📦</span>
                <span className="nav-text">Orders</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
          <Link to="/" className="view-site">
            <span className="nav-icon">🌐</span>
            <span className="nav-text">View Site</span>
          </Link>
        </div>
      </div>
      
      <div className="admin-content">
        <header className="admin-header">
          <div className="admin-header-title">
            <h1>AURA Admin Panel</h1>
          </div>
          <div className="admin-header-actions">
            <div className="admin-user">
              <span>Admin</span>
            </div>
          </div>
        </header>
        
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
