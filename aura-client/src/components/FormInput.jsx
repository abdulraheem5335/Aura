import { useState } from 'react';
import '../style/formValidation.css';

export function FormInput({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  showValidIcon = true,
  required = false,
  className = '',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  const isValid = touched && !error && value;
  const isInvalid = touched && error;
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };
  
  const inputClassName = `
    ${className}
    ${isValid ? 'valid' : ''}
    ${isInvalid ? 'invalid' : ''}
    ${touched ? 'touched' : ''}
  `.trim();
  
  return (
    <div className="form-group">
      <div className="input-wrapper">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClassName}
          required={required}
          {...props}
        />
        {showValidIcon && touched && (
          <span className={`validation-icon show ${isValid ? 'valid' : 'invalid'}`}>
            {isValid ? '✓' : '✕'}
          </span>
        )}
      </div>
      <span className={`error-text ${isInvalid ? 'show' : ''}`}>
        {error}
      </span>
    </div>
  );
}

export function PasswordInput({
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  showStrength = false,
  strengthData,
  required = false,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isValid = touched && !error && value;
  const isInvalid = touched && error;
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };
  
  const inputClassName = `
    ${className}
    ${isValid ? 'valid' : ''}
    ${isInvalid ? 'invalid' : ''}
    ${touched ? 'touched' : ''}
  `.trim();
  
  return (
    <div className="form-group">
      <div className="input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClassName}
          required={required}
          style={{ paddingRight: '4rem' }}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '35px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9ca3af',
            padding: '5px',
            fontSize: '0.9rem'
          }}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
        {touched && (
          <span className={`validation-icon show ${isValid ? 'valid' : 'invalid'}`}>
            {isValid ? '✓' : '✕'}
          </span>
        )}
      </div>
      
      {showStrength && strengthData && (
        <div className="password-strength">
          <div className="strength-bar">
            <div 
              className={`strength-fill ${strengthData.class}`}
              style={{ width: `${strengthData.level}%` }}
            />
          </div>
          <span className={`strength-text ${strengthData.class}`}>
            {strengthData.label && `Password strength: ${strengthData.label}`}
          </span>
        </div>
      )}
      
      <span className={`error-text ${isInvalid ? 'show' : ''}`}>
        {error}
      </span>
    </div>
  );
}

export function PasswordRequirements({ password }) {
  const requirements = [
    { key: 'length', label: '8+ characters', check: password?.length >= 8 },
    { key: 'uppercase', label: 'At least one uppercase letter', check: /[A-Z]/.test(password || '') },
    { key: 'lowercase', label: 'At least one lowercase letter', check: /[a-z]/.test(password || '') },
    { key: 'number', label: 'At least one number', check: /[0-9]/.test(password || '') },
    { key: 'special', label: 'At least one special character', check: /[!@#$%^&*]/.test(password || '') },
  ];
  
  return (
    <div className="password-requirements">
      {requirements.map(req => (
        <div key={req.key} className={`requirement ${req.check ? 'met' : ''}`}>
          <i className={`fa ${req.check ? 'fa-check-circle' : 'fa-circle'}`}></i>
          {req.label}
        </div>
      ))}
    </div>
  );
}

export default FormInput;
