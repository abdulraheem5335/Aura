import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../style/admin/adminLayout.css";

export function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adminName, setAdminName] = useState("Admin");
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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
        } else {
          setAdminName(currentUser.name || "Admin");
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

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-layout">
      <div className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">✦</span>
            <h2>AURA</h2>
          </div>
          <button 
            className="sidebar-toggle" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <span className="toggle-icon">{isSidebarOpen ? "‹" : "›"}</span>
          </button>
        </div>
        
        <div className="sidebar-menu-label">Main Menu</div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin" className={isActive("/admin")}>
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className={isActive("/admin/users")}>
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </span>
                <span className="nav-text">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className={isActive("/admin/products")}>
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </span>
                <span className="nav-text">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className={isActive("/admin/orders")}>
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </span>
                <span className="nav-text">Orders</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/" className="view-site">
            <span className="nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </span>
            <span className="nav-text">View Store</span>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </span>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <header className="admin-header">
          <div className="admin-header-left">
            <div className="greeting-section">
              <h1>{getGreeting()}, {adminName.split(' ')[0]}</h1>
              <p className="header-date">{formatDate()}</p>
            </div>
          </div>
          <div className="admin-header-right">
            <div className="admin-profile">
              <div className="profile-avatar">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <span className="profile-name">{adminName}</span>
                <span className="profile-role">Administrator</span>
              </div>
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
