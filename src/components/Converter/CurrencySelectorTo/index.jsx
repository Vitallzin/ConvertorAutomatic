import React from "react";
import CurrencyDropdown from "../CurrencyDropdown";

function CurrencySelectorTo({ toCurrency, setToCurrency }) {
  return <CurrencyDropdown value={toCurrency} onChange={setToCurrency} />;
}

export default CurrencySelectorTo;
