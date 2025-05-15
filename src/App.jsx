import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer.jsx";
import { CategoryView } from "./pages/CategoryView.jsx";
import { Home } from "./pages/Home.jsx";
import { LogIn } from "./pages/Login.jsx";
import { MenCollection } from "./pages/Mencollection.jsx";
import { ProductDetails } from "./pages/ProductDetails.jsx";
import { Profile } from "./pages/Profile.jsx";
import { SignUp } from "./pages/Signup.jsx";
import { WomenCollection } from "./pages/Womencollection.jsx";
import { CartSidebar } from "./components/CartSidebar";
import { Checkout } from "./pages/Checkout";

// Admin imports
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminUsers } from "./pages/admin/Users";
import { AdminProducts } from "./pages/admin/Products";
import { AdminOrders } from "./pages/admin/Orders";

// LocationWrapper is needed since useLocation can't be used directly in App
function LocationWrapper() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/Mencollection" element={<MenCollection />} />
        <Route path="/Womencollection" element={<WomenCollection />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Mencollection/:cname" element={<CategoryView />} />
        <Route path="/Womencollection/:cname" element={<CategoryView />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
      
      <CartSidebar />
      
      {/* Only show footer on non-admin pages */}
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <LocationWrapper />
  );
}

export default App;
