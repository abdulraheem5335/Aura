import "../style/signup.css";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Create user object with only the required fields
    const newUser = {
      name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      console.log('User registered successfully:', data);
      alert('Registration successful!');
      // Redirect to login page
      navigate('/login');
      
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="signup-container">
        <div className="signup-card">
          <div className="signup-logo">
            <h1>AURA</h1>
          </div>
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