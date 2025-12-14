import React from "react";
import "../styles/Settings.css";

export default function SettingsMenuItem({
  label,
  type = "link",
  value,
  checked,
  onCheckedChange,
}) {
  return (
    <div className="settings-item">
      <span className="item-label">{label}</span>
      <div className="item-right">
        {value && <span className="item-value">{value}</span>}
        {type === "link" && <span className="arrow">›</span>}
        {type === "toggle" && (
          <label className="switch">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onCheckedChange(e.target.checked)}
            />
            <span className="slider" />
          </label>
        )}
      </div>
    </div>
  );
}