import React from "react";
import "../styles/Settings.css";

export default function ProfileCard({ name }) {
  return (
    <div className="profile-card">
      <div className="profile-left">
        <div className="avatar">👤</div>
        <span className="profile-name">{name}</span>
      </div>
      <button className="edit-button">✎</button>
    </div>
  );
}