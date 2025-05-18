
export function SuccessPopup({ isOpen, message, onClose, isError = false }) {
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
