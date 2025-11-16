import React from "react";
import Flag from "../../Flag";

function AddRatesTable({ 
  searchTerm, // Termo de busca
  onSearchChange,  // Função para atualizar o termo de busca
  suggestions, // Lista de sugestões de moedas
  showSuggestions, // Controla a exibição das sugestões
  onSelectCurrency, // Função para selecionar uma moeda
  onFocus, // Função para tratar o evento onFocus 
  onBlur // Função para tratar o evento onBlur
}) {
  return (
    <div className="add-currency-section">
      <h3>Adicionar Moeda à Tabela</h3>
      
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Buscar moeda para adicionar (ex: EUR, AUD, CAD...)"
          value={searchTerm} // Valor do input controlado
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="rates-search-input"
          autoComplete="off"
        />

        {/* ✅ Dropdown de sugestões */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((currency) => (
              <div
                key={currency}
                className="suggestion-item" // Item clicável
                onClick={() => onSelectCurrency(currency)} // Seleciona a moeda ao clicar
                role="button"
                tabIndex={0}
              >
                <Flag currency={currency} />
                <span>{currency}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRatesTable;