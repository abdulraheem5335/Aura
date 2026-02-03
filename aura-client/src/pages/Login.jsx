import "../style/login.css";
import "../style/formValidation.css";
import { Navbar } from "../components/Navbar";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import API_URL from '../config/api';

export function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      default:
        return null;
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const getInputClass = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'invalid' : 'valid';
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      rememberMe: false
    });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    // Validate all fields
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    // If there are errors, don't submit
    if (emailError || passwordError) {
      toast.error('Please fix the form errors before submitting');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users`);
      const users = await response.json();

      const user = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

      if (!user) {
        toast.error('User not found. Please check your email.');
        resetForm();
        return;
      }

      if (user.password !== formData.password) {
        toast.error('Incorrect password. Please try again.');
        setFormData(prev => ({ ...prev, password: "" }));
        return;
      }

      // Login successful
      localStorage.setItem("userId", user._id);
      localStorage.setItem("LoggedIn", "true");
      if (formData.rememberMe) {
        localStorage.setItem("userEmail", formData.email);
      }
      
      toast.success('Login successful! Redirecting...');
      resetForm();
      
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.');
      resetForm();
    } finally {
      setIsLoading(false);
    }
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
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email Address"
              className={getInputClass('email')}
              required
            />
            {touched.email && (
              <span className={`validation-icon show ${errors.email ? 'invalid' : 'valid'}`}>
                {errors.email ? '✕' : '✓'}
              </span>
            )}
          </div>
          {touched.email && errors.email && (
            <span className="error-text show">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className={getInputClass('password')}
              required
            />
            {touched.password && (
              <span className={`validation-icon show ${errors.password ? 'invalid' : 'valid'}`}>
                {errors.password ? '✕' : '✓'}
              </span>
            )}
          </div>
          {touched.password && errors.password && (
            <span className="error-text show">{errors.password}</span>
          )}
        </div>
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
        <button type="submit" disabled={isLoading} className={isLoading ? 'loading' : ''}>
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
    </>
  );
}
