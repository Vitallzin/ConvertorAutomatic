import React, { useEffect, useState } from "react";
import { getRates } from "../../../services/api";
import Flag from "../../Flag"; // Componente para exibir bandeiras.
import CurrencyBase from "../CurrencyBase"; // Componente para selecionar a moeda base.
import AddRatesTable from "../AddRatesTable";
import "./RatesTable.css";

function RatesTable() {
  const [rates, setRates] = useState({}); // Armazena as taxas de câmbio.
  const [allCurrencies, setAllCurrencies] = useState([]); // Armazena todas as moedas disponíveis.
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca para adicionar moedas. 
  const [selectedCurrency, setSelectedCurrency] = useState("USD"); // Moeda base selecionada.
  const [displayCurrencies, setDisplayCurrencies] = useState(["USD", "EUR", "BRL", "GBP", "JPY"]); // Moedas exibidas na tabela.
  const [loading, setLoading] = useState(false); // Estado de carregamento.
  const [error, setError] = useState(null); // Estado de erro.
  const [showSuggestions, setShowSuggestions] = useState(false);  // Controla a exibição das sugestões.

  // ✅ Busca todas as moedas disponíveis ao montar
  useEffect(() => {
    async function fetchAllCurrencies() { 
      setLoading(true);
      setError(null);
      try {
        const data = await getRates("USD");
        const rates = data.conversion_rates || data.rates || data;
        
        if (!rates || Object.keys(rates).length === 0) {
          throw new Error("Nenhuma moeda retornada pela API");
        }
        
        setAllCurrencies(Object.keys(rates).sort());
      } catch (error) {
        setError("Erro ao buscar moedas. Tente novamente.");
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    } 
    fetchAllCurrencies();
  }, []);

  // ✅ Busca as taxas da moeda selecionada
  useEffect(() => {
    async function fetchRatesForSelected() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRates(selectedCurrency);
        const rates = data.conversion_rates || data.rates || data;
        
        if (!rates || Object.keys(rates).length === 0) {
          throw new Error("Nenhuma taxa retornada");
        }
        
        setRates(rates);
      } catch (error) {
        setError("Erro ao buscar taxas. Tente novamente.");
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (selectedCurrency) {
      fetchRatesForSelected();
    }
  }, [selectedCurrency]);

  // ✅ Filtra as moedas para adicionar (exclui as já exibidas)
  const suggestions = searchTerm.trim().length > 0
    ? allCurrencies
        .filter((currency) =>
          currency.toUpperCase().includes(searchTerm.toUpperCase()) &&
          !displayCurrencies.includes(currency)
        )
        .slice(0, 5)
    : [];

  // ✅ Formata as taxas para a tabela
  const filteredRates = displayCurrencies.map((currency) => ({
    currency,
    rate: rates[currency] || 0
  }));

  // ✅ Handlers
  const handleChangeCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleAddCurrency = (currency) => { // Adiciona moeda à tabela
    if (!displayCurrencies.includes(currency)) { // Evita duplicatas
      setDisplayCurrencies([...displayCurrencies, currency]); // Adiciona a nova moeda
      setSearchTerm(""); // Limpa o termo de busca
      setShowSuggestions(false); // Esconde as sugestões
    }
  };

  const handleRemoveCurrency = (currency) => { // Remove moeda da tabela
    if (displayCurrencies.length > 1) {  // Garante que sempre haja pelo menos uma moeda
      setDisplayCurrencies(displayCurrencies.filter((c) => c !== currency)); // Remove a moeda selecionada
    }
  };

  const handleSearchChange = (value) => { // Atualiza o termo de busca
    setSearchTerm(value); // Atualiza o termo de busca
    setShowSuggestions(true); // Mostra as sugestões
  };

  const handleSearchFocus = () => { // Mostra sugestões ao focar
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);// Esconde sugestões ao desfocar, com delay para permitir clique
  };

  return (
    <div className="rates-container">
      <h2>Tabela de Câmbio</h2>
      
      {/* ✅ SUBCOMPONENTE: Moeda Base */}
      <CurrencyBase 
        selectedCurrency={selectedCurrency}
        allCurrencies={allCurrencies}
        onChangeCurrency={handleChangeCurrency}
      />

      {/* ✅ Mensagem de erro */}
      {error && <div className="error-message">{error}</div>}

      {/* ✅ Mensagem de carregamento */}
      {loading && <div className="loading-message">Carregando...</div>}

      {/* ✅ TABELA PRINCIPAL */}
      {!loading && !error && (
        <table className="rates-table">
          <thead>
            <tr>
              <th>Bandeira</th>
              <th>Moeda</th>
              <th>Taxa ({selectedCurrency})</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredRates.length > 0 ? ( // Verifica se há moedas para exibir
              filteredRates.map(({ currency, rate }) => ( // Renderiza cada linha da tabela
                <tr key={currency}> 
                  <td className="flag-cell"><Flag currency={currency} /></td>
                  <td>{currency}</td>
                  <td>{rate ? rate.toFixed(4) : "N/A"}</td>
                  <td className="action-cell">
                    {displayCurrencies.length > 1 && (
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveCurrency(currency)} // Remove a moeda ao clicar
                        title="Remover"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">
                  Nenhuma moeda disponível
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* ✅ SUBCOMPONENTE: Adicionar Moedas */}
      <AddRatesTable // Componente para adicionar novas moedas
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSelectCurrency={handleAddCurrency}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
      />
    </div>
  );
}

export default RatesTable;