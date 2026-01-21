import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h2>Settings</h2>
      </header>

      <main className="settings-main">
        <div className="settings-card">
          <div
            className="settings-item"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </div>

          <div className="settings-item">Privacy Policy</div>
          <div className="settings-item">About Us</div>
        </div>
      </main>
    </div>
  );
}
