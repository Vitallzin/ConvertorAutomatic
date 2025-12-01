import React from "react";
import Flag from "../../Flag";
import { currencyData } from "../../../utils/CurrencData";
import "./CurrencySelectorTo.css";

function CurrencySelectorTo({ toCurrency, setToCurrency, minimal }) {
  const currencies = Object.keys(currencyData);

  return (
    <div className={minimal ? "currency-selector-minimal" : "currency-selector"}>
      
      {/* Se modo minimal estiver ativado, mostra a bandeira ao lado */}
      {minimal && <Flag currency={toCurrency} minimal={true} />}

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        className={minimal ? "currency-select-minimal" : ""}
      >
        {currencies.map((code) => (
          <option key={code} value={code}>
            {/* Exibe: BRL — Real Brasileiro */}
            {code} — {currencyData[code].namecomplete}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelectorTo;