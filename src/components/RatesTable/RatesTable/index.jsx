import React, { useEffect, useState } from "react";
import { getRates } from "../../../services/Api";
import Flag from "../../Flag";
import RatesSearchBar from "../RatesSearchBar";
import "./RatesTable.css";

function RatesTable() {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRates(baseCurrency);
        setRates(data.conversion_rates);
      } catch (error) {
        setError("Erro ao buscar taxas. Tente novamente.");
        console.error("Erro ao buscar taxas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, [baseCurrency]);

  const filteredRates = Object.entries(rates)
    .filter(([currency]) =>
      currency.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="rates-container">
      <h2>Tabela de Taxas | Base {baseCurrency}</h2>
      
      <div className="rates-controls">
        <RatesSearchBar value={searchTerm} onChange={setSearchTerm} />
        
        <div className="currency-selector">
          <label htmlFor="base-currency">Moeda Base:</label>
          <select
            id="base-currency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
            className="currency-select"
          >
            <option value="USD">USD - Dólar Americano</option>
            <option value="EUR">EUR - Euro</option>
            <option value="BRL">BRL - Real Brasileiro</option>
            <option value="GBP">GBP - Libra Esterlina</option>
            <option value="JPY">JPY - Iene Japonês</option>
            <option value="CAD">CAD - Dólar Canadense</option>
            <option value="AUD">AUD - Dólar Australiano</option>
            <option value="CHF">CHF - Franco Suíço</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Carregando...</div>}

      {!loading && !error && (
        <table className="rates-table">
          <thead>
            <tr>
              <th>Bandeira</th>
              <th>Moeda</th>
              <th>Taxa</th>
            </tr>
          </thead>
          <tbody>
            {filteredRates.length > 0 ? (
              filteredRates.map(([currency, rate]) => (
                <tr key={currency}>
                  <td><Flag currency={currency} /></td>
                  <td>{currency}</td>
                  <td>{rate.toFixed(4)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">
                  Nenhuma moeda encontrada!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RatesTable;