import React from "react";
import "./RatesSearchBar.css";

function RatesSearchBar({ value, onChange }) {
  return (
    <div className="rates-search-bar">
      <input
        type="text"
        placeholder="Buscar moeda (ex: USD, BRL, EUR...)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rates-search-input"
      />
    </div>
  );
}

export default RatesSearchBar;