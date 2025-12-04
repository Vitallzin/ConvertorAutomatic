import React from "react";
import Flag from "../../Flag";

function CurrencyBase({ selectedCurrency, allCurrencies, onChangeCurrency }) { // Componente para selecionar a moeda base
  return (
    <div className="base-currency-control">
      <label htmlFor="base-currency">Moeda Base:</label>
      <div className="currency-selector-wrapper">
        <Flag currency={selectedCurrency} /> {/* Mostra a bandeira da moeda selecionada */}
        <select
          id="base-currency"
          value={selectedCurrency} // Valor selecionado
          onChange={(e) => onChangeCurrency(e.target.value)} // Chama a função ao mudar
          className="base-currency-select"  // Estilização do select
        >
          {allCurrencies.map((currency) => ( // Mapeia todas as moedas disponíveis
            <option key={currency} value={currency}>  {/* Opção para cada moeda */}
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyBase;