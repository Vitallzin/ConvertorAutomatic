import React from "react";
import Flag from "../../Flag";
import { currencyData } from "../../../utils/CurrencData";
import "./CurrencySelectorFrom.css";

function CurrencySelectorFrom({ fromCurrency, setFromCurrency, minimal }) {
  const currencies = Object.keys(currencyData);

  return (
    <div className={minimal ? "currency-selector-minimal" : "currency-selector"}>
      
      {/* Bandeira no modo minimal */}
      {minimal && <Flag currency={fromCurrency} minimal={true} />}

      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        className={minimal ? "currency-select-minimal" : ""}
      >
        {currencies.map((code) => (
          <option key={code} value={code}>
            {code} — {currencyData[code].namecomplete}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelectorFrom;
