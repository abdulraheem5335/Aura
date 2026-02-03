import { useState } from 'react';
import '../style/confirmDialog.css';

export function ConfirmDialog({ isOpen, title, message, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <h2 className="confirm-dialog-title">{title}</h2>
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-buttons">
          <button className="confirm-dialog-button cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-dialog-button confirm-button" onClick={onConfirm}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}