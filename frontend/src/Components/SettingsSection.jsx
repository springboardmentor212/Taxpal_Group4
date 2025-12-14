import React from "react";
import "../styles/Settings.css";

export default function SettingsSection({ title, children, showBorder = true }) {
  return (
    <div className={`settings-section ${showBorder ? "with-border" : ""}`}>
      <h3 className="section-title">{title}</h3>
      {children}
    </div>
  );
}