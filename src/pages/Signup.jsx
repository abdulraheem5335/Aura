import "../style/signup.css";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
export function SignUp() {
  const [islog, setislog] = useState(false);

  return (
    <>
      <Navbar />
      <form className="signup-form">
        <h1>AURA</h1>
        <h2>Welcome Back</h2>
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="password" required />
        {islog ? (
          <>
            {" "}
            <label for="rem">Remember Me</label>
            <input type="checkbox" id="rem" />
            <a href="#">Forgot Password?</a>{" "}
          </>
        ) : (
          <input type="password" placeholder="confirm password" required />
        )}

        <button type="submit">{islog ? "Log In" : "Signup"}</button>
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
