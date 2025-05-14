import React from 'react';
import '../style/SuccessPopup.css';

export function SuccessPopup({ isOpen, onClose, message, isError = false }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className={`popup-content ${isError ? 'error' : 'success'}`}>
        <div className="popup-icon">
          <i className={`fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
        </div>
        <h2>{isError ? 'Error' : 'Success'}</h2>
        <p>{message}</p>
        <button className={`popup-button ${isError ? 'error' : ''}`} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
