import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      {/* Full-width header */}
      <header className="settings-header">
        <div className="header-left">
          <button className="back-arrow">←</button>
          <span className="logo">₹</span>
          <div className="branding">
            <h1 className="brand-title">TaxPal</h1>
            <p className="brand-subtitle">Personal Finance</p>
          </div>
        </div>
        <div className="header-right">
          <span className="settings-icon">⚙️</span>
          <h2 className="settings-title">Settings</h2>
        </div>
      </header>

      {/* Main content */}
      <main className="settings-main">
        <div className="settings-card">
          {/* Profile card */}
          <div className="profile-card">
            <div className="profile-left">
              <div className="avatar">👤</div>
              <span className="profile-name">Alex Morgan</span>
            </div>
            {/* Pencil icon navigates to Edit Profile */}
            <button
              className="edit-button"
              onClick={() => navigate("/edit-profile")}
            >
              ✎
            </button>
          </div>

          {/* Account Settings */}
          <section className="settings-section with-border">
            <h3 className="section-title">Account Settings</h3>

            {/* Edit Profile row */}
            <div
              className="settings-item"
              onClick={() => navigate("/edit-profile")}
            >
              <span>Edit Profile</span>
              <span className="arrow">›</span>
            </div>

            {/* Change Password row */}
            <div
              className="settings-item"
              onClick={() => navigate("/edit-profile")}
            >
              <span>Change Password</span>
              <span className="arrow">›</span>
            </div>

            {/* Dark Mode toggle */}
            <div className="settings-item">
              <span>Dark Mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Notifications toggle */}
            <div className="settings-item">
              <span>Notifications</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Regime row */}
            <div className="settings-item">
              <span>Regime</span>
              <div className="item-right">
                <span className="item-value">New Regime</span>
                <span className="arrow">›</span>
              </div>
            </div>

            {/* Expense Categories row */}
            <div className="settings-item">
              <span>Expense Categories</span>
              <span className="arrow">›</span>
            </div>
          </section>

          {/* More section */}
          <section className="settings-section">
            <h3 className="section-title">More</h3>
            <div className="settings-item">
              <span>Privacy Policy</span>
              <span className="arrow">›</span>
            </div>
            <div className="settings-item">
              <span>About Us</span>
              <span className="arrow">›</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}