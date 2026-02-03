import React from 'react';
import '../style/PopupAlert.css';

export function PopupAlert({ type, message, onClose, onConfirm, isConfirmation }) {
  return (
    <div className="popup-overlay">
      <div className={`popup-content ${type}`}>
        <div className="popup-icon">
          {type === 'success' ? '✓' : type === 'error' ? '×' : '!'}
        </div>
        <p className="popup-message">{message}</p>
        {isConfirmation ? (
          <div className="popup-actions">
            <button className="popup-confirm" onClick={onConfirm}>
              Delete
            </button>
            <button className="popup-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="popup-close" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}
