import "../style/login.css";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessPopup } from "../components/SuccessPopup";

export function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [LoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      rememberMe: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users");
      const users = await response.json();

      const user = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

      if (!user) {
        setIsError(true);
        setPopupMessage('User not found. Please check your email.');
        setShowPopup(true);
        resetForm(); // Clear fields on error
        return;
      }

      if (user.password !== formData.password) {
        setIsError(true);
        setPopupMessage('Incorrect password. Please try again.');
        setShowPopup(true);
        setFormData(prev => ({ ...prev, password: "" })); // Only clear password on wrong password
        return;
      }

      // Login successful
      localStorage.setItem("userId", user._id);
      localStorage.setItem("LoggedIn", "true");
      if (formData.rememberMe) {
        localStorage.setItem("userEmail", formData.email);
      }
      
      setLoggedIn(true);
      setIsError(false);
      setPopupMessage('Login successful!');
      setShowPopup(true);
      resetForm(); // Clear all fields on success
      
      setTimeout(() => {
        navigate("/");
      }, 1500); // Give time for popup to be seen

    } catch (error) {
      console.error('Login error:', error);
      setIsError(true);
      setPopupMessage('An error occurred. Please try again.');
      setShowPopup(true);
      resetForm(); // Clear fields on error
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  function handlesignup(e) {
    e.preventDefault(); // Prevent form submission
    navigate("/Signup"); // Use navigate instead of Navigate
  }

  return (
    <>
      <Navbar />
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>AURA</h1>
        <h2>Welcome Back</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <div className="remember-forgot">
          <div className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              id="rem"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rem">Remember Me</label>
          </div>
          <a href="#" className="forgot-link">
            Forgot Password?
          </a>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
        <p>Don't have an account?</p>
        {/* Changed to type="button" to avoid form validation */}
        <button
          type="submit"
          className="signup-btn"
          onClick={handlesignup}
        >
          Sign Up
        </button>

        <p>Or login with</p>
        <div className="social-links">
          <button type="button" className="facebook-btn">
            <i className="fa-brands fa-facebook"></i>
          </button>
          <button type="button" className="instagram-btn">
            <i className="fa-brands fa-instagram"></i>
          </button>
          <button type="button" className="twitter-btn">
            <i className="fa-brands fa-x-twitter"></i>
          </button>
        </div>
      </form>
      <SuccessPopup
        isOpen={showPopup}
        onClose={handlePopupClose}
        message={popupMessage}
        isError={isError}
      />
    </>
  );
}
