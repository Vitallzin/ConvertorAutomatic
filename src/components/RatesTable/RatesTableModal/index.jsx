import React, { useEffect, useState } from "react";
import "./RatesModal.css";
import { getRates } from "../../../services/Api";
import Flag from "../../Flag";

function RatesModal({ onClose }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchRates() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRates(baseCurrency);
        const ratesObj = data.conversion_rates || data.rates || data || {};
        if (mounted) setRates(ratesObj);
      } catch (err) {
        console.error("Erro ao carregar taxas:", err);
        if (mounted) setError("Erro ao carregar taxas. Tente novamente.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchRates();
    return () => { mounted = false; };
  }, [baseCurrency]);

  return (
    <div className="rates-modal-overlay">
      <div className="rates-modal-container">

        {/* HEADER */}
        <div className="rates-modal-header">
          <h2>Taxas de Câmbio</h2>
          <button className="close-btn" onClick={onClose} aria-label="Fechar">×</button>
        </div>

        <p className="rates-modal-subtitle">
          Visualize as taxas de conversão para diferentes moedas
        </p>

        {/* SELECT DA MOEDA BASE */}
        <div className="rates-select-wrapper">
          <label>Moeda Base</label>
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            {Object.keys(rates).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* TABELA */}
        {error && <div className="rates-error">{error}</div>}
        {loading ? (
          <div className="rates-loading">Carregando...</div>
        ) : (
          <table className="rates-table-grid">
            <thead>
              <tr>
                <th>Moeda</th>
                <th>Código</th>
                <th>Taxa</th>
                <th>1 {baseCurrency} =</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(rates).map(([currency, rate]) => (
                <tr key={currency}>
                  <td className="currency-cell">
                    <Flag currency={currency} />
                    {currency}
                  </td>
                  <td>{currency}</td>
                  <td>{Number(rate || 0).toFixed(4)}</td>
                  <td>{(1 * rate).toFixed(4)} {currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* INFO BOX */}
        <div className="rates-info-box">
          💡 As taxas são atualizadas em tempo real através da API de câmbio.
        </div>

      </div>
    </div>
  );
}

export default RatesModal;
