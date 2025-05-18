import "../style/successPopup.css";
import { useEffect } from "react";

export function SuccessPopup({ message, onClose, isOpen = true, isError = false }) {
  // Add ESC key handler for closing the popup
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscKey);
    
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      if (isOpen) onClose();
    }, 5000);
    
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="success-popup-overlay" onClick={onClose}>
      <div 
        className={`success-popup ${isError ? 'error' : 'success'}`}
        onClick={e => e.stopPropagation()}
      >
        <p className="success-popup-message">{message}</p>
        <button className="success-popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
