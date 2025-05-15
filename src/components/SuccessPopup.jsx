import "../style/successPopup.css";
import { useEffect } from "react";

export function SuccessPopup({ message, onClose, isOpen = true }) {
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
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">✓</div>
        <h2>Success!</h2>
        <p>{message}</p>
        <button className="popup-button" onClick={onClose}>Continue</button>
      </div>
    </div>
  );
}
