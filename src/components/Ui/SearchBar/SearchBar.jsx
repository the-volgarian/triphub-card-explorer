import React from "react";
import "./SearchBar.scss";

export default function SearchBar({ value, onChange, placeholder = "Search trips..." }) {
  return (
    <div className="searchbar">
      <input
        type="search"
        className="searchbar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search trips"
      />
    </div>
  );
}
