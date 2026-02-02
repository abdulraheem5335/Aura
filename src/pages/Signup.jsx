import "../style/signup.css";
import "../style/formValidation.css";
import { Navbar } from "../components/Navbar";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const navigate = useNavigate();
  const toast = useToast();

  // Validation functions
  const validateFirstName = (value) => {
    if (!value) return "First name is required";
    if (value.length < 2) return "First name must be at least 2 characters";
    return null;
  };

  const validateLastName = (value) => {
    if (!value) return "Last name is required";
    if (value.length < 2) return "Last name must be at least 2 characters";
    return null;
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return null;
  };

  const validatePhone = (value) => {
    if (!value) return null; // Phone is optional
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) return "Please enter a valid phone number";
    return null;
  };

  const validatePasswordField = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain a lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain a number";
    return null;
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Please confirm your password";
    if (value !== formData.password) return "Passwords do not match";
    return null;
  };

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'firstName': return validateFirstName(value);
      case 'lastName': return validateLastName(value);
      case 'email': return validateEmail(value);
      case 'phone': return validatePhone(value);
      case 'password': return validatePasswordField(value);
      case 'confirmPassword': return validateConfirmPassword(value);
      default: return null;
    }
  }, [formData.password]);

  const validatePassword = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'password') {
      validatePassword(value);
    }

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }

    // Also re-validate confirmPassword when password changes
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = formData.confirmPassword && newValue !== formData.confirmPassword 
        ? "Passwords do not match" 
        : null;
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    };
    setTouched(allTouched);
    
    // Validate all fields
    const newErrors = {};
    ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    
    // Check for errors
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the form errors before submitting");
      return;
    }
    
    if (!formData.termsAccepted) {
      toast.error("Please accept the Terms & Conditions");
      return;
    }

    const newUser = {
      name: `${formData.firstName} ${formData.lastName}`,
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
      toast.success("Account created successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message);
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
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('firstName')}
                      required
                    />
                    {touched.firstName && (
                      <span className={`validation-icon show ${errors.firstName ? 'invalid' : 'valid'}`}>
                        {errors.firstName ? '✕' : '✓'}
                      </span>
                    )}
                  </div>
                  {touched.firstName && errors.firstName && (
                    <span className="error-text show">{errors.firstName}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('lastName')}
                      required
                    />
                    {touched.lastName && (
                      <span className={`validation-icon show ${errors.lastName ? 'invalid' : 'valid'}`}>
                        {errors.lastName ? '✕' : '✓'}
                      </span>
                    )}
                  </div>
                  {touched.lastName && errors.lastName && (
                    <span className="error-text show">{errors.lastName}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('phone')}
                />
                {touched.phone && formData.phone && (
                  <span className={`validation-icon show ${errors.phone ? 'invalid' : 'valid'}`}>
                    {errors.phone ? '✕' : '✓'}
                  </span>
                )}
              </div>
              {touched.phone && errors.phone && (
                <span className="error-text show">{errors.phone}</span>
              )}
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
            <div className="password-requirements">
              <div className={`requirement ${passwordRequirements.length ? 'met' : ''}`}>
                <i className={`fa ${passwordRequirements.length ? 'fa-check-circle' : 'fa-circle'}`}></i> 8+ characters
              </div>
              <div className={`requirement ${passwordRequirements.uppercase ? 'met' : ''}`}>
                <i className={`fa ${passwordRequirements.uppercase ? 'fa-check-circle' : 'fa-circle'}`}></i> At least one uppercase letter
              </div>
              <div className={`requirement ${passwordRequirements.lowercase ? 'met' : ''}`}>
                <i className={`fa ${passwordRequirements.lowercase ? 'fa-check-circle' : 'fa-circle'}`}></i> At least one lowercase letter
              </div>
              <div className={`requirement ${passwordRequirements.number ? 'met' : ''}`}>
                <i className={`fa ${passwordRequirements.number ? 'fa-check-circle' : 'fa-circle'}`}></i> At least one number
              </div>
              <div className={`requirement ${passwordRequirements.special ? 'met' : ''}`}>
                <i className={`fa ${passwordRequirements.special ? 'fa-check-circle' : 'fa-circle'}`}></i> At least one special character
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('confirmPassword')}
                  required
                />
                {touched.confirmPassword && (
                  <span className={`validation-icon show ${errors.confirmPassword ? 'invalid' : 'valid'}`}>
                    {errors.confirmPassword ? '✕' : '✓'}
                  </span>
                )}
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <span className="error-text show">{errors.confirmPassword}</span>
              )}
            </div>
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