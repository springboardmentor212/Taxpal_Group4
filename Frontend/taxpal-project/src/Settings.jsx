import { useState } from "react";
import "./Settings.css";
function Settings() {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) {
    return null; 
  }
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Help & Support</h2>
        <p className="subtitle">Get help, contact support, or view legal information</p>
        <div className="settings-list">
          <button className="settings-btn"><i className="fa-solid fa-phone"></i><span>Contact Support</span></button>
          <button className="settings-btn"><i className="fa-solid fa-book"></i><span>Terms &amp; Privacy Policy</span></button>
        </div>
        <div className="modal-actions">
          <button className="btn-outline" onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  );
}
export default Settings;