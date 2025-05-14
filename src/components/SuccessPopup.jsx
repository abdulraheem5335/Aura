import React from 'react';
import '../style/SuccessPopup.css';

export function SuccessPopup({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>Success!</h2>
        <p>{message}</p>
        <button className="popup-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
