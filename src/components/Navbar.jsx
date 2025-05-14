import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/nav.css";

export function Navbar() {
  const [istoggle, setToggle] = useState(false);
  const [isslidebar, setSlidebar] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const dropdownRef = useRef(null);
  const { setIsCartOpen, cartItems } = useCart(); // <-- add cartItems here
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  let navigate = useNavigate();

  const handllecollection = () => {
    if (istoggle) {
      // Closing
      setIsShowing(false);
      setTimeout(() => setToggle(false), 300);
    } else {
      // Opening
      setToggle(true);
      setTimeout(() => setIsShowing(true), 10);
    }
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

  const handlecart = () => {
    setSlidebar(!isslidebar);
  };

  const handlelogin = () => {
    const LoggedIn = localStorage.getItem("LoggedIn") === "true"; // check login state
    if (LoggedIn) {
      navigate("/Profile"); // redirect to profile if logged in
    } else {
      navigate("/Login"); // otherwise go to login page
  }
  };

  const handlehash = (hash) => {
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
        <div className="links">
          <Link to="/" onClick={() => handlehash("#hero1")}>
            Home
          </Link>
          <div ref={dropdownRef}>
            <button className="btn" onClick={handllecollection}>
              Collections <span> ▼</span>
            </button>
            {istoggle && (
              <ul className={`collection ${isShowing ? 'showing' : ''}`}>
                <li>
                  <Link to="/Mencollection">Men Collection</Link>
                </li>
                <li>
                  <Link to="/Womencollection">Women Collection</Link>
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
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            {" "}
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

      {/* Rest of the component remains the same */}
    </>
  );
}