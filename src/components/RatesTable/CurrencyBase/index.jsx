import React from "react";
import Flag from "../../Flag";

function CurrencyBase({ selectedCurrency, allCurrencies, onChangeCurrency }) { // Componente para selecionar a moeda base
  return (
    <div className="base-currency-control">
      <label htmlFor="base-currency">Moeda Base:</label>
      <div className="currency-selector-wrapper">
        <Flag currency={selectedCurrency} />
        <select
          id="base-currency"
          value={selectedCurrency}
          onChange={(e) => onChangeCurrency(e.target.value)}
          className="base-currency-select"
        >
          {allCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyBase;