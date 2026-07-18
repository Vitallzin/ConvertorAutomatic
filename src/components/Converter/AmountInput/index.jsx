import React from "react";
import "./AmountInput.css";

// Campo numérico onde o usuário digita o valor
const AmountInput = ({ id, value, onChange, disabled = false, symbol = '' }) => (
  <div className="amount-input-wrapper">
    {symbol && <span className="amount-input-symbol">{symbol}</span>}
    <input
      id={id}
      className="amount-input"
      type="number"
      placeholder="0.00"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
      list="autocompleteOff"
    />
  </div>
);

export default AmountInput;
