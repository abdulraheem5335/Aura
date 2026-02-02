import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ThemeToggle } from "./ThemeToggle";
import "../style/nav.css";

export function Navbar() {
  const [istoggle, setToggle] = useState(false);
  const [isslidebar, setSlidebar] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setIsCartOpen, cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  let navigate = useNavigate();

  const handllecollection = () => {
    if (istoggle) {
      setIsShowing(false);
      setTimeout(() => setToggle(false), 300);
    } else {
      setToggle(true);
      setTimeout(() => setIsShowing(true), 10);
    }
  };

  // Close mobile menu on route change
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShowing(false);
        setTimeout(() => setToggle(false), 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlecart = () => {
    setSlidebar(!isslidebar);
  };

  const handlelogin = () => {
    closeMobileMenu();
    const LoggedIn = localStorage.getItem("LoggedIn") === "true";
    if (LoggedIn) {
      navigate("/Profile");
    } else {
      navigate("/Login");
    }
  };

  const handlehash = (hash) => {
    closeMobileMenu();
    setTimeout(() => {
      let elem = document.querySelector(hash);
      if (elem) {
        elem.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 200);
  };

  return (
    <>
      <nav className="navbar">
        <h1>AURA</h1>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
        ></div>

        {/* Navigation Links */}
        <div className={`links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <Link to="/" onClick={() => handlehash("#hero1")}>
            Home
          </Link>
          <div ref={dropdownRef} className="dropdown-container">
            <button className="btn" onClick={handllecollection}>
              Collections <span> ▼</span>
            </button>
            {istoggle && (
              <ul className={`collection ${isShowing ? 'showing' : ''}`}>
                <li>
                  <Link to="/Mencollection" onClick={closeMobileMenu}>Men Collection</Link>
                </li>
                <li>
                  <Link to="/Womencollection" onClick={closeMobileMenu}>Women Collection</Link>
                </li>
              </ul>
            )}
          </div>
          <Link to="/" onClick={() => handlehash("#about1")}>
            About
          </Link>
          <Link to="/" onClick={() => handlehash("#sustain")}>
            Sustainability
          </Link>
          <Link to="/" onClick={() => handlehash("#contact1")}>
            Contact
          </Link>
          <ThemeToggle />
          <button className="cart-btn" onClick={() => { setIsCartOpen(true); closeMobileMenu(); }}>
            🛒
            {cartCount > 0 && (
              <span className="cart-counter">{cartCount}</span>
            )}
          </button>
          <button onClick={handlelogin} className="user-btn">
            <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </nav>
    </>
  );
}