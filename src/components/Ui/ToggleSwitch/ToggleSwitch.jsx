import React from "react";
import "./ToggleSwitch.scss";

export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle-switch__input"
      />
      <span className="toggle-switch__slider" />
      <span className="toggle-switch__label">{label}</span>
    </label>
  );
}

