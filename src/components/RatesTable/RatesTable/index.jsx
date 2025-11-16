import React, { useEffect, useState } from "react";
import { getRates } from "../../../services/Api";
import Flag from "../../Flag";
import CurrencyBase from "../CurrencyBase";
import AddRatesTable from "../AddRatesTable";
import "./RatesTable.css";

function RatesTable() {
  const [rates, setRates] = useState({});
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [displayCurrencies, setDisplayCurrencies] = useState(["USD", "EUR", "BRL", "GBP", "JPY"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ✅ Busca todas as moedas disponíveis ao montar
  useEffect(() => {
    let mounted = true;
    
    async function fetchAllCurrencies() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRates("USD");
        const ratesObj = data.conversion_rates || data.rates || data || {};
        
        if (!ratesObj || Object.keys(ratesObj).length === 0) {
          throw new Error("Nenhuma moeda retornada pela API");
        }
        
        if (mounted) {
          setAllCurrencies(Object.keys(ratesObj).sort());
        }
      } catch (error) {
        console.error("Erro ao buscar moedas:", error);
        if (mounted) {
          setError("Erro ao buscar moedas. Tente novamente.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    fetchAllCurrencies();
    return () => { mounted = false; };
  }, []);

  // ✅ Busca as taxas da moeda selecionada
  useEffect(() => {
    let mounted = true;
    
    async function fetchRatesForSelected() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRates(selectedCurrency);
        const ratesObj = data.conversion_rates || data.rates || data || {};
        
        if (!ratesObj || Object.keys(ratesObj).length === 0) {
          throw new Error("Nenhuma taxa retornada");
        }
        
        if (mounted) {
          setRates(ratesObj);
        }
      } catch (error) {
        console.error("Erro ao buscar taxas:", error);
        if (mounted) {
          setError("Erro ao buscar taxas. Tente novamente.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (selectedCurrency) {
      fetchRatesForSelected();
    }
    
    return () => { mounted = false; };
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

  const handleAddCurrency = (currency) => {
    if (!displayCurrencies.includes(currency)) {
      setDisplayCurrencies([...displayCurrencies, currency]);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveCurrency = (currency) => {
    if (displayCurrencies.length > 1) {
      setDisplayCurrencies(displayCurrencies.filter((c) => c !== currency));
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setShowSuggestions(true);
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
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
            {filteredRates.length > 0 ? (
              filteredRates.map(({ currency, rate }) => (
                <tr key={currency}>
                  <td className="flag-cell">
                    <Flag currency={currency} />
                  </td>
                  <td className="currency-code">{currency}</td>
                  <td className="rate-value">
                    {Number(rate || 0).toFixed(4)}
                  </td>
                  <td className="action-cell">
                    {displayCurrencies.length > 1 && (
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveCurrency(currency)}
                        title="Remover moeda"
                        aria-label={`Remover ${currency}`}
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
      <AddRatesTable
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