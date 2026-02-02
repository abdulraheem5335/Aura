import { useState, useCallback } from 'react';

// Validation rules
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
    return null;
  },
  
  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },
  
  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },
  
  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },
  
  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Must be less than ${max} characters`;
    }
    return null;
  },
  
  passwordStrength: (value) => {
    if (!value) return null;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;
    
    if (!isLongEnough || !hasUppercase || !hasLowercase || !hasNumber) {
      return 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    return null;
  },
  
  match: (fieldToMatch, fieldName) => (value, allValues) => {
    if (!value) return null;
    if (value !== allValues[fieldToMatch]) {
      return `${fieldName || 'Fields'} must match`;
    }
    return null;
  },
  
  postalCode: (value) => {
    if (!value) return null;
    const postalRegex = /^[0-9]{5}(-[0-9]{4})?$/;
    if (!postalRegex.test(value)) {
      return 'Please enter a valid postal code';
    }
    return null;
  }
};

// Calculate password strength
export const getPasswordStrength = (password) => {
  if (!password) return { level: 0, label: '', class: '' };
  
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  
  if (score <= 2) return { level: 25, label: 'Weak', class: 'weak' };
  if (score <= 3) return { level: 50, label: 'Fair', class: 'fair' };
  if (score <= 4) return { level: 75, label: 'Good', class: 'good' };
  return { level: 100, label: 'Strong', class: 'strong' };
};

// Custom hook for form validation
export const useFormValidation = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validate a single field
  const validateField = useCallback((name, value) => {
    const fieldValidators = validationSchema[name];
    if (!fieldValidators) return null;
    
    for (const validator of fieldValidators) {
      const error = validator(value, values);
      if (error) return error;
    }
    return null;
  }, [validationSchema, values]);
  
  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(validationSchema).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [validationSchema, validateField, values]);
  
  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);
  
  // Handle input blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);
  
  // Get field props for easy integration
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    className: `${touched[name] ? 'touched' : ''} ${errors[name] ? 'invalid' : touched[name] && !errors[name] ? 'valid' : ''}`.trim()
  }), [values, handleChange, handleBlur, touched, errors]);
  
  // Get validation state for a field
  const getFieldState = useCallback((name) => ({
    error: errors[name],
    touched: touched[name],
    isValid: touched[name] && !errors[name],
    isInvalid: touched[name] && !!errors[name]
  }), [errors, touched]);
  
  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  // Handle submit
  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e.preventDefault();
    
    // Touch all fields
    const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all
    const isValid = validateAll();
    
    if (isValid) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [validationSchema, validateAll, values]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
    getFieldState,
    validateAll,
    resetForm
  };
};

export default useFormValidation;
