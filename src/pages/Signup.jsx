import "../style/signup.css";
import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";

export function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    newsletter: false
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const validatePassword = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Create user object similar to the JavaScript version
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      newsletter: formData.newsletter,
      dateJoined: new Date().toISOString()
    };

    console.log('User registered:', newUser);
    // Add your registration logic here
  };

  return (
    <>
      <Navbar />
      <section className="signup-container">
        <div className="signup-card">
          <div className="signup-logo">
            <h1>AURA</h1>
          </div>
          <h3>Create an Account</h3>
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="password-requirements">
              <div className={`requirement ${passwordRequirements.length ? 'met' : ''}`}>
                <i className="fa fa-circle"></i> 8+ characters
              </div>
              <div className={`requirement ${passwordRequirements.uppercase ? 'met' : ''}`}>
                <i className="fa fa-circle"></i> At least one uppercase letter
              </div>
              <div className={`requirement ${passwordRequirements.lowercase ? 'met' : ''}`}>
                <i className="fa fa-circle"></i> At least one lowercase letter
              </div>
              <div className={`requirement ${passwordRequirements.number ? 'met' : ''}`}>
                <i className="fa fa-circle"></i> At least one number
              </div>
              <div className={`requirement ${passwordRequirements.special ? 'met' : ''}`}>
                <i className="fa fa-circle"></i> At least one special character
              </div>
            </div>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="form-check">
              <input
                type="checkbox"
                name="termsAccepted"
                id="termsCheck"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <label htmlFor="termsCheck">
                I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                name="newsletter"
                id="newsletterCheck"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <label htmlFor="newsletterCheck">
                Subscribe to our newsletter for updates
              </label>
            </div>

            <button type="submit">Create Account</button>

            <p>Or sign up with</p>
            <div className="social-links-signup">
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

            <div className="signup-footer">
              <p>
                Already have an account? <a href="/login">Log In</a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}