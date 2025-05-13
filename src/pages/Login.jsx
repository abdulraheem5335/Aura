import "../style/login.css";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export function LogIn() {
  const navigate = useNavigate();

  function handlesignup(e) {
    e.preventDefault(); // Prevent form submission
    navigate("/Signup"); // Use navigate instead of Navigate
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission here
  };

  return (
    <>
      <Navbar />
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>AURA</h1>
        <h2>Welcome Back</h2>
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="password" required />
        <div className="remember-forgot">
          <div className="remember-me">
            <input type="checkbox" id="rem" />
            <label htmlFor="rem">Remember Me</label>
          </div>
          <a href="#" className="forgot-link">
            Forgot Password?
          </a>
        </div>
        <button type="submit">Sign In</button>
        <p>Don't have an account?</p>
        {/* Changed to type="button" to avoid form validation */}
        <button type="submit" className="signup-btn" onClick={handlesignup}>
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
    </>
  );
}
