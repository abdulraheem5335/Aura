import React, { useState } from "react";
import "../style/nav.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function Navbar() {
  const [istoggle, setToggle] = useState(false);
  const [isslidebar, setSlidebar] = useState(false);
  let navigate = useNavigate();

  function handllecollection() {
    setToggle(!istoggle);
  }

  function handlecart() {
    setSlidebar(!isslidebar);
  }

  function handlesignup() {
    navigate("/Login");
  }

  function handlehash(hash) {
    setTimeout(() => {
      let elem = document.querySelector(hash);
      if (elem) {
        elem.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 200);
  }

  return (
    <>
      <nav className="navbar">
        <h1>AURA</h1>
        <div className="links">
          <Link to="/" onClick={() => handlehash("#hero1")}>
            Home
          </Link>
          <button className="btn" onClick={handllecollection}>
            Colllections <span> ▼</span>
          </button>
          {istoggle && (
            <ul className="collection">
              <li>
                <Link to="/Mencollection">Men Collection</Link>
              </li>
              <li>
                <Link to="/Womencollection">Women Collection</Link>
              </li>
            </ul>
          )}
          <Link to="/" onClick={() => handlehash("#about1")}>
            About
          </Link>
          <Link to="/" onClick={() => handlehash("#sustain")}>
            Sustainability
          </Link>
          <Link to="/" onClick={() => handlehash("#contact1")}>
            Contact
          </Link>
          <button className="cart-btn" onClick={handlecart}>
            {" "}
            🛒
          </button>
          <button onClick={handlesignup} className="user-btn">
            <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </nav>

      <div className={`navsidebar ${isslidebar ? "active" : ""}`}>
        <div className="navsidebar-header">
          <h1>AURA</h1>
          <button className="close-btn" onClick={handlecart}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="navsidebar-body">
          <p>Your Cart is Empty </p>

          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </>
  );
}
