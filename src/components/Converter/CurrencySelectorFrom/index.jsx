import React from "react";
import CurrencyDropdown from "../CurrencyDropdown";

function CurrencySelectorFrom({ fromCurrency, setFromCurrency }) {
  return <CurrencyDropdown value={fromCurrency} onChange={setFromCurrency} />;
}

export default CurrencySelectorFrom;
