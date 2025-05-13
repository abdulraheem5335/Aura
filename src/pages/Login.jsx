import "../style/login.css";
import { Navbar } from "../components/Navbar";
export function LogIn() {
  return (
    <>
      <Navbar />
      <form className="login-form">
        <h1>AURA</h1>
        <h2>Welcome Back</h2>
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="password" required />
        <label for="rem">Remember Me</label>
        <input type="checkbox" id="rem" />
        <a href="#">Forgot Password?</a>
        <button type="submit">Sign In</button>
        <p>Or login with</p>
        <div className="social-links">
          <button className="facebook-btn">
            <i class="fa-brands fa-facebook"></i>
          </button>
          <button className="instagram-btn">
            <i class="fa-brands fa-instagram"></i>
          </button>
          <button className="twitter-btn">
            <i class="fa-brands fa-x-twitter"></i>
          </button>
        </div>
      </form>
    </>
  );
}
