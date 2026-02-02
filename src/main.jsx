import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "./components/Toast";
import { BrowserRouter } from "react-router-dom";
import "./style/responsive.css";
import "./style/skeleton.css";
import "./style/toast.css";
import "./style/animations.css";
import "./style/themeToggle.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <App />
            <ToastContainer />
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);