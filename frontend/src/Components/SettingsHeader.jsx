import React from "react";
import "../styles/Settings.css";

export default function SettingsHeader() {
  return (
    <div className="settings-header">
      <div className="header-top">
        <button className="back-button">←</button>
        <div className="branding">
          <span className="logo">₹</span>
          <div>
            <h1 className="brand-title">TaxPal</h1>
            <p className="brand-subtitle">Personal Finance</p>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <span className="settings-icon">⚙️</span>
        <h2 className="settings-title">Settings</h2>
      </div>
    </div>
  );
}